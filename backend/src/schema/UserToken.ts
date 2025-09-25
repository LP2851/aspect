import { allowAll } from "@keystone-6/core/access";
import { relationship, select, text, timestamp } from "@keystone-6/core/fields";
import { encrypt } from "../utils/encrypt";
import { list } from "@keystone-6/core";
import { uploadPlatformOptions } from "./helpers/options";

export const UserToken = list({
  access: allowAll,
  db: {
    idField: { kind: "uuid" },
  },
  fields: {
    user: relationship({ ref: "User.tokens" }),

    tokenFor: select({
      options: uploadPlatformOptions,
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
  },
});
