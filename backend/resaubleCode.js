import puppeteer from "puppeteer";
import fs from "fs";

async function scrapeData(url, selectors, outputFile) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle2" });

  const data = await page.evaluate((selectors) => {
    const products = document.querySelectorAll(selectors.container || "body");

    return Array.from(products).map((item) => {
      const result = {};
      for (const key in selectors) {
        if (key === "container") continue;
        result[key] = item.querySelector(selectors[key])?.innerText || "";
      }
      return result;
    });
  }, selectors);

  await browser.close();

  fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
  console.log(`✅ Data saved in ${outputFile}`);
}


scrapeData(
  "https://www.myntra.com/lipstick",
  {
    container: "li.product-base",
    brand: "h3.product-brand",
    productName: "h4.product-product",
    price: ".product-price",
    sizes: ".product-sizes",
    image: "img"
  },
  "MyntraLipsticks.json"
);
