import { KeystoneContext } from "@keystone-6/core/types";
import { initCrons } from "../../cron";
import { generateTaskTypes } from "../../data/taskTypes";

export default async (context: KeystoneContext<any>) => {
  await generateTaskTypes(context);

  await initCrons(context);
};
