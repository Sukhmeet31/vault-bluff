import type { Metadata } from "next";
import "./globals.css";
import "./ancient.css";

export const metadata: Metadata = {
  title: "Vault Bluff — The Amethyst Vault",
  description: "A real-time bluffing party game for 2–8 friends. Choose your portrait, guard your amethysts, and call their bluff.",
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
