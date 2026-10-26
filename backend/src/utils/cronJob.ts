import cron from "node-cron";
import { urlRepository } from "../url/url.service.js";

cron.schedule("0 0 * * *", async () => {
  try {
    const result = await urlRepository
      .createQueryBuilder()
      .delete()
      .where("expiresAt < :currentDate", { currentDate: new Date() })
      .execute();

    if (result.affected && result.affected > 0) {
      console.log(`Deleted ${result.affected} expired records.`);
    } else {
      console.log("No expired records found to delete.");
    }
  } catch (err) {
    console.log(err);
  }
});
