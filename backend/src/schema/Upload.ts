import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, select, timestamp } from "@keystone-6/core/fields";
import { UPLOAD_PLATFORM_OPTIONS, UPLOAD_STATUS_OPTIONS } from "./helpers/options";
import {hooksAfterOperation, hooksBeforeOperation} from "./helpers/hooks";

export const Upload = list({
  access: allowAll,
  db: {
    idField: { kind: "uuid" },
  },
  fields: {
    uploadTo: select({
      options: UPLOAD_PLATFORM_OPTIONS,
      validation: { isRequired: true },
    }),
    uploadStatus: select({
      options: UPLOAD_STATUS_OPTIONS,
      defaultValue: "PENDING_RELEASE",
    }),
    project: relationship({ ref: "UploadProject.uploadsTo" }),
    scheduledFor: timestamp(),

    createdAt: timestamp({ defaultValue: { kind: "now" } }),
    updatedAt: timestamp(),
  },
  ui: {
    listView: {
      initialColumns: ["uploadTo", "uploadStatus", "project"],
    },
  },
  hooks: {
    ...hooksBeforeOperation,
    ...hooksAfterOperation,
  },
});
