import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { select, text, timestamp } from "@keystone-6/core/fields";

export const Video = list({
  access: allowAll,
  db: {
    idField: { kind: "uuid" },
  },
  fields: {
    title: text({
      validation: {
        isRequired: true,
      },
    }),
    description: text(),
    filePath: text({
      validation: {
        isRequired: true,
      },
    }),
    status: select({
      options: [
        { label: "Pending", value: "pending" },
        { label: "Uploading", value: "uploading" },
        { label: "Uploaded", value: "uploaded" },
        { label: "Failed", value: "failed" },
      ],
      defaultValue: "pending",
    }),
    uploadedAt: timestamp(),
  },
});
