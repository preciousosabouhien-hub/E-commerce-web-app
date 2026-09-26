import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext";

// font awesome installation
import { config, library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
// Import the specific icons globally
import { faShoppingCart} from '@fortawesome/free-solid-svg-icons' ;
config.autoAddCss = false
// Add individual icons to the library
library.add( faShoppingCart)

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShopEase",
  description: "Shop better, live better",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
    <body> <CartProvider> {children} </CartProvider></body>
        </html>
  );
}
