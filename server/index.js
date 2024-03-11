const cron = require("node-cron");
require("dotenv").config();
const productJob = require("./cronJobs/productJob");

cron.schedule(process.env.PRODUCT_JOB || "0 */6 * * *", () => {
  console.log("\x1b[43m\x1b[32m%s\x1b[0m", "- Cron: Product job is running...");
  productJob();
});
