import {createAudit, generateChanges, specificChangeToSubTypeMapping} from "../Audit";
import {ListHooks} from "@keystone-6/core/types";

export const hooksAfterOperation: ListHooks<any> = {
  afterOperation: {
    create: async ({context, item, listKey}) => {
      await createAudit(context, {
        type: "CREATE",
        tableName: listKey,
        recordId: item.id.toString(),
      });
    },
  }
};

export const hooksBeforeOperation: ListHooks<any> = {
  beforeOperation: {
    update: async ({context, item, resolvedData, listKey}) => {
      await createAudit(context, {
        type: "UPDATE",
        tableName: listKey,
        recordId: item.id.toString(),
        changeSubType: specificChangeToSubTypeMapping(listKey, item, resolvedData),
        changes: generateChanges(item, resolvedData),
      });
    },
    delete: async ({context, item, listKey}) => {
      await createAudit(context, {
        type: "DELETE",
        tableName: listKey,
        recordId: item.id.toString(),
      });
    }
  },
};
