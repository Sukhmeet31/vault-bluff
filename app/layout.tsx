import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vault Bluff — Small lies. Big game night.",
  description: "A real-time bluffing party game for 2–8 friends. Get your gems, sell your story, and call their bluff.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
