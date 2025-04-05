import { z } from 'zod';

// User input validation schemas
export const emailSchema = z
  .string()
  .email('Please enter a valid email address')
  .min(1, 'Email is required');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters')
  .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens and apostrophes');

export const phoneSchema = z
  .string()
  .regex(/^\+?[0-9\s()-]{10,15}$/, 'Please enter a valid phone number')
  .optional()
  .or(z.literal(''));

// Authentication schemas
export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
  name: nameSchema,
  phone: phoneSchema,
  ageVerification: z.boolean().refine(val => val === true, {
    message: 'You must confirm you are 18 years or older'
  })
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
});

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required')
});

export const resetPasswordSchema = z.object({
  email: emailSchema
});

export const updatePasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
});

// Competition schemas
export const ticketPurchaseSchema = z.object({
  competitionId: z.string().uuid('Invalid competition ID'),
  quantity: z.number().int().min(1, 'Minimum 1 ticket').max(100, 'Maximum 100 tickets'),
  skillAnswer: z.string().min(1, 'Skill answer is required')
});

export const competitionFilterSchema = z.object({
  category: z.string().optional(),
  priceRange: z.enum(['all', 'under10', '10to50', 'over50']).optional(),
  sortBy: z.enum(['endingSoon', 'newest', 'priceAsc', 'priceDesc']).optional()
});

// Payment schemas
export const paymentDetailsSchema = z.object({
  cardNumber: z.string()
    .regex(/^[0-9]{16}$/, 'Card number must be 16 digits'),
  cardholderName: z.string()
    .min(2, 'Cardholder name is required')
    .max(50, 'Cardholder name is too long'),
  expiryMonth: z.string()
    .regex(/^(0[1-9]|1[0-2])$/, 'Invalid expiry month'),
  expiryYear: z.string()
    .regex(/^[0-9]{2}$/, 'Invalid expiry year'),
  cvv: z.string()
    .regex(/^[0-9]{3,4}$/, 'CVV must be 3 or 4 digits'),
  saveCard: z.boolean().optional()
});

// Address schemas
export const addressSchema = z.object({
  line1: z.string().min(1, 'Address line 1 is required'),
  line2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State/County is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  country: z.string().min(1, 'Country is required')
});

// Utility function to sanitize user input
export function sanitizeInput(input: string): string {
  if (!input) return '';
  
  // Replace potentially dangerous characters
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/\\/g, '&#x5C;')
    .replace(/`/g, '&#96;');
}

// Utility function to validate and sanitize form data
export function validateAndSanitize<T>(
  schema: z.ZodType<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: z.ZodError } {
  try {
    // First validate with Zod
    const validatedData = schema.parse(data);
    
    // Then sanitize string fields
    const sanitizedData = Object.entries(validatedData).reduce((acc, [key, value]) => {
      if (typeof value === 'string') {
        acc[key] = sanitizeInput(value);
      } else {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, any>);
    
    return { success: true, data: sanitizedData as T };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error };
    }
    throw error;
  }
}

// Helper to format validation errors for display
export function formatValidationErrors(errors: z.ZodError): Record<string, string> {
  return errors.errors.reduce((acc, error) => {
    const field = error.path.join('.');
    acc[field] = error.message;
    return acc;
  }, {} as Record<string, string>);
}
