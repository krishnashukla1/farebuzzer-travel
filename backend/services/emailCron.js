import cron from "node-cron";
import fetchEmails from "../services/fetchEmails.js";

cron.schedule("*/2 * * * *", async () => {
  console.log("Checking Gmail inbox...");
  await fetchEmails();
});
