import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, text } from "@keystone-6/core/fields";

export const UploadLocationLocal = list({
  access: allowAll,
  db: {
    idField: { kind: "uuid" },
  },
  fields: {
    location: relationship({
      ref: "UploadLocation",
      many: false,
      ui: { displayMode: "select" },
    }),
    path: text({ validation: { isRequired: true } }),
  },
});
