import { defineField, defineType } from "sanity";

export const caseStudySchema = defineType({
  name: "caseStudy",
  title: "Case Study",
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
      name: "clientContext",
      title: "Client context",
      type: "text",
      validation: (Rule) => Rule.required().min(20),
    }),
    defineField({
      name: "challenge",
      title: "Challenge",
      type: "text",
      validation: (Rule) => Rule.required().min(20),
    }),
    defineField({
      name: "strategy",
      title: "Strategy",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "execution",
      title: "Execution",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "results",
      title: "Results",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "metrics",
      title: "Metrics",
      type: "array",
      of: [
        defineType({
          name: "metric",
          title: "Metric",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "value" },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
});

