import { Inter } from "next/font/google";
import "./globals.css";
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBJhR1FzW0LuUThDYpfKXw-wOFr04Ag090&loading=async&callback=initMap&libraries=places,marker`}
          strategy="afterInteractive"
          async
          defer
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
