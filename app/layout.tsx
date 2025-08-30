import type { Metadata } from "next";
import "@/assets/styles/globals.css";
import localFont from 'next/font/local'
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from "@/lib/constants";
import { ThemeProvider } from "next-themes";
import Header from "@/components/shared/header";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";


const myFont = localFont({
  src: '../public/quicksand.ttf',
})

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: APP_NAME
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning >
      <body className={`${myFont.className}`}>
        <ThemeProvider attribute='class' defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className='flex h-screen flex-col'>
            <Header />
            <main className='flex-1 wrapper'>{children}</main>
            <Footer />
          </div>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
