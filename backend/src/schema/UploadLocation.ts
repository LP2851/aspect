import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, select } from "@keystone-6/core/fields";
import { uploadLocationTypeOptions } from "./helpers/options";

export const UploadLocation = list({
  access: allowAll,
  db: {
    idField: { kind: "uuid" },
  },
  fields: {
    type: select({
      options: uploadLocationTypeOptions,
      validation: { isRequired: true },
    }),
    project: relationship({ ref: "UploadProject.uploadLocation" }),
  },
  ui: {
    listView: { initialColumns: ["type", "project"] },
  },
});
