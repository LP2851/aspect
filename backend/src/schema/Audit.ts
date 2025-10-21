import {list} from "@keystone-6/core";
import {allowAll} from "@keystone-6/core/access";
import {json, relationship, select, text, timestamp} from "@keystone-6/core/fields";
import {AUDIT_CHANGE_SUB_TYPES, AUDIT_TYPES_OPTIONS} from "./helpers/options";
import {KeystoneContext} from "@keystone-6/core/types";

const IGNORED_KEYS = ["id", "createdAt", "updatedAt", "deletedAt", "password", "refreshToken", "accessToken", "scopes", "expiryDate"];

export const createAudit = async (
  cxt: KeystoneContext,
  data: {
    type: string,
    tableName: string,
    recordId: string,
    changeSubType?: string,
    changes?: any,
  }
) => {
  await cxt.db.Audit.createOne({
    data: {
      ...data,
      createdBy: { connect: { id: cxt.session?.itemId } },
    }
  });
}

export const generateChanges = (oldData: any, newData: any) => {
  const changes: any = {};
  for (const key in newData) {
    if (IGNORED_KEYS.includes(key)) continue;

    if (newData[key] !== undefined && newData[key] !== oldData[key]) {
      changes[key] = {
        before: oldData[key],
        after: newData[key],
      };
    }
  }
  return changes;
}

export const specificChangeToSubTypeMapping = (listKey: string, oldData: any, newData: any) => {
  if (listKey === "Upload") {
    if (newData["uploadStatus"] !== undefined
      && oldData["uploadStatus"] !== newData["uploadStatus"]) {
      return "TASK_UPDATE_" + newData["uploadStatus"];
    }
  }

  // if (listKey === "UploadProject") {}

  return undefined;
}

export const Audit = list({
  access: allowAll,
  db: {
    idField: { kind: "uuid" },
  },
  fields: {
    type: select({
      options: AUDIT_TYPES_OPTIONS,
      validation: { isRequired: true },
    }),

    tableName: text({ validation: { isRequired: true } }),
    recordId: text({ validation: { isRequired: true } }),
    changeSubType: select({
      options: AUDIT_CHANGE_SUB_TYPES,
    }),
    changes: json(),

    createdBy: relationship({ ref: "User", many: false }),
    createdAt: timestamp({ defaultValue: { kind: "now" } }),
  },
});


