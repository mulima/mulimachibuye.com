import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mulima Chibuye's Blog",

  generator: "v0.dev",

  description:
    "Thoughts on tech, science, life, philosophy, and everything in between.",
  openGraph: {
    title: "My Blog – Mulima Chibuye",
    description:
      "Thoughts on tech, science, life, philosophy, and everything in between.",
    url: "https://www.mulimachibuye.com",
    siteName: "My Blog",
    images: [
      {
        url: "/public/images/mulima_001.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Blog – Mulima Chibuye",
    description:
      "Thoughts on tech, science, life, philosophy, and everything in between.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
