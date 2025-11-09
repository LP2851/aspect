import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, select, text, timestamp } from "@keystone-6/core/fields";
import {
  PROJECT_STATUS_OPTIONS,
  PROJECT_TYPE_OPTIONS,
} from "./helpers/options";
import { hooksAfterOperation, hooksBeforeOperation } from "./helpers/hooks";

export const UploadProject = list({
  access: allowAll,
  // access: {
  //   operation: {
  //     query: ({session}) => !!session,
  //     create: ({session}) => !!session,
  //     update: ({session}) => !!session,
  //     delete: ({session}) => !!session,
  //   },
  //   filter: {
  //     query: ({session}) => {
  //       if (!session?.itemId) return false;
  //       if (session.data?.isAdmin) return true;
  //       return {user: {id: {equals: session.itemId}}}; // only own projects
  //     },
  //     update: ({session}) => {
  //       if (!session?.itemId) return false;
  //       if (session.data?.isAdmin) return true;
  //       return {user: {id: {equals: session.itemId}}};
  //     },
  //     delete: ({session}) => {
  //       if (!session?.itemId) return false;
  //       if (session.data?.isAdmin) return true;
  //       return {user: {id: {equals: session.itemId}}};
  //     },
  //   },
  // },
  db: {
    idField: { kind: "uuid" },
  },
  fields: {
    projectName: text({ validation: { isRequired: true } }),
    description: text({ ui: { displayMode: "textarea" } }),
    projectType: select({
      options: PROJECT_TYPE_OPTIONS,
      defaultValue: "MULTI_MEDIA",
      validation: { isRequired: true },
    }),
    account: relationship({
      ref: "ManagedAccount",
      ui: { displayMode: "select" },
    }),
    status: select({
      options: PROJECT_STATUS_OPTIONS,
      defaultValue: "CREATED",
      validation: { isRequired: true },
    }),
    uploadLocation: relationship({
      ref: "UploadLocation.project",
      ui: { displayMode: "select" },
    }),
    uploadsTo: relationship({ ref: "Upload.project", many: true }),

    textContent: text({ ui: { displayMode: "textarea" } }),

    createdAt: timestamp({ defaultValue: { kind: "now" } }),
    updatedAt: timestamp({
      defaultValue: { kind: "now" },
      db: { updatedAt: true },
    }),
    deletedAt: timestamp(),
  },
  ui: {
    listView: {
      initialColumns: ["projectName", "projectType", "status", "createdAt"],
    },
  },
  hooks: {
    ...hooksBeforeOperation,
    ...hooksAfterOperation,
  },
});
