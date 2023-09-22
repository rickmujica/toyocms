import HeaderLogin from '../components/headerLogin'
import './../globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CMS Usados Toyotoshi',
  description: 'CMS para actualización de vehículos',
  icons: {
    icon: '/toyotoshi.ico',
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
        <body className={inter.className}>
        <HeaderLogin>
        {children}
        </HeaderLogin>
        </body>
    </html>
  )
}
