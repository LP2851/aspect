import { KeystoneContext } from "@keystone-6/core/types";
import cron from "node-cron";

export type CronContext = KeystoneContext<any>;
export type CronFunction = (context: CronContext) => Promise<void>;
export type CronConfig = {
  name: string;
  description: string;

  schedule: string;
  func: CronFunction;
};

export class CronScheduler {
  context: CronContext;

  constructor(context: CronContext) {
    this.context = context;
  }

  private async createCronWithSchedule(schedule: string, func: CronFunction) {
    cron.schedule(schedule, () => func(this.context));
  }

  private async createCron(config: CronConfig) {
    const { name, description, schedule, func } = config;

    await this.createCronWithSchedule(schedule, func);

    console.log(
      `✅ CronJob initialized (${name}): ${description}, running at ${schedule}`
    );
  }

  public async addCrons(configs: CronConfig[]) {
    for (const config of configs) {
      await this.createCron(config);
    }
  }

  public async addCron(config: CronConfig) {
    await this.createCron(config);
  }
}
