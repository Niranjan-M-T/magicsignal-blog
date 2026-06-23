import { defineField, defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      description: 'Used for SEO meta description and blog lists',
      type: 'text',
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      description: 'Override the default title for SEO',
      type: 'string',
    }),
    defineField({
      name: 'targetKeywords',
      title: 'Target Keywords',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'clientBacklinks',
      title: 'Mentioned Clients',
      description: 'Link this post to clients for backlink building',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'client' } }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' }
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
})
