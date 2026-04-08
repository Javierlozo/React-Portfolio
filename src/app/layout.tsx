import "../styles/globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollProgress from "../components/ScrollProgress";
import { ThemeProvider } from "../contexts/ThemeContext";
import StructuredData from "../components/StructuredData";
import ConsoleMessage from "../components/ConsoleMessage";
import ErrorBoundary from "../components/ErrorBoundary";
import AIChatButton from "../components/AIChatButton";
import PageTracker from "../components/PageTracker";
import SiteChrome from "../components/SiteChrome";
import SmoothScroll from "../components/SmoothScroll";
import PageTransition from "../components/PageTransition";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: {
    default: "Luis Javier Lozoya | Full Stack Engineer - Security, Cloud, AI",
    template: "%s | Luis Javier Lozoya"
  },
  description: "Senior Full Stack Engineer with 5+ years experience. Expert in React, Next.js, AWS, Python, and AI integration. Building scalable web applications and AI-powered solutions for businesses worldwide.",
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer", 
    "AWS Engineer",
    "Python Developer",
    "Web Development",
    "Cloud Architecture",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Supabase",
    "Svelte",
    "Squid AI",
    "LangChain",
    "OpenAI",
    "Portfolio",
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer"
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
    title: "Luis Javier Lozoya | Full Stack Engineer - Security, Cloud, AI",
    description: "Full Stack Engineer with 5+ years building production apps with React, Next.js, AWS, and Python. GIAC GFACT certified. Open to full-time and contract roles.",
    url: 'https://www.luislozoya.com',
    siteName: 'Luis Javier Lozoya Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [{ url: 'https://www.luislozoya.com/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Luis Javier Lozoya | Full Stack Engineer - Security, Cloud, AI",
    description: "Full Stack Engineer with 5+ years building production apps with React, Next.js, AWS, and Python. GIAC GFACT certified. Open to full-time and contract roles.",
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
      </head>
      <body className={`${inter.className} min-h-screen transition-colors duration-300`}>
        <StructuredData />
        <ConsoleMessage />
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:px-4 focus:py-2 focus:bg-white focus:text-gray-900 focus:rounded focus:shadow-lg focus:text-sm focus:font-medium"
          >
            Skip to main content
          </a>
          <SiteChrome>
            <ScrollProgress />
            <Navbar />
          </SiteChrome>
          <main id="main-content">
            <ErrorBoundary>
              <PageTransition>{children}</PageTransition>
            </ErrorBoundary>
          </main>
          <SiteChrome>
            <Footer />
            <AIChatButton />
          </SiteChrome>
          <PageTracker />
          <SmoothScroll />
        </ThemeProvider>
      </body>
    </html>
  );
}
