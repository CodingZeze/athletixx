import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'AthletiX - Sports Statistics Platform',
  description: 'Manage your favorite teams and players with real-time sports statistics',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Providers>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <footer className="bg-gray-900 text-white py-8 mt-12">
            <div className="container mx-auto px-4 text-center">
              <p>&copy; 2024 AthletiX. All rights reserved.</p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
