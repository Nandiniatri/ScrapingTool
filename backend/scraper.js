import puppeteer from "puppeteer";

export async function scrapeData(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  const data = await page.evaluate(() => {
    const products = document.querySelectorAll("li.product-base");
    return Array.from(products).map((item) => ({
      brand: item.querySelector("h3.product-brand")?.innerText || "",
      productName: item.querySelector("h4.product-product")?.innerText || "",
      price: item.querySelector(".product-price")?.innerText || "",
      sizes: item.querySelector(".product-sizes")?.innerText || "",
      image: item.querySelector("img")?.src || "",
    }));
  });

  await browser.close();
  return data;
}

