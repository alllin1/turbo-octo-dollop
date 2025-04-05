import { inter, playfair } from '@/lib/fonts';
import '@/styles/animations.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Luxury Raffle Platform</title>
        <meta name="description" content="Win luxury prizes with our premium raffle platform" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
