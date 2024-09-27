import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Food on Train',
  description: 'Order food for your train journey',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="sm:hidden">
          {children}
          <Toaster />
        </div>
        <div className="hidden sm:flex h-screen w-screen items-center justify-center bg-gray-100">
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Mobile Only</h1>
            <p className="text-gray-600">
              We&apos;re sorry, but Food on Train is currently only available on mobile devices.
              Please visit us on your smartphone for the best experience.
            </p>
          </div>
        </div>
      </body>
    </html>
  )
}