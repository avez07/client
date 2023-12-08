
import { Inter } from 'next/font/google'
// import './globals.css'
import '../../public/css/style.css'
import '../../public/css/Layout.css'
import '../../public/css/App.css'
import '../../public/css/datatable.css'

import 'bootstrap/dist/css/bootstrap.min.css';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function ClientLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
 
        {children}
      
        </body>
    </html>
  )
}
