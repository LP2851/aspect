import { CronContext, CronScheduler } from "./helpers";
import jobs from "./jobs";

export const initCrons = async (context: CronContext) => {
  console.log("✨ Creating cron jobs");

  const scheduler = new CronScheduler(context);
  await scheduler.addCrons(jobs);
  console.log("✅ All cron jobs created");
};
