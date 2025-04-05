// This file contains tests for the security enhancements implemented in the raffle platform

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { validateAndSanitize, signUpSchema, signInSchema, ticketPurchaseSchema } from '../src/lib/validation';
import { sanitizeHtml, sanitizeUrl, sanitizeJson } from '../src/lib/security';
import { validateCsrfToken } from '../src/lib/csrf';

// Mock cookies for CSRF tests
vi.mock('next/headers', () => ({
  cookies: () => ({
    get: vi.fn((name) => {
      if (name === 'csrf_token') {
        return { value: 'valid-csrf-token' };
      }
      return null;
    }),
    set: vi.fn(),
  }),
}));

describe('Input Validation', () => {
  it('should validate valid sign up data', () => {
    const validData = {
      email: 'test@example.com',
      password: 'Password123!',
      confirmPassword: 'Password123!',
      name: 'John Doe',
      phone: '+1234567890',
      ageVerification: true
    };
    
    const result = validateAndSanitize(signUpSchema, validData);
    expect(result.success).toBe(true);
  });
  
  it('should reject invalid sign up data', () => {
    const invalidData = {
      email: 'not-an-email',
      password: 'weak',
      confirmPassword: 'different',
      name: 'J',
      phone: 'not-a-phone',
      ageVerification: false
    };
    
    const result = validateAndSanitize(signUpSchema, invalidData);
    expect(result.success).toBe(false);
    expect(result.errors.errors.length).toBeGreaterThan(0);
  });
  
  it('should validate valid sign in data', () => {
    const validData = {
      email: 'test@example.com',
      password: 'Password123!'
    };
    
    const result = validateAndSanitize(signInSchema, validData);
    expect(result.success).toBe(true);
  });
  
  it('should validate valid ticket purchase data', () => {
    const validData = {
      competitionId: '123e4567-e89b-12d3-a456-426614174000',
      quantity: 5,
      skillAnswer: '42'
    };
    
    const result = validateAndSanitize(ticketPurchaseSchema, validData);
    expect(result.success).toBe(true);
  });
  
  it('should reject invalid ticket purchase data', () => {
    const invalidData = {
      competitionId: 'not-a-uuid',
      quantity: 101, // Over the max
      skillAnswer: ''
    };
    
    const result = validateAndSanitize(ticketPurchaseSchema, invalidData);
    expect(result.success).toBe(false);
  });
});

describe('XSS Protection', () => {
  it('should sanitize HTML with script tags', () => {
    const malicious = '<script>alert("XSS")</script>Hello';
    const sanitized = sanitizeHtml(malicious);
    
    expect(sanitized).not.toContain('<script>');
    expect(sanitized).toContain('&lt;script&gt;');
  });
  
  it('should sanitize HTML with event handlers', () => {
    const malicious = '<img src="x" onerror="alert(\'XSS\')">';
    const sanitized = sanitizeHtml(malicious);
    
    expect(sanitized).not.toContain('onerror=');
    expect(sanitized).toContain('&lt;img');
  });
  
  it('should sanitize URLs', () => {
    const malicious = 'javascript:alert("XSS")';
    const sanitized = sanitizeUrl(malicious);
    
    expect(sanitized).not.toEqual(malicious);
    expect(sanitized).toContain('https://');
  });
  
  it('should sanitize JSON objects with malicious content', () => {
    const malicious = {
      name: 'Test',
      description: '<script>alert("XSS")</script>',
      nested: {
        content: '<img src="x" onerror="alert(\'XSS\')">'
      }
    };
    
    const sanitized = sanitizeJson(malicious);
    
    expect(sanitized.description).not.toContain('<script>');
    expect(sanitized.nested.content).not.toContain('onerror=');
  });
});

describe('CSRF Protection', () => {
  it('should validate matching CSRF tokens', () => {
    const formData = new FormData();
    formData.append('csrf_token', 'valid-csrf-token');
    
    const isValid = validateCsrfToken(formData, 'valid-csrf-token');
    expect(isValid).toBe(true);
  });
  
  it('should reject non-matching CSRF tokens', () => {
    const formData = new FormData();
    formData.append('csrf_token', 'invalid-token');
    
    const isValid = validateCsrfToken(formData, 'valid-csrf-token');
    expect(isValid).toBe(false);
  });
  
  it('should reject missing CSRF tokens', () => {
    const formData = new FormData();
    // No token added
    
    const isValid = validateCsrfToken(formData, 'valid-csrf-token');
    expect(isValid).toBe(false);
  });
});

// Add more tests for other security features as needed
