import { CronContext } from "../helpers";

const testCron = async (context: CronContext) => {
  console.log("✅ Test cron job run successfully");
};

export default {
  name: "TestCron",
  description: "Test cron job",
  schedule: "*/5 * * * *",
  func: testCron,
};
