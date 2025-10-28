// import express from "express";
// import cors from "cors";
// import puppeteer from "puppeteer";

// const app = express();
// app.use(cors());

// app.get("/api/products", async (req, res) => {
//   try {
//     const browser = await puppeteer.launch({
//       headless: false,
//       args: ["--no-sandbox", "--disable-setuid-sandbox"],
//     });




//     const page = await browser.newPage();

//     const url =
//       "https://www.thecollective.in/c/women-tops?page=1&orderby=position&orderway=desc&fp[]=Subbrand__fq:Ted+Baker";

//     await page.setUserAgent(
//       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"
//     );

//     await page.goto(url, {
//       waitUntil: "domcontentloaded",
//       timeout: 60000,
//     });

//     // Wait for product list to load
//     await page.waitForSelector(".plp-product-card, .product-tile", {
//       timeout: 30000,
//     });

//     // Scroll to load all products
//     await page.evaluate(async () => {
//       await new Promise((resolve) => {
//         let totalHeight = 0;
//         const distance = 500;
//         const timer = setInterval(() => {
//           window.scrollBy(0, distance);
//           totalHeight += distance;
//           if (totalHeight >= document.body.scrollHeight) {
//             clearInterval(timer);
//             resolve();
//           }
//         }, 800);
//       });
//     });

//     // Extract data
//     const products = await page.evaluate(() => {
//       const items = [];
//       document.querySelectorAll(".plp-product-card, .product-tile").forEach((el) => {
//         const title =
//           el.querySelector(".pdp-link")?.innerText ||
//           el.querySelector("h2")?.innerText;
//         const price =
//           el.querySelector(".pdp-price")?.innerText ||
//           el.querySelector(".product-price")?.innerText;
//         const img = el.querySelector("img")?.src;
//         const link = el.querySelector("a")?.href;

//         if (title && img) {
//           items.push({ title, price, image: img, link });
//         }
//       });
//       return items;
//     });

//     await browser.close();
//     res.json(products);
//   } catch (err) {
//     console.error("❌ Error scraping data:", err);
//     res.status(500).json({ message: "Error scraping data" });
//   }
// });

// app.listen(4000, () => console.log("✅ Server running on port 4000"));




import express from "express";
import cors from "cors";
import puppeteer from "puppeteer";

const app = express();
app.use(cors());

app.get("/api/products", async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // ✅ Site ke liye correct URL (Ted Baker tops)
    const url =
      "https://www.thecollective.in/c/women-tops?page=1&orderby=position&orderway=desc&fp%5B%5D=Subbrand__fq%3ATed+Baker";

    console.log("🌐 Visiting:", url);
    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    // ✅ Scroll down to load all products
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 1000;
        const timer = setInterval(() => {
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= document.body.scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 1000);
      });
    });

    // ✅ Extract product data
    const products = await page.evaluate(() => {
      const items = [];
      document.querySelectorAll(".product-tile").forEach((el) => {
        const title =
          el.querySelector(".pdp-link")?.innerText ||
          el.querySelector("h2")?.innerText;
        const price = el.querySelector(".product-price")?.innerText;
        const img = el.querySelector("img")?.src;
        const link = el.querySelector("a")?.href;
        if (title && img) {
          items.push({ title, price, image: img, link });
        }
      });
      return items;
    });

    await browser.close();

    console.log(`✅ Scraped ${products.length} products`);
    res.json(products);
  } catch (err) {
    console.error("❌ Error scraping data:", err);
    res
      .status(500)
      .json({ message: "Error scraping data", error: err.message });
  }
});

app.listen(4000, () => console.log("✅ Server running on port 4000"));
