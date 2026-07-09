import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Magic Signal — Free Marketing Tools & Automation",
    template: "%s | Magic Signal",
  },
  description: "A suite of 100% free, no-signup marketing tools. ROI Calculators, UTM Builders, SERP Previews, Headline Analyzers, and Document Signing — all free, forever.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://magicsignal.online'),
  openGraph: {
    type: "website",
    siteName: "Magic Signal",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navigation />
        <div style={{ flex: 1 }}>{children}</div>
        <footer style={{
          textAlign: 'center',
          padding: '2rem clamp(1rem, 3vw, 2rem)',
          borderTop: '1px solid var(--border)',
          marginTop: 'auto',
          fontSize: '0.875rem',
          color: 'var(--muted)',
        }}>
          <p>© {new Date().getFullYear()} Magic Signal. All tools are 100% free.</p>
          <p style={{ marginTop: '0.5rem' }}>
            Made by{' '}
            <a href="https://studiohappens.tech" target="_blank" rel="noopener noreferrer" style={{ fontWeight: '600', color: 'var(--primary)' }}>
              studiohappens.tech
            </a>
          </p>
        </footer>
        <Script src="https://backlink-generator-tool.github.io/current-url-backlink-submitter/currentUrlBacklinkSubmitter.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
