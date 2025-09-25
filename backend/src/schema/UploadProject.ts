import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, select, text, timestamp } from "@keystone-6/core/fields";
import { projectStatusOptions } from "./helpers/options";

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
    user: relationship({ ref: "User.projects", ui: { displayMode: "select" } }),
    status: select({
      options: projectStatusOptions,
      defaultValue: "CREATED",
      validation: { isRequired: true },
    }),
    uploadLocation: relationship({
      ref: "UploadLocation.project",
      ui: { displayMode: "select" },
    }),
    uploadsTo: relationship({ ref: "Upload.project", many: true }),
    createdAt: timestamp({ defaultValue: { kind: "now" } }),
    updatedAt: timestamp({
      defaultValue: { kind: "now" },
      db: { updatedAt: true },
    }),
    deletedAt: timestamp(),
  },
  ui: {
    listView: {
      initialColumns: ["projectName", "status", "createdAt"],
    },
  },
});
