import { groq } from 'next-sanity'

export const ALL_POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  mainImage,
  author->{
    name,
    image,
    "slug": slug.current
  }
}`

export const POST_BY_SLUG_QUERY = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  seoTitle,
  targetKeywords,
  publishedAt,
  mainImage,
  body,
  author->{
    name,
    "slug": slug.current,
    image,
    bio
  },
  clientBacklinks[]->{
    name,
    website,
    logo,
    description
  }
}`

export const POSTS_SLUGS_QUERY = groq`*[_type == "post" && defined(slug.current)] {
  "slug": slug.current,
  publishedAt
}`
