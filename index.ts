import { Browser, executablePath } from "puppeteer";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import dotenv from "dotenv";

puppeteer.use(StealthPlugin());
dotenv.config();

const run = async () => {
  const browser: Browser = await puppeteer.launch({
    headless: "new",
    executablePath: executablePath(),
  });
  const page = await browser.newPage();
  await page.goto(process.env.FACEBOOK_URL);

  await page.type("#email", process.env.FACEBOOK_USERNAME);
  await page.type("#pass", process.env.FACEBOOK_PASSWORD);
  await page.click("[type=submit]");
  await page.waitForTimeout(7000);
  await page.screenshot({ path: "facebook.png" });

  await browser.close();
};

run();
