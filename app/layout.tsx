import type { Metadata } from "next";
import "@/assets/styles/globals.css";
import localFont from 'next/font/local'
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from "@/lib/constants";

const myFont = localFont({
  src: '../public/quicksand.ttf',
})

export const metadata: Metadata = {
  title: { template: '%s | ', default: APP_NAME },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <body className={myFont.className}>
        {children}
      </body>
    </html>
  );
}
