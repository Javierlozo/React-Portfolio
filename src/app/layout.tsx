import "../styles/globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollProgress from "../components/ScrollProgress";
import { ThemeProvider } from "../contexts/ThemeContext";
import StructuredData from "../components/StructuredData";
import ConsoleMessage from "../components/ConsoleMessage";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Luis Lozoya | Full Stack Developer & AI Engineer",
    template: "%s | Luis Lozoya"
  },
  description: "Senior Full Stack Engineer & AI Specialist with 5+ years experience. Expert in React, Next.js, AWS, Python, and AI integration. Building scalable web applications and AI-powered solutions for businesses worldwide.",
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer", 
    "AWS Engineer",
    "Python Developer",
    "AI Engineer",
    "Machine Learning",
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
  authors: [{ name: "Luis Lozoya" }],
  creator: "Luis Lozoya",
  publisher: "Luis Lozoya",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://javierlozo.github.io'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Luis Lozoya | Full Stack Developer & AI Engineer",
    description: "Senior Full Stack Engineer & AI Specialist with 5+ years experience. Expert in React, Next.js, AWS, Python, and AI integration.",
    url: 'https://javierlozo.github.io',
    siteName: 'Luis Lozoya Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Luis Lozoya - Full Stack Developer & AI Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Luis Lozoya | Full Stack Developer & AI Engineer",
    description: "Senior Full Stack Engineer & AI Specialist with 5+ years experience. Expert in React, Next.js, AWS, Python, and AI integration.",
    images: ['/og-image.png'],
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
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
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
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
