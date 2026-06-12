import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "StartupHub AI | Founder Operating System",
    template: "%s | StartupHub AI"
  },
  description:
    "Discover startup ideas, find co-founders, manage teams, connect with investors, and get AI-powered startup guidance.",
  openGraph: {
    title: "StartupHub AI",
    description: "The premium AI operating system for ambitious founders.",
    type: "website"
  },
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? "http://localhost:3000")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
