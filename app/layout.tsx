import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import Navigation from './Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'RailBites',
  description: 'Order food for your train journey',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="light">
      <body className={`${inter.className} bg-white text-black`}>
        <div className="min-h-screen flex flex-col">
          <Navigation />

          <main className="flex-grow">
            {children}
          </main>

          <Toaster />
        </div>
      </body>
    </html>
  )
}