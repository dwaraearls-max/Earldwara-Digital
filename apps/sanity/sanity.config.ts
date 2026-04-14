import { defineConfig } from "sanity";
import { serviceSchema } from "./schemas/service";
import { caseStudySchema } from "./schemas/caseStudy";
import { insightSchema } from "./schemas/insight";

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET ?? "production";

export default defineConfig({
  name: "default",
  title: "Earlsdwara Digital Studio",
  projectId: projectId ?? "missing-project-id",
  dataset,
  plugins: [],
  schema: {
    types: [serviceSchema, caseStudySchema, insightSchema],
  },
});

