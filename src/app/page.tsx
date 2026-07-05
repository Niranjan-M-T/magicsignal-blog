import { client } from '@/sanity/lib/client'
import { ALL_POSTS_QUERY } from '@/sanity/lib/queries'
import { urlForImage } from '@/sanity/lib/image'
import Link from 'next/link'

export const revalidate = 60

const TOOLS = [
  {
    name: 'Marketing ROI Calculator',
    description: 'Calculate projected revenue, ROAS, and cost per acquisition before spending a single dollar on ads. Supports both D2C and B2B models.',
    href: '/tools/roi-calculator',
    icon: '📊',
  },
  {
    name: 'Headline & Copy Analyzer',
    description: 'Score your headlines for emotional impact, readability, and conversion potential using proven copywriting frameworks.',
    href: '/tools/headline-analyzer',
    icon: '✍️',
  },
  {
    name: 'SEO SERP Preview',
    description: 'See exactly how your page will appear in Google search results on both desktop and mobile. Catch truncation before it goes live.',
    href: '/tools/serp-preview',
    icon: '🔍',
  },
  {
    name: 'UTM Builder + QR Generator',
    description: 'Create perfectly tagged campaign URLs and instantly generate downloadable QR codes for offline and print marketing.',
    href: '/tools/utm-builder',
    icon: '🔗',
  },
  {
    name: 'Free Document Signing',
    description: 'Sign PDFs and documents online for free. No signup, no watermarks, legally binding electronic signatures in seconds.',
    href: '/tools/document-signing',
    icon: '✒️',
  },
]

export default async function Home() {
  const posts = await client.fetch(ALL_POSTS_QUERY)
  const latestPosts = posts.slice(0, 3)

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section style={{ padding: 'clamp(4rem, 10vw, 8rem) clamp(1rem, 3vw, 2rem) clamp(3rem, 8vw, 6rem)', textAlign: 'center' }}>
        <div className="container">
          <span className="pill" style={{ marginBottom: '1.5rem' }}>100% Free · No Signup · No Limits</span>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
            fontWeight: '800',
            letterSpacing: '-0.04em',
            lineHeight: '1.1',
            marginBottom: '1.5rem',
            maxWidth: '800px',
            margin: '1.5rem auto',
          }}>
            Free Marketing Tools That{' '}
            <span style={{ color: 'var(--primary)' }}>Actually Work</span>
          </h1>
          <p className="section-subtitle" style={{ marginBottom: '2.5rem' }}>
            A suite of premium marketing tools built for agencies, freelancers, and growth-focused brands. 
            No paywalls. No email gates. No hidden limits. Just tools that help you grow.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/tools" className="btn-primary">
              Explore All Tools
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </Link>
            <Link href="/blog" className="btn-outline">
              Read Our Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="section" style={{ backgroundColor: 'rgba(168, 85, 247, 0.02)' }}>
        <div className="container">
          <div className="section-header">
            <span className="pill">Our Tools</span>
            <h2 className="section-title" style={{ marginTop: '1rem' }}>
              Everything You Need to <span style={{ color: 'var(--primary)' }}>Market Smarter</span>
            </h2>
            <p className="section-subtitle">
              Each tool is designed to solve a specific marketing problem — from budgeting and tracking to SEO optimization and content scoring.
            </p>
          </div>

          <div className="tool-grid">
            {TOOLS.map((tool) => (
              <Link key={tool.href} href={tool.href} className="tool-card">
                <div className="tool-card-icon">
                  <span style={{ fontSize: '1.5rem' }}>{tool.icon}</span>
                </div>
                <h3>{tool.name}</h3>
                <p>{tool.description}</p>
                <span className="tool-card-link">
                  Open Tool →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-header">
            <span className="pill">About Magic Signal</span>
            <h2 className="section-title" style={{ marginTop: '1rem' }}>
              Why We Build <span style={{ color: 'var(--primary)' }}>Free Tools</span>
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: '1.8', color: 'var(--muted)', fontSize: '1.05rem' }}>
            <p>
              Magic Signal was born from a simple frustration: the best marketing tools are locked behind expensive subscriptions, 
              free trials that expire, and mandatory email signups designed to spam your inbox. We believe marketers deserve better.
            </p>
            <p>
              Every tool on this platform is <strong style={{ color: 'var(--foreground)' }}>100% free, forever</strong>. No freemium tier. 
              No feature gates. No "upgrade to unlock." We built these tools because we use them ourselves every single day 
              to run campaigns for our clients at <a href="https://studiohappens.tech" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: '600' }}>Studio Happens</a>.
            </p>
            <p>
              Our <strong style={{ color: 'var(--foreground)' }}>Ad Spend Forecaster</strong> lets you work backward from your revenue 
              goals to calculate exactly how much you need to spend — something no other free tool does. The <strong style={{ color: 'var(--foreground)' }}>Headline Analyzer</strong> scores 
              your copy using real frameworks from the best conversion copywriters in the industry.
            </p>
            <p>
              The <strong style={{ color: 'var(--foreground)' }}>SERP Preview Tool</strong> shows exactly how your page will look in Google 
              before you publish, catching embarrassing title truncations. And the <strong style={{ color: 'var(--foreground)' }}>UTM Builder</strong> generates 
              perfectly tagged tracking URLs with instant QR codes for offline campaigns.
            </p>
            <p>
              We also offer a completely <strong style={{ color: 'var(--foreground)' }}>free document signing tool</strong> — no watermarks, 
              no limits, legally binding. Because signing a contract shouldn't cost you anything.
            </p>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      {latestPosts.length > 0 && (
        <section className="section" style={{ backgroundColor: 'rgba(168, 85, 247, 0.02)' }}>
          <div className="container">
            <div className="section-header">
              <span className="pill">Blog</span>
              <h2 className="section-title" style={{ marginTop: '1rem' }}>
                Latest <span style={{ color: 'var(--primary)' }}>Insights</span>
              </h2>
              <p className="section-subtitle">
                Marketing tips, case studies, and agency insights from our team.
              </p>
            </div>

            <div className="blog-grid">
              {latestPosts.map((post: any) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug}`}
                  className="hover-card"
                  style={{
                    display: 'block',
                    textDecoration: 'none',
                    color: 'inherit',
                    borderRadius: 'var(--radius)',
                    backgroundColor: 'var(--card-bg)',
                    boxShadow: 'var(--shadow)',
                    border: '1px solid var(--border)',
                    overflow: 'hidden',
                  }}
                >
                  {post.mainImage ? (
                    <div style={{ height: '180px', overflow: 'hidden' }}>
                      <img
                        src={urlForImage(post.mainImage).width(600).height(400).url()}
                        alt={post.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  ) : (
                    <div style={{ height: '180px', backgroundColor: 'rgba(168, 85, 247, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>No Image</span>
                    </div>
                  )}
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--foreground)' }}>
                      {post.title}
                    </h3>
                    <p style={{ color: 'var(--muted)', fontSize: '0.9rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <Link href="/blog" className="btn-outline">View All Posts</Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section">
        <div className="container" style={{ maxWidth: '700px', textAlign: 'center' }}>
          <h2 className="section-title">
            Ready to <span style={{ color: 'var(--primary)' }}>Grow Faster?</span>
          </h2>
          <p className="section-subtitle" style={{ marginBottom: '2rem' }}>
            Have a question about our tools, want a custom solution, or just want to say hello? We'd love to hear from you.
          </p>
          <Link href="/contact" className="btn-primary">
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  )
}
