import type { Metadata } from "next";
import { Montserrat, Roboto } from 'next/font/google';
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import Navbar from "../components/Navbar";

// font awesome installation
import { config, library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
// Import the specific icons globally
import { faShoppingCart} from '@fortawesome/free-solid-svg-icons' ;
config.autoAddCss = false
// Add individual icons to the library
library.add( faShoppingCart)
// Configure Montserrat for headings


const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '700'], // Add the weights you need
});

// Configure Roboto for the body
const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: "ShopEase",
  description: "Shop better, live better",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${montserrat.variable} ${roboto.variable}`}>
    <body className="font-body antialiased"> <CartProvider> <Navbar />{children} </CartProvider></body>
        </html>
  );
}
