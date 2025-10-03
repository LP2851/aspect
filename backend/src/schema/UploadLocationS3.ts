import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, text } from "@keystone-6/core/fields";

export const UploadLocationS3 = list({
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
    bucket: text({ validation: { isRequired: true } }),
    key: text({ validation: { isRequired: true } }),
  },
});
