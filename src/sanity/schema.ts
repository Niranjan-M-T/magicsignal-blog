import { type SchemaTypeDefinition } from 'sanity'
import { post } from './schemas/post'
import { author } from './schemas/author'
import { client } from './schemas/client'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, author, client],
}
