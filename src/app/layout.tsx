import "../styles/globals.css";
import { Inter, JetBrains_Mono } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ThemeProvider } from "../contexts/ThemeContext";
import StructuredData from "../components/StructuredData";
import ConsoleMessage from "../components/ConsoleMessage";
import ErrorBoundary from "../components/ErrorBoundary";
import AIChatButton from "../components/AIChatButton";
import PageTracker from "../components/PageTracker";
import SiteChrome from "../components/SiteChrome";
import SmoothScroll from "../components/SmoothScroll";
import CommandPalette from "../components/CommandPalette";
import { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

export const metadata = {
  title: {
    default: "Luis Javier Lozoya | Security Engineer · AppSec & Cloud",
    template: "%s | Luis Javier Lozoya"
  },
  description: "GIAC GSEC + GFACT certified software engineer. 5+ years building and securing React, Next.js, and AWS apps. Open to AppSec, DevSecOps, and cloud security roles.",
  keywords: [
    "Application Security Engineer",
    "AppSec Engineer",
    "Security Engineer",
    "DevSecOps Engineer",
    "Cloud Security Engineer",
    "Web Application Security",
    "Penetration Testing",
    "OWASP Top 10",
    "GIAC GSEC",
    "GIAC GFACT",
    "AWS Security",
    "AWS Engineer",
    "Full Stack Engineer",
    "Software Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Python",
    "Node.js",
    "Charleston SC"
  ],
  authors: [{ name: "Luis Javier Lozoya" }],
  creator: "Luis Javier Lozoya",
  publisher: "Luis Javier Lozoya",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.luislozoya.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Luis Javier Lozoya | Security Engineer · AppSec & Cloud",
    description: "GIAC GSEC + GFACT certified. 5+ years building and securing production web apps with React, Next.js, and AWS. Based in Charleston, SC. Open to AppSec, DevSecOps, and cloud security roles.",
    url: 'https://www.luislozoya.com',
    siteName: 'Luis Javier Lozoya Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [{ url: 'https://www.luislozoya.com/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Luis Javier Lozoya | Security Engineer · AppSec & Cloud",
    description: "GIAC GSEC + GFACT certified. 5+ years building and securing production web apps with React, Next.js, and AWS. Based in Charleston, SC. Open to AppSec, DevSecOps, and cloud security roles.",
    creator: '@javierlozo',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '3MISRalS7k_ViK4lL238leBPWqs-UBvJoQ0ay1cnwfo',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#1f2937" />
        <meta name="msapplication-TileColor" content="#1f2937" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');var c=t==='light'?'light':'dark';document.documentElement.classList.add(c);}catch(e){document.documentElement.classList.add('dark');}`,
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans min-h-screen transition-colors duration-300`}>
        <StructuredData />
        <ConsoleMessage />
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-modal focus:px-4 focus:py-2 focus:bg-white focus:text-gray-900 focus:rounded focus:shadow-lg focus:text-sm focus:font-medium"
          >
            Skip to main content
          </a>
          <SiteChrome>
            <Navbar />
          </SiteChrome>
          <main id="main-content">
            <ErrorBoundary>{children}</ErrorBoundary>
          </main>
          <SiteChrome>
            <Footer />
            <AIChatButton />
          </SiteChrome>
          <PageTracker />
          <SmoothScroll />
          <CommandPalette />
        </ThemeProvider>
      </body>
    </html>
  );
}
