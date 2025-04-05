import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

// CSRF protection middleware
export function withCsrfProtection(handler) {
  return async (req) => {
    // Skip CSRF check for GET requests as they should be idempotent
    if (req.method === 'GET') {
      return handler(req);
    }
    
    // For all other methods, validate CSRF token
    try {
      const csrfToken = req.headers.get('x-csrf-token');
      const storedToken = req.cookies.get('csrf_token')?.value;
      
      if (!csrfToken || !storedToken || csrfToken !== storedToken) {
        return NextResponse.json(
          { error: 'Invalid CSRF token' },
          { status: 403 }
        );
      }
      
      // Token is valid, proceed with the request
      return handler(req);
    } catch (error) {
      console.error('CSRF validation error:', error);
      return NextResponse.json(
        { error: 'CSRF validation failed' },
        { status: 403 }
      );
    }
  };
}

// Generate a CSRF token and set it in a cookie
export function generateCsrfToken(req, res) {
  const token = nanoid(32);
  
  // Set the token in a cookie with secure attributes
  res.cookies.set('csrf_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 // 1 hour
  });
  
  return token;
}

// Helper to validate CSRF token in form submissions
export function validateCsrfToken(formData, cookieToken) {
  const formToken = formData.get('csrf_token');
  return formToken && cookieToken && formToken === cookieToken;
}

// React hook to use CSRF token in forms
export function useCsrfToken() {
  const [csrfToken, setCsrfToken] = useState('');
  
  useEffect(() => {
    // Fetch a new CSRF token from the API
    fetch('/api/csrf')
      .then(res => res.json())
      .then(data => {
        if (data.csrfToken) {
          setCsrfToken(data.csrfToken);
        }
      })
      .catch(error => {
        console.error('Failed to fetch CSRF token:', error);
      });
  }, []);
  
  return csrfToken;
}
