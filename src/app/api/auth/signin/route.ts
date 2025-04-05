import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/utils/supabase/server';
import { validateAndSanitize, signInSchema } from '@/lib/validation';
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

      // Validate and sanitize input
      const validationResult = validateAndSanitize(signInSchema, { email, password });
      if (!validationResult.success) {
        return NextResponse.json(
          { error: 'Invalid input', details: validationResult.errors.format() },
          { status: 400 }
        );
      }

      // Create server supabase client
      const supabase = createServerSupabaseClient();

      // Attempt to sign in
      const { data, error } = await supabase.auth.signInWithPassword({
        email: validationResult.data.email,
        password: validationResult.data.password,
      });

      if (error) {
        return NextResponse.json(
          { error: error.message },
          { status: 401 }
        );
      }

      // Create a response with the session
      const response = NextResponse.json(
        { success: true, user: data.user },
        { status: 200 }
      );

      // Generate a new CSRF token for the next request
      generateCsrfToken(req, response);

      return response;
    } catch (error) {
      console.error('Sign in error:', error);
      return NextResponse.json(
        { error: 'An unexpected error occurred' },
        { status: 500 }
      );
    }
  })
);

export { handler as POST };
