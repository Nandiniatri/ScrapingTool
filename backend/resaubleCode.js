// import puppeteer from "puppeteer";
// import fs from "fs";

// async function scrapeData(url, selectors, outputFile) {
//   const browser = await puppeteer.launch({ headless: true });
//   const page = await browser.newPage();

//   await page.goto(url, { waitUntil: "networkidle2" });

//   const data = await page.evaluate((selectors) => {
//     const products = document.querySelectorAll(selectors.container || "body");

//     return Array.from(products).map((item) => {
//       const result = {};
//       for (const key in selectors) {
//         if (key === "container") continue;
//         result[key] = item.querySelector(selectors[key])?.innerText || "";
//       }
//       return result;
//     });
//   }, selectors);

//   await browser.close();

//   fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
//   console.log(`✅ Data saved in ${outputFile}`);
// }


// scrapeData(
//   "https://www.myntra.com/lipstick",
//   {
//     container: "li.product-base",
//     brand: "h3.product-brand",
//     productName: "h4.product-product",
//     price: ".product-price",
//     sizes: ".product-sizes",
//     image: "img"
//   },
//   "MyntraLipsticks.json"
// );





import puppeteer from "puppeteer";
import fs from "fs";

/**
 * 🔁 Reusable Generic Scraper
 * Works for any website — just pass URL + selectors + output filename.
 * 
 * Example selectors structure:
 * {
 *   container: "li.product-base",
 *   brand: { selector: "h3.product-brand", type: "text" },
 *   productName: { selector: "h4.product-product", type: "text" },
 *   price: { selector: ".product-price", type: "text" },
 *   image: { selector: "img", type: "attr", attr: "src" }
 * }
 */



export async function scrapeWebsite(url, selectors, outputFile = "data.json") {
  console.log(`🚀 Starting scrape for: ${url}`);

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle2" });

  // Scroll down to load lazy content (optional but useful)
  await autoScroll(page);

  const data = await page.evaluate((selectors) => {
    const items = document.querySelectorAll(selectors.container);
    return Array.from(items).map((item) => {
      const result = {};

      for (const key in selectors) {
        if (key === "container") continue;
        const config = selectors[key];
        const element = item.querySelector(config.selector);
        if (!element) {
          result[key] = "";
          continue;
        }

        if (config.type === "attr") {
          result[key] = element.getAttribute(config.attr || "src") || "";
        } else if (config.type === "html") {
          result[key] = element.innerHTML.trim();
        } else {
          result[key] = element.innerText.trim();
        }
      }

      return result;
    });
  }, selectors);

  await browser.close();

  fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
  console.log(`✅ Data saved in ${outputFile}`);
  return data;
}

/** ♻️ Auto-scrolls the page to ensure all products load (for infinite scroll sites) */
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 500;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 400);
    });
  });
}
