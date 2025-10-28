// import express from "express";
// import puppeteer from "puppeteer";
// import cors from "cors";

// const app = express();
// app.use(cors());

// app.get("/scrape-flipkart", async (req, res) => {
//   const search = req.query.q || "bags"; // frontend se query aayegi
//   const url = `https://www.flipkart.com/search?q=${encodeURIComponent(search)}`;
//   let browser;

//   try {
//     browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();

//     await page.setUserAgent(
//       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
//       "(KHTML, like Gecko) Chrome/120 Safari/537.36"
//     );

//     await page.goto(url, { waitUntil: "networkidle2" });

//     const products = await page.evaluate(() => {
//       const items = [];
//       document.querySelectorAll("div._1AtVbE").forEach((card) => {
//         const name = card.querySelector("a.IRpwTa")?.innerText ||
//                      card.querySelector("div._4rR01T")?.innerText;
//         const price = card.querySelector("div._30jeq3")?.innerText;
//         const rating = card.querySelector("div._3LWZlK")?.innerText;
//         if (name && price) items.push({ name, price, rating });
//       });
//       return items;
//     });

//     await browser.close();
//     res.json(products);
//   } catch (err) {
//     if (browser) await browser.close();
//     res.status(500).json({ error: err.message });
//   }
// });

// app.listen(4000, () => console.log("✅ Backend running on http://localhost:4000"));














// import express from "express";
// import cors from "cors";

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//     res.send("Backend is working!");
// });

// app.post("/flipcart", async (req, res) => {
//     res.json({ message: "Scraping route working" });
// });

// app.listen(4000, () => console.log("✅ Backend running on http://localhost:4000"));










import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Dummy data endpoint
app.get("/api/data", (req, res) => {
    fs.readFile("./data.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "File read error" });
        }
        const jsonData = JSON.parse(data);
        res.json(jsonData);
    });
});

app.get("/", (req, res) => {
    res.send("✅ Backend is running...");
});

const PORT = 4000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
