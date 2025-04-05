import { NextResponse } from 'next/server';

// Content Security Policy middleware
export function withContentSecurityPolicy(handler) {
  return async (req) => {
    // Get the response from the handler
    const response = await handler(req);
    
    // Add CSP headers to the response
    response.headers.set(
      'Content-Security-Policy',
      `
        default-src 'self';
        script-src 'self' 'unsafe-inline' https://js.stripe.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        img-src 'self' data: https: blob:;
        font-src 'self' https://fonts.gstatic.com;
        connect-src 'self' https://*.supabase.co https://api.dnapayments.com;
        frame-src 'self' https://js.stripe.com;
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'none';
        block-all-mixed-content;
        upgrade-insecure-requests;
      `.replace(/\s+/g, ' ').trim()
    );
    
    // Add other security headers
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    
    return response;
  };
}

// XSS sanitization utility
export function sanitizeHtml(html) {
  if (!html) return '';
  
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/`/g, '&#x60;');
}

// Safe HTML rendering component
import React from 'react';

export function SafeHtml({ html, className }) {
  // Only use this component when absolutely necessary
  // and when the HTML content comes from a trusted source
  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ 
        __html: sanitizeHtml(html) 
      }} 
    />
  );
}

// URL sanitization utility
export function sanitizeUrl(url) {
  if (!url) return '';
  
  // Only allow http:, https:, mailto:, and tel: protocols
  const pattern = /^(?:(?:https?|mailto|tel):)?(?:\/\/)?/i;
  const sanitized = url.replace(pattern, '');
  
  // Reconstruct with https:// if no protocol is specified
  if (sanitized === url) {
    return `https://${sanitized}`;
  }
  
  return url;
}

// JSON sanitization utility
export function sanitizeJson(json) {
  if (typeof json !== 'object' || json === null) {
    return json;
  }
  
  // Recursively sanitize all string values in the object
  return Object.keys(json).reduce((result, key) => {
    const value = json[key];
    
    if (typeof value === 'string') {
      result[key] = sanitizeHtml(value);
    } else if (typeof value === 'object' && value !== null) {
      result[key] = sanitizeJson(value);
    } else {
      result[key] = value;
    }
    
    return result;
  }, Array.isArray(json) ? [] : {});
}
