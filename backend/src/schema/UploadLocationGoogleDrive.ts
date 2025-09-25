import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, text } from "@keystone-6/core/fields";

export const UploadLocationGoogleDrive = list({
  access: allowAll,
  db: {
    idField: { kind: "uuid" },
  },
  fields: {
    location: relationship({
      ref: "UploadLocation",
      ui: { displayMode: "select" },
    }),
    driveId: text({ validation: { isRequired: true } }),
    name: text({ validation: { isRequired: true } }),
  },
});
