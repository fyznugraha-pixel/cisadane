import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppinsDisplay = Poppins({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const poppinsBody = Poppins({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Festival Cisadane 2026",
  description:
    "Flowing Heritage, Growing Courage. Portal pengalaman Festival Cisadane 2026.",
  keywords: [
    "Festival Cisadane 2026",
    "Festival Cisadane",
    "Kota Tangerang",
    "Flowing Heritage Growing Courage",
    "Karisma Event Nusantara",
    "Festival Sungai",
    "Perahu Naga",
  ],
  authors: [{ name: "Festival Cisadane 2026" }],
  creator: "Festival Cisadane 2026",
  publisher: "Festival Cisadane 2026",
  metadataBase: new URL("https://festivalcisadane.com"),
  openGraph: {
    title: "Festival Cisadane 2026",
    description:
      "Flowing Heritage, Growing Courage. Perayaan budaya sungai, perahu naga, panggung malam, kuliner lokal, dan energi multikultural Kota Tangerang.",
    type: "website",
    locale: "id_ID",
    siteName: "Festival Cisadane 2026",
  },
  twitter: {
    card: "summary_large_image",
    title: "Festival Cisadane 2026",
    description:
      "Flowing Heritage, Growing Courage. Portal pengalaman Festival Cisadane 2026.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${poppinsDisplay.variable} ${poppinsBody.variable}`}>
        {children}
      </body>
    </html>
  );
}