import { client } from '@/sanity/lib/client'
import { POST_BY_SLUG_QUERY, POSTS_SLUGS_QUERY } from '@/sanity/lib/queries'
import { urlForImage } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

export async function generateStaticParams() {
  const posts = await client.fetch(POSTS_SLUGS_QUERY)
  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const post = await client.fetch(POST_BY_SLUG_QUERY, { slug: resolvedParams.slug })
  if (!post) return {}

  return {
    title: post.seoTitle || post.title,
    description: post.excerpt,
    keywords: post.targetKeywords?.join(', '),
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      url: `/blog/${post.slug}`,
      images: post.mainImage ? [urlForImage(post.mainImage).url()] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle || post.title,
      description: post.excerpt,
      images: post.mainImage ? [urlForImage(post.mainImage).url()] : [],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const post = await client.fetch(POST_BY_SLUG_QUERY, { slug: resolvedParams.slug })

  if (!post) {
    notFound()
  }

  // Generate JSON-LD for Google AI and Search (Article Schema)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.seoTitle || post.title,
    image: post.mainImage ? [urlForImage(post.mainImage).url()] : [],
    datePublished: post.publishedAt,
    author: [{
      '@type': 'Person',
      name: post.author?.name || 'Admin',
      url: `/author/${post.author?.slug}`
    }],
    description: post.excerpt,
  }

  return (
    <article className="container animate-fade-in" style={{ padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)', maxWidth: '800px', margin: '0 auto' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <header style={{ marginBottom: 'clamp(2rem, 6vw, 3rem)', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(1.75rem, 6vw, 2.5rem)', marginBottom: '1rem', color: 'var(--primary)' }}>
          {post.title}
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '1.1rem' }}>{post.excerpt}</p>
        
        {post.author && (
          <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            {post.author.image && (
              <img 
                src={urlForImage(post.author.image).width(50).height(50).url()} 
                alt={post.author.name} 
                style={{ borderRadius: '50%', width: '50px', height: '50px', objectFit: 'cover' }}
              />
            )}
            <span style={{ fontWeight: 'bold' }}>{post.author.name}</span>
          </div>
        )}
      </header>

      {post.mainImage && (
        <img 
          src={urlForImage(post.mainImage).width(1200).height(600).url()} 
          alt={post.title}
          style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius)', marginBottom: '3rem', boxShadow: 'var(--shadow)' }}
        />
      )}

      <div style={{ fontSize: '1.125rem', lineHeight: '1.8' }}>
        {post.body ? (
          <PortableText 
            value={post.body} 
            components={{
              marks: {
                link: ({ children, value }: any) => {
                  const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
                  return (
                    <a 
                      href={value?.href} 
                      target={target} 
                      rel={target === '_blank' ? 'noopener noreferrer' : undefined} 
                      style={{ color: 'var(--primary)', textDecoration: 'underline', fontWeight: '500' }}
                    >
                      {children}
                    </a>
                  )
                },
              },
            }} 
          />
        ) : null}
      </div>

      {post.clientBacklinks && post.clientBacklinks.length > 0 && (
        <section style={{ marginTop: 'clamp(2.5rem, 8vw, 4rem)', padding: 'clamp(1.5rem, 4vw, 2rem)', backgroundColor: 'var(--card-bg)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
            Featured Clients
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 250px), 1fr))', gap: '1.5rem' }}>
            {post.clientBacklinks.map((client: any) => (
              <a 
                key={client.name} 
                href={client.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="client-card"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem', 
                  padding: '1rem', 
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                }}
              >
                {client.logo && (
                  <img src={urlForImage(client.logo).width(60).height(60).url()} alt={client.name} style={{ borderRadius: '8px', width: '60px', height: '60px', objectFit: 'contain' }} />
                )}
                <div>
                  <h3 style={{ fontSize: '1.1rem', margin: '0' }}>{client.name}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--muted)', margin: '0.25rem 0 0' }}>Visit website &rarr;</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
