import { fontClasses } from '@/lib/fonts';
import { ThemeProvider } from '@/providers/theme-provider';
import './globals.css';

export const metadata = {
  title: 'Luxury Raffle Platform',
  description: 'Win incredible luxury prizes with our premium raffle competitions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontClasses}>
      <body className="min-h-screen bg-primary text-primary antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
