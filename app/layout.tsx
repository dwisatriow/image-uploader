import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'

import AppLogo from '@/components/app-logo'
import ThemeToggle from '@/components/theme-toggle'
import { ThemeProvider } from '@/components/theme-provider'
import { Separator } from '@/components/ui/separator'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Simple Image Uploader',
  description: 'Upload your image and share with others',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange
        >
          <header>
            <div className='container mx-auto flex items-center justify-between py-6'>
              <AppLogo />
              <ThemeToggle />
            </div>
            <Separator />
          </header>

          <main>{children}</main>
          <Toaster position='top-right' closeButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
