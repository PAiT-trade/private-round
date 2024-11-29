import { BaseLayout } from "@/components/wraps/BaseLayout";
import { LoadingProvider } from "@/hooks/useLoading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PAiT | Private Round",
  description: "Private Round of PAiT Tokens",
  applicationName: "PAiT",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: ["PAiT DEX", "Pait Token"],
  authors: [{ name: "PAit Team", url: "https://www.pait.fi/team" }],
  creator: "PAiT",
  publisher: "PAiT",
  alternates: {
    canonical: "https://www.pait.fi/",
    languages: {
      "en-US": "https://www.pait.fi/en-US",
      "fi-FI": "https://www.pait.fi/fi-FI",
    },
  },
  openGraph: {
    title: "PAiT Private Round",
    description: "Private Round of PAiT Tokens",
    url: "https://www.pait.fi/",
    siteName: "PAIT",
    type: "website",
    images: [
      {
        url: "https://www.pait.fi/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PAiT - Private Round",
      },
    ],
    locale: "en_US",
  },
  robots: "index, follow",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/x-icon" },
      { url: "/favicon.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: { url: "/favicon.png", sizes: "180x180" },
  },
  appleWebApp: {
    capable: true,
    title: "PAiT",
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body>
        <LoadingProvider>
          <BaseLayout>{children}</BaseLayout>
        </LoadingProvider>
      </body>
    </html>
  );
}
