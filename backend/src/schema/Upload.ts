import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, select, timestamp } from "@keystone-6/core/fields";
import { uploadPlatformOptions, uploadStatusOptions } from "./helpers/options";

export const Upload = list({
  access: allowAll,
  db: {
    idField: { kind: "uuid" },
  },
  fields: {
    uploadTo: select({
      options: uploadPlatformOptions,
      validation: { isRequired: true },
    }),
    uploadStatus: select({
      options: uploadStatusOptions,
      defaultValue: "PENDING_RELEASE",
    }),
    project: relationship({ ref: "UploadProject.uploadsTo" }),
    createdAt: timestamp({ defaultValue: { kind: "now" } }),
    updatedAt: timestamp(),
  },
  ui: {
    listView: {
      initialColumns: ["uploadTo", "uploadStatus", "project"],
    },
  },
});
