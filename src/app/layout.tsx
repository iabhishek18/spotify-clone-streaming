import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spotify Clone',
  description: 'Music streaming platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}
