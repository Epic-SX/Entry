import type { Metadata } from "next";
import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/globals.css";
import 'react-loading-skeleton/dist/skeleton.css';
import Script from "next/script";
import { QueryProvider } from "@/contexts";
import { Noto_Serif_JP } from "next/font/google";
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { GoogleTagManager } from '@next/third-parties/google'
import RumTracker from "@/components/RumTracker"

export const metadata: Metadata = {
  title: "Beyondia International School",
  description: "Beyondia International School",
};


const inter = Inter({ subsets: ["latin"] });
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";
type Props = {
  children: React.ReactNode
  params: {
    locale: string
  }
}
export default function LocaleLayout({
  children,
  params: { locale }
}: Props) {
  const messagesq = useMessages();
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <RumTracker />
        <GoogleTagManager gtmId={GTM_ID} />
        <NextIntlClientProvider locale={locale} messages={messagesq}>
          <div className="app bg-white">
            <QueryProvider>
              {children}
            </QueryProvider>
          </div>
        </NextIntlClientProvider>
      </body>
      <Script src="https://kit.fontawesome.com/5aade679c3.js"></Script>
      <Script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"></Script>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"></Script>
    </html>
  );
}
