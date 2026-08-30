import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GeoTrail — Border Hunt",
  description: "Follow the borders. Find the mystery state.",
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
