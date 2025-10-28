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










// // index.js (backend) //example 1 simple data fetch
// import express from "express";
// import cors from "cors";

// const app = express();
// app.use(cors());

// const users = [
//     { id: 1, name: "Nandini", role: "Frontend Developer" },
//     { id: 2, name: "Shivam", role: "Backend Developer" },
//     { id: 3, name: "Anjali Bhatt", role: "Backend Developer" }
// ];

// app.get("/api/users", (req, res) => {
//     res.json(users);
// });

// app.listen(4000, () => console.log("Server running on port 4000"));






// import express from "express";
// import cors from "cors";
// import fs from "fs";

// const app = express();
// app.use(cors());

// app.get("/api/users", (req, res) => {
//   fs.readFile("./data.json", "utf-8", (err, data) => {
//     if (err) {
//       console.error("Error reading file:", err);
//       return res.status(500).json({ message: "Error reading data file" });
//     }
//     res.json(JSON.parse(data));
//   });
// });

// app.listen(4000, () => console.log("🚀 Server running on port 4000"));



import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());

// data.json file ek hi bar read kar rahe hain (startup me)
const users = JSON.parse(fs.readFileSync("./data.json", "utf-8"));

// API route
app.get("/api/users", (req, res) => {
  res.json(users);
});

app.listen(4000, () => console.log("🚀 Server running on port 4000"));
