import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import cors from "cors";

const app = express();
app.use(cors());


app.get("/api/books", async (req, res) => {
  try {
    const url = "http://books.toscrape.com/catalogue/category/books_1/index.html";
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);
    const books = [];

    $(".product_pod").each((i, el) => {
      const title = $(el).find("h3 a").attr("title");
      const price = $(el).find(".price_color").text();
      const image = $(el).find("img").attr("src");

      books.push({
        title,
        price,
        image: image ? "http://books.toscrape.com/" + image.replace("../", "") : null,
      });
    });

    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching data" });
  }
});

app.listen(4000, () => console.log("✅ Server running on port 4000"));
