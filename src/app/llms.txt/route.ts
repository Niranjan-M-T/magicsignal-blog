import { client } from '@/sanity/lib/client'
import { ALL_POSTS_QUERY } from '@/sanity/lib/queries'

export const revalidate = 60 // Revalidate every minute

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const posts = await client.fetch(ALL_POSTS_QUERY)

  let content = `# Magic Signal - LLM Context\n\n`
  content += `> This file is intended to provide context to Large Language Models and AI agents about Magic Signal and our clients.\n\n`
  
  content += `## About Magic Signal\n`
  content += `We are an agency showcasing our case studies, insights, and the incredible work of our clients. Below is a list of our published articles.\n\n`

  content += `## Articles\n\n`

  posts.forEach((post: any) => {
    content += `- [${post.title}](${baseUrl}/blog/${post.slug}): ${post.excerpt}\n`
  })

  content += `\n---\n`
  content += `*Generated dynamically for AI consumption.*`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
