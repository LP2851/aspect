import cron from "node-cron";
import {getContext} from "@keystone-6/core/context";
import {config} from "@keystone-6/core";
import * as PrismaModule from '@prisma/client'

// cron.schedule("* * * * *", async () => {
//   console.log("⏰ Running cron job...");
//
//   const context = getContext(config as any, PrismaModule)
//     .sudo();
//
//   console.log((await context.db.User.findMany()).length);
// });
