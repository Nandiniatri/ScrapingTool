import puppeteer from "puppeteer";
import fs from "fs";

const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();

// Myntra Lipstick page open karo
await page.goto("https://www.myntra.com/lipstick", { waitUntil: "networkidle2" });

// Data evaluate karna page ke andar
const data = await page.evaluate(() => {
  // sabhi product cards select kar rahe hain
  const products = document.querySelectorAll("li.product-base");

  return Array.from(products).map((item) => {
    const brand = item.querySelector("h3.product-brand")?.innerText || "";
    const productName = item.querySelector("h4.product-product")?.innerText || "";
    const price = item.querySelector(".product-price")?.innerText || "";
    const sizes = item.querySelector(".product-sizes")?.innerText || "";
    const image = item.querySelector("img")?.src || "";

    return {
      brand,
      productName,
      price,
      sizes,
      image,
    };
  });
});

await browser.close();

// Data ko file me likh do
fs.writeFileSync("MyntraLipsticks.json", JSON.stringify(data, null, 2));
console.log("✅ Data saved in MyntraLipsticks.json");
