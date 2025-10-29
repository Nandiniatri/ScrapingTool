// const puppeteer = require("puppeteer");

// (async () => {
//     // 1️⃣ Chrome launch karo
//     const browser = await puppeteer.launch({ headless: false });

//     // 2️⃣ New page (tab) kholo
//     const page = await browser.newPage();

//     // 3️⃣ Wikipedia page pe jao
//     await page.goto("https://en.wikipedia.org/wiki/Coronavirus", {
//         waitUntil: "networkidle2", // page poora load hone tak wait karega
//     });

//     // 4️⃣ Screenshot lo
//     await page.screenshot({ path: "wiki.png", fullPage: true });

//     // 5️⃣ Browser band karo
//     await browser.close();

//     console.log("✅ Screenshot saved as wiki.png");
// })();





//ye shai hai 
// import puppeteer from "puppeteer";

// const browser = await puppeteer.launch();
// const page = await browser.newPage();

// await page.goto("https://en.wikipedia.org/wiki/Coronavirus", {
//     waitUntil: "networkidle2",
// });

// await page.screenshot({ path: "wiki.png", fullPage: true });
// await browser.close();

// console.log("✅ Screenshot saved as wiki.png");




import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
    headless: false, // 👈 Chrome ko visible mode me khol dega
    defaultViewport: null, // 👈 Full window size
    args: ["--start-maximized"], // 👈 Window maximize
});

const page = await browser.newPage();

await page.goto("https://en.wikipedia.org/wiki/Coronavirus", {
    waitUntil: "networkidle2",
});

await page.screenshot({ path: "wiki.png", fullPage: true });

console.log("✅ Screenshot saved as wiki.png");

const result = await page.evaluate(() => {
    let headingFromWeb = document.querySelectorAll(".mw-heading");
    const headingList = [...headingFromWeb];
    return headingList.map( h => h.innerText)
})

console.log(result);

// await browser.close();

// Browser ko close karna optional hai agar tu dekhna chahta hai
// await browser.close();
