import {list} from "@keystone-6/core";
import {allowAll} from "@keystone-6/core/access";
import {relationship, text} from "@keystone-6/core/fields";
import {hooksAfterOperation, hooksBeforeOperation} from "./helpers/hooks";

export const ManagedAccount = list({
  access: allowAll,
  db: {
    idField: { kind: "uuid" },
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    description: text({ ui: { displayMode: "textarea" } }),

    managedAccountLinks: relationship({ ref: "ManagedAccountLink.managedAccount", many: true }),

    user: relationship({ ref: "User.managedAccounts", many: false }),
  },
  hooks: {
    ...hooksBeforeOperation,
    ...hooksAfterOperation,
  }
});
