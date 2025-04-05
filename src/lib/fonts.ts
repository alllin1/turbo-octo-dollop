import { Playfair_Display, Inter, Montserrat } from 'next/font/google';

// Define fonts with subsets and weights
export const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-playfair',
});

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
});

export const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
});

// Font class string for easy application
export const fontClasses = `${playfair.variable} ${inter.variable} ${montserrat.variable}`;
