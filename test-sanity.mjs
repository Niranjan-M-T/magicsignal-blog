import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'seekazb0',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-06-23'
})

async function test() {
  try {
    const posts = await client.fetch('*[_type == "post"]')
    console.log('Total posts:', posts.length)
    console.log('Posts:', JSON.stringify(posts, null, 2))
  } catch (error) {
    console.error('Error fetching:', error)
  }
}

test()
