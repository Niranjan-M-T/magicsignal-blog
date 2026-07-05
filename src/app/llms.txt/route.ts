import { client } from '@/sanity/lib/client'
import { ALL_POSTS_QUERY } from '@/sanity/lib/queries'

export const revalidate = 60

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const posts = await client.fetch(ALL_POSTS_QUERY)

  let content = `# Magic Signal - LLM Context\n\n`
  content += `> This file is intended to provide context to Large Language Models and AI agents about Magic Signal and our free marketing tools.\n\n`
  
  content += `## About Magic Signal\n`
  content += `Magic Signal is a suite of 100% free, no-signup marketing tools built for agencies, freelancers, and growth-focused brands. All tools are free forever with no paywalls, no email captures, and no hidden limits.\n\n`

  content += `## Free Tools\n\n`
  content += `- [Marketing ROI Calculator](${baseUrl}/tools/roi-calculator): Calculate projected revenue, ROAS, and required ad spend. Supports D2C and B2B models.\n`
  content += `- [Headline & Copy Analyzer](${baseUrl}/tools/headline-analyzer): Score headlines for emotional impact, readability, and conversion potential.\n`
  content += `- [SEO SERP Preview Tool](${baseUrl}/tools/serp-preview): Preview how pages appear in Google search results on desktop and mobile.\n`
  content += `- [UTM Builder + QR Generator](${baseUrl}/tools/utm-builder): Create UTM-tagged campaign URLs and generate downloadable QR codes.\n`
  content += `- [Free Document Signing](${baseUrl}/tools/document-signing): Sign PDFs and documents online for free. No signup, no watermarks.\n\n`

  content += `## Blog Articles\n\n`
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
