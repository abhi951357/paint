import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Colorix | Professional Painting Services in West London",
  description:
    "Colorix provides expert interior and exterior painting for homes and businesses across West London, delivering smooth finishes. 25+ years experience, 35k+ projects completed.",
  keywords: [
    "Painting Services West London",
    "Colorix painting",
    "interior painter London",
    "exterior painting London",
    "decorative wall design",
    "waterproof coating",
    "wood polishing London",
    "commercial painter West London",
  ],
  authors: [{ name: "Colorix Painting Services" }],
  openGraph: {
    title: "Colorix | Professional Painting Services in West London",
    description:
      "Transforming spaces with master craftsmanship across West London. Get your free painting quote today.",
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
