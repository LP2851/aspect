import {list} from "@keystone-6/core";
import {allowAll} from "@keystone-6/core/access";
import {relationship, select, text, timestamp} from "@keystone-6/core/fields";
import {UPLOAD_PLATFORM_OPTIONS} from "./helpers/options";
import {encrypt} from "../utils/encrypt";
import {hooksAfterOperation, hooksBeforeOperation} from "./helpers/hooks";

export const ManagedAccountLink = list({
  access: allowAll,
  db: {
    idField: { kind: "uuid" },
  },
  fields: {
    accountName: text({ validation: { isRequired: true } }),
    managedAccount: relationship({ ref: "ManagedAccount.managedAccountLinks", many: false }),

    tokenFor: select({
      options: UPLOAD_PLATFORM_OPTIONS,
      validation: { isRequired: true },
    }),

    accessToken: text({
      validation: {
        isRequired: true,
      },
    }),
    refreshToken: text({
      validation: {
        isRequired: true,
      },
    }),
    expiryDate: timestamp({
      validation: {
        isRequired: true,
      },
    }),
    scopes: text({
      validation: {
        isRequired: true,
      },
    }),
  },
  hooks: {
    ...hooksBeforeOperation,
    ...hooksAfterOperation,

    resolveInput: async ({ resolvedData }) => {
      if (resolvedData.accessToken) {
        resolvedData.accessToken = encrypt(resolvedData.accessToken.toString());
      }
      if (resolvedData.refreshToken) {
        resolvedData.refreshToken = encrypt(
          resolvedData.refreshToken.toString()
        );
      }
      return resolvedData;
    },
  }
});
