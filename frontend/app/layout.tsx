import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Note-Taking App",
  description: "Smart note-taking with AI assistance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
