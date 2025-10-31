import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
});

const page = await browser.newPage();

await page.goto("https://news.ycombinator.com/", {
    waitUntil: "networkidle2",
});

await page.screenshot({ path: "newScraping.png", fullPage: true });


const data = await page.evaluate(() => {
  const elements = document.querySelectorAll("span.titleline a");
  return Array.from(elements).map(el => ({
    title: el.innerText,
    link: el.href
  }));
});

console.log("let see what happeded" , data);

await browser.close();