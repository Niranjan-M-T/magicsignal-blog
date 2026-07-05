import type { Metadata } from 'next'
import Link from 'next/link'
import { BarChart3, PenTool, Search, Link2, PenSquare } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Free Marketing Tools — No Signup, No Limits',
  description: 'A complete suite of 100% free marketing tools: ROI Calculator, Headline Analyzer, SERP Preview, UTM Builder, and Document Signing. No signup required.',
  keywords: ['free marketing tools', 'no signup marketing tools', 'roi calculator', 'utm builder', 'serp preview', 'headline analyzer', 'free document signing'],
}

const TOOLS = [
  {
    name: 'Marketing ROI Calculator',
    description: 'Work backward from your revenue goal to calculate the exact ad spend you need. Supports both E-Commerce (D2C) and Lead Generation (B2B) models with break-even ROAS calculations.',
    href: '/tools/roi-calculator',
    icon: <BarChart3 size={24} />,
    tags: ['Ads', 'Strategy', 'Finance'],
  },
  {
    name: 'Headline & Copy Analyzer',
    description: 'Score your headlines for emotional impact, readability, power words, and conversion potential. Uses frameworks from the world\'s best copywriters.',
    href: '/tools/headline-analyzer',
    icon: <PenTool size={24} />,
    tags: ['Copywriting', 'Content', 'CRO'],
  },
  {
    name: 'SEO SERP Preview Tool',
    description: 'Visualize how your page appears in Google search results. Preview on desktop and mobile, catch title and description truncation, and optimize click-through rates.',
    href: '/tools/serp-preview',
    icon: <Search size={24} />,
    tags: ['SEO', 'Search', 'Web'],
  },
  {
    name: 'UTM Builder + QR Generator',
    description: 'Create perfectly tagged campaign URLs with UTM parameters and instantly generate downloadable QR codes. Perfect for print, events, and offline marketing.',
    href: '/tools/utm-builder',
    icon: <Link2 size={24} />,
    tags: ['Analytics', 'Tracking', 'Print'],
  },
  {
    name: 'Free Document Signing',
    description: 'Sign PDFs and documents online — completely free. No watermarks, no limits, legally binding electronic signatures. No account required.',
    href: '/tools/document-signing',
    icon: <PenSquare size={24} />,
    tags: ['Documents', 'Legal', 'Productivity'],
  },
]

export default function ToolsPage() {
  return (
    <div className="animate-fade-in">
      <section style={{ padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 3vw, 2rem)' }}>
        <div className="container">
          <div className="section-header">
            <span className="pill">100% Free · No Signup</span>
            <h1 className="section-title" style={{ marginTop: '1rem' }}>
              Marketing Tools That <span style={{ color: 'var(--primary)' }}>Just Work</span>
            </h1>
            <p className="section-subtitle">
              Premium marketing tools built for agencies, freelancers, and growth-focused brands. 
              No paywalls. No email captures. Just the tools you need.
            </p>
          </div>

          <div className="tool-grid" style={{ marginBottom: '4rem' }}>
            {TOOLS.map((tool) => (
              <Link key={tool.href} href={tool.href} className="tool-card">
                <div className="tool-card-icon">
                  {tool.icon}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                  {tool.tags.map(tag => (
                    <span key={tag} style={{ padding: '0.2rem 0.6rem', backgroundColor: 'rgba(168, 85, 247, 0.06)', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <h3>{tool.name}</h3>
                <p>{tool.description}</p>
                <span className="tool-card-link">Open Tool →</span>
              </Link>
            ))}
          </div>

          {/* Why Free Section */}
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="section-title">
              Why Are These Tools <span style={{ color: 'var(--primary)' }}>Free?</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', color: 'var(--muted)', lineHeight: '1.8', fontSize: '1.05rem', textAlign: 'left', marginTop: '2rem' }}>
              <p>Most marketing tools charge $29-$99/month for features that should be standard. We think that's wrong.</p>
              <p>We built these tools for our own agency, <a href="https://studiohappens.tech" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: '600' }}>Studio Happens</a>, and decided to make them available to everyone. No strings attached.</p>
              <p>There is no "free tier" — you get the full tool. There is no "upgrade" — what you see is what you get. There is no email capture — we don't want your email.</p>
            </div>
          </div>

          {/* FAQ */}
          <div style={{ maxWidth: '800px', margin: '4rem auto 0' }}>
            <h2 className="section-title" style={{ textAlign: 'center' }}>Frequently Asked Questions</h2>
            <div style={{ marginTop: '2rem' }}>
              {[
                { q: 'Are these tools really free?', a: 'Yes, 100% free. No freemium, no trials, no hidden costs. We built them for our own agency and share them publicly.' },
                { q: 'Do I need to create an account?', a: 'No. Every tool works instantly in your browser. No signup, no login, no email required.' },
                { q: 'Can I use these for my clients?', a: 'Absolutely. Whether you are a freelancer, agency, or brand — use them for any project, commercial or personal.' },
                { q: 'How do you make money if the tools are free?', a: 'We run a digital marketing agency called Studio Happens. These tools drive traffic and showcase our expertise. If you ever need agency services, we hope you\'ll think of us.' },
                { q: 'Will you add more tools?', a: 'Yes! We are constantly building new tools based on what we and our clients need. Follow us for updates.' },
              ].map(faq => (
                <details key={faq.q} className="faq-item">
                  <summary>{faq.q}</summary>
                  <div className="faq-answer">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              { "@type": "Question", "name": "Are these tools really free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, 100% free. No freemium, no trials, no hidden costs." } },
              { "@type": "Question", "name": "Do I need to create an account?", "acceptedAnswer": { "@type": "Answer", "text": "No. Every tool works instantly in your browser. No signup required." } },
              { "@type": "Question", "name": "Can I use these for my clients?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. Use them for any project, commercial or personal." } },
            ]
          })
        }}
      />
    </div>
  )
}
