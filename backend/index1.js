import express from "express";
import cors from "cors";
import puppeteer from "puppeteer";
import fs from "fs";

const app = express();
app.use(cors());

async function scrapeTops() {
  const url = "https://www.thecollective.in/c/women-tops";
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
  await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

  // scroll thoda-thoda karwao taaki sab products load ho jaye
  await autoScroll(page);

  const titles = await page.evaluate(() => {
    const arr = [];
    document.querySelectorAll(".product-name").forEach((el) => {
      const text = el.innerText.trim();
      if (text) arr.push(text);
    });
    return arr;
  });

  fs.writeFileSync("scraped.json", JSON.stringify(titles, null, 2), "utf-8");
  await browser.close();
  return titles;
}

// helper: scroll for lazy-load
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 500;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 300);
    });
  });
}

// GET API endpoint
app.get("/api/tops", async (req, res) => {
  try {
    const data = await scrapeTops();
    res.json({ count: data.length, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Scraping failed" });
  }
});

app.listen(4000, () => console.log("🚀 Backend running on port 4000"));
