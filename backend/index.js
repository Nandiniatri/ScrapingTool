import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/scrape", async (req, res) => {
  try {
    const { data } = await axios.get("https://quotes.toscrape.com/");
    const $ = cheerio.load(data);
    const quotes = [];

    $(".quote").each((i, el) => {
      quotes.push({
        text: $(el).find(".text").text(),
        author: $(el).find(".author").text(),
      });
    });

    res.json(quotes);
  } catch (err) {
    res.status(500).json({ error: "Scraping failed" });
  }
});

app.listen(4000, () => console.log("✅ Backend running on http://localhost:4000"));
