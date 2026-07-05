import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { ALL_POSTS_QUERY } from '@/sanity/lib/queries'
import { urlForImage } from '@/sanity/lib/image'
import Link from 'next/link'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Blog — Marketing Tips, Case Studies & Insights',
  description: 'Read the latest marketing tips, agency case studies, SEO strategies, and digital marketing insights from the Magic Signal team.',
}

export default async function BlogPage() {
  const posts = await client.fetch(ALL_POSTS_QUERY)

  return (
    <div className="container animate-fade-in" style={{ padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)' }}>
      <div className="section-header">
        <span className="pill">Blog</span>
        <h1 className="section-title" style={{ marginTop: '1rem' }}>
          Marketing <span style={{ color: 'var(--primary)' }}>Insights & Tips</span>
        </h1>
        <p className="section-subtitle">
          Actionable strategies, agency case studies, and the latest trends in digital marketing.
        </p>
      </div>

      <div className="blog-grid">
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
              <div style={{ height: '200px', backgroundColor: 'rgba(168, 85, 247, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'var(--muted)' }}>No Image</span>
              </div>
            )}
            <div style={{ padding: '1.5rem' }}>
              <h2 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>
                {post.title}
              </h2>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {post.excerpt}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>
                  {post.author?.name || 'Admin'}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                  {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--muted)' }}>
          <p style={{ fontSize: '1.25rem' }}>No posts yet. Check back soon!</p>
        </div>
      )}
    </div>
  )
}
