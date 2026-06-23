import { client } from '@/sanity/lib/client'
import { ALL_POSTS_QUERY } from '@/sanity/lib/queries'
import { urlForImage } from '@/sanity/lib/image'
import Link from 'next/link'

export const revalidate = 60 // Revalidate every minute

export default async function Home() {
  const posts = await client.fetch(ALL_POSTS_QUERY)

  return (
    <div className="container animate-fade-in" style={{ padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)' }}>
      <header style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 8vw, 5rem)', position: 'relative' }}>
        <div style={{ display: 'inline-block', padding: '0.25rem 1rem', backgroundColor: 'rgba(168, 85, 247, 0.1)', color: 'var(--primary)', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '600', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Insights & Updates
        </div>
        <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: '800', letterSpacing: '-0.05em', marginBottom: '1.5rem', color: 'var(--foreground)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          Magic Signal
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--muted)', maxWidth: '600px', margin: '0 auto' }}>
          Insights, case studies, and updates from our agency. Discover how we help our clients grow and succeed in the digital landscape.
        </p>
      </header>

      <main>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: '2rem' }}>
          {posts.map((post: any) => (
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
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  <img 
                    src={urlForImage(post.mainImage).width(600).height(400).url()} 
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ) : (
                <div style={{ height: '200px', backgroundColor: 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'var(--muted)' }}>No Image</span>
                </div>
              )}
              
              <div style={{ padding: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>
                  {post.title}
                </h2>
                <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {post.excerpt}
                </p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {post.author?.image && (
                      <img 
                        src={urlForImage(post.author.image).width(30).height(30).url()} 
                        alt={post.author.name}
                        style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                    )}
                    <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>
                      {post.author?.name || 'Admin'}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
