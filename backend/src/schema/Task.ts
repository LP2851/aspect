import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import {
  integer,
  json,
  relationship,
  select,
  text,
  timestamp,
} from "@keystone-6/core/fields";
import {
  UPLOAD_PLATFORM_OPTIONS,
  UPLOAD_STATUS_OPTIONS,
} from "./helpers/options";
import { hooksAfterOperation, hooksBeforeOperation } from "./helpers/hooks";

const TASK_STATUS_OPTIONS = [
  { label: "Pending", value: "PENDING" },
  { label: "Running", value: "RUNNING" },
  { label: "Success", value: "SUCCESS" },
  { label: "Failed", value: "FAILED" },
  { label: "Cancelled", value: "CANCELLED" },
];

export const Task = list({
  access: allowAll,
  db: {
    idField: { kind: "uuid" },
  },
  fields: {
    type: relationship({ ref: "TaskType" }),
    status: select({
      options: TASK_STATUS_OPTIONS,
      validation: { isRequired: true },
    }),
    priority: integer({ validation: { isRequired: true }, defaultValue: 0 }),

    startedAt: timestamp(),
    completedAt: timestamp(),

    metadata: json(),
    errorMessage: text(),
    // logs:

    project: relationship({
      ref: "UploadProject",
    }),

    createdAt: timestamp({ defaultValue: { kind: "now" } }),
    updatedAt: timestamp(),
  },
  ui: {
    listView: {
      initialColumns: ["id", "type", "status", "project"],
    },
  },
  hooks: {
    ...hooksBeforeOperation,
    ...hooksAfterOperation,
  },
});
