import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Floating Lines Demo",
  description: "Floating Lines Background",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen w-full overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
