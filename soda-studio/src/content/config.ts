import { defineCollection, z } from 'astro:content';

const noticesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    author: z.string(),
    pubDate: z.string().transform((str) => new Date(str)),
    isNew: z.boolean().optional(),
    isHot: z.boolean().optional(),
  }),
});

const rentalsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    author: z.string(),
    pubDate: z.string().transform((str) => new Date(str)),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  'notices': noticesCollection,
  'rentals': rentalsCollection,
}; 