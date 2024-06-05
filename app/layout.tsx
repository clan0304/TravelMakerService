import type { Metadata } from 'next';
import { Inter, Anton } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/providers/AuthProvider';
import Navbar from '@/components/Navbar';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

const anton = Anton({
  subsets: ['latin'],
  variable: '--font-anton',
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`${inter.className} ${anton.variable} pb-3`}>
          <Toaster position="top-center" />
          <Navbar />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}