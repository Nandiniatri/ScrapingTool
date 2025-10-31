// import puppeteer from "puppeteer";
// import fs from "fs";


// const browser = await puppeteer.launch({
//     headless: false,
//     defaultViewport: null,
//     args: ["--start-maximized"],
// });

// const page = await browser.newPage();

// await page.goto("https://news.ycombinator.com/", {
//     waitUntil: "networkidle2",
// });

// await page.screenshot({ path: "newScraping.png", fullPage: true });


// const data = await page.evaluate(() => {
//   const elements = document.querySelectorAll("span.titleline a");
//   return Array.from(elements).map(el => ({
//     title: el.innerText,
//     link: el.href
//   }));
// });

// console.log("let see what happeded" , data);

// await browser.close();



import puppeteer from "puppeteer";
import fs from "fs";

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

await page.goto("https://news.ycombinator.com/", { waitUntil: "networkidle2" });

const data = await page.evaluate(() => {
    const elements = document.querySelectorAll("span.titleline a");
    return Array.from(elements).map(el => ({
        title: el.innerText,
        link: el.href
    }));
});

await browser.close();

fs.writeFileSync("hackerNews.json", JSON.stringify(data, null, 2));
console.log("✅ Data saved in hackerNews.json");
