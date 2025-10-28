// Run: npm init -y && npm install express puppeteer cors
import express from "express";
import puppeteer from "puppeteer";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/scrape-flipkart", async (req, res) => {
  const q = req.query.q || "mobile";
  const url = `https://www.flipkart.com/search?q=${encodeURIComponent(q)}`;

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    const page = await browser.newPage();

    // polite headers
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
      "(KHTML, like Gecko) Chrome/120 Safari/537.36"
    );
    await page.setViewport({ width: 1200, height: 800 });

    // go to page
    await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });

    // Wait for product containers (update selector if site changes)
    await page.waitForSelector("div._1AtVbE", { timeout: 10000 }).catch(()=>{});

    // Extract product data
    const products = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll("div._1AtVbE"));
      const result = [];
      for (const r of rows) {
        // These selectors are examples — inspect page and update accordingly
        const titleEl = r.querySelector("div._4rR01T") || r.querySelector("a.IRpwTa");
        const priceEl = r.querySelector("div._30jeq3");
        const ratingEl = r.querySelector("div._3LWZlK") || r.querySelector("div._2WkVRV");

        if (titleEl && priceEl) {
          result.push({
            title: titleEl.innerText.trim(),
            price: priceEl.innerText.trim(),
            rating: ratingEl ? ratingEl.innerText.trim() : null,
            url: (r.querySelector("a") && r.querySelector("a").href) || null
          });
        }
      }
      return result;
    });

    // close browser and return
    await browser.close();
    res.json({ query: q, count: products.length, products });
  } catch (err) {
    if (browser) await browser.close();
    console.error(err);
    res.status(500).json({ error: "Scrape failed", details: err.message });
  }
});

app.listen(4000, () => console.log("Backend running on http://localhost:4000"));
