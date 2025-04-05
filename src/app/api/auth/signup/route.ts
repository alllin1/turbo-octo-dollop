import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/utils/supabase/server';
import { validateAndSanitize, signUpSchema } from '@/lib/validation';
import { withContentSecurityPolicy } from '@/lib/security';
import { withCsrfProtection, generateCsrfToken } from '@/lib/csrf';

// Wrap the handler with security middleware
const handler = withContentSecurityPolicy(
  withCsrfProtection(async (req) => {
    if (req.method !== 'POST') {
      return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }

    try {
      // Get form data
      const formData = await req.formData();
      const email = formData.get('email');
      const password = formData.get('password');
      const confirmPassword = formData.get('confirmPassword');
      const name = formData.get('name');
      const phone = formData.get('phone') || '';
      const ageVerification = formData.get('ageVerification') === 'true';

      // Validate and sanitize input
      const validationResult = validateAndSanitize(signUpSchema, { 
        email, 
        password, 
        confirmPassword, 
        name, 
        phone, 
        ageVerification 
      });
      
      if (!validationResult.success) {
        return NextResponse.json(
          { error: 'Invalid input', details: validationResult.errors.format() },
          { status: 400 }
        );
      }

      // Create server supabase client
      const supabase = createServerSupabaseClient();

      // Attempt to sign up
      const { data, error } = await supabase.auth.signUp({
        email: validationResult.data.email,
        password: validationResult.data.password,
        options: {
          data: {
            name: validationResult.data.name,
            phone: validationResult.data.phone,
            age_verified: validationResult.data.ageVerification
          },
          emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`
        }
      });

      if (error) {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        );
      }

      // Create a response
      const response = NextResponse.json(
        { 
          success: true, 
          message: 'Please check your email for verification link',
          user: data.user 
        },
        { status: 200 }
      );

      // Generate a new CSRF token for the next request
      generateCsrfToken(req, response);

      return response;
    } catch (error) {
      console.error('Sign up error:', error);
      return NextResponse.json(
        { error: 'An unexpected error occurred' },
        { status: 500 }
      );
    }
  })
);

export { handler as POST };
