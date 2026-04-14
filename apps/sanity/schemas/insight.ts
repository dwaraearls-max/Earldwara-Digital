import { defineField, defineType } from "sanity";

export const insightSchema = defineType({
  name: "insight",
  title: "Insight",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().min(3),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      validation: (Rule) => Rule.required().min(20),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readingMinutes",
      title: "Reading minutes",
      type: "number",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        defineType({
          name: "insightSection",
          title: "Section",
          type: "object",
          fields: [
            defineField({
              name: "heading",
              title: "Heading",
              type: "string",
              validation: (Rule) => Rule.required().min(3),
            }),
            defineField({
              name: "body",
              title: "Body",
              type: "text",
              validation: (Rule) => Rule.required().min(20),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
});

