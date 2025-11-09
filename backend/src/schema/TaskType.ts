import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { checkbox, integer, select, text } from "@keystone-6/core/fields";
import { hooksAfterOperation, hooksBeforeOperation } from "./helpers/hooks";

const TASK_TYPE_OPTIONS = [{ label: "Upload", value: "UPLOAD" }];

export const TaskType = list({
  access: allowAll,
  db: {
    idField: { kind: "uuid" },
  },
  fields: {
    name: text({ validation: { isRequired: true }, isIndexed: "unique" }),
    description: text({ validation: { isRequired: true } }),
    type: select({
      options: TASK_TYPE_OPTIONS,
      validation: { isRequired: true },
    }),
    handler: text({ validation: { isRequired: true } }),

    isEnabled: checkbox({ defaultValue: false }),
    maxRetries: integer({ validation: { isRequired: true }, defaultValue: 1 }),
  },
  ui: {
    listView: {
      initialColumns: ["name", "description", "type", "isEnabled"],
    },
  },
  hooks: {
    ...hooksBeforeOperation,
    ...hooksAfterOperation,
  },
});
