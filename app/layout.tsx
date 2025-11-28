import "./globals.css";
import type { Metadata } from "next";
import { AuthProvider } from "@/context/authContext";

export const metadata: Metadata = {
  title: "Fraud Detector",
  description: "Fraud Detector Powered by AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen w-full overflow-x-hidden">
        <AuthProvider>
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}
