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
    project: relationship({ ref: "UploadProject.uploadLocation", many: false }),

    s3Link: relationship({ ref: "UploadLocationS3", many: false }),
    localLink: relationship({ ref: "UploadLocationLocal", many: false }),
    googleDrive: relationship({ ref: "UploadLocationGoogleDrive", many: false }),
  },
  ui: {
    listView: { initialColumns: ["type", "project"] },
  },
});
