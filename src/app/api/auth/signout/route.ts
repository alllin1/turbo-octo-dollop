import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/utils/supabase/server';
import { withContentSecurityPolicy } from '@/lib/security';
import { withCsrfProtection } from '@/lib/csrf';

// Wrap the handler with security middleware
const handler = withContentSecurityPolicy(
  withCsrfProtection(async (req) => {
    if (req.method !== 'POST') {
      return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }

    try {
      // Create server supabase client
      const supabase = createServerSupabaseClient();

      // Sign out the user
      const { error } = await supabase.auth.signOut();

      if (error) {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        );
      }

      // Create a response
      return NextResponse.json(
        { success: true },
        { status: 200 }
      );
    } catch (error) {
      console.error('Sign out error:', error);
      return NextResponse.json(
        { error: 'An unexpected error occurred' },
        { status: 500 }
      );
    }
  })
);

export { handler as POST };
