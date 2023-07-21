// server/index.js
const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors())
app.post('/scrape', async (req, res) => {
  const { url } = req.body;
    console.log('Scraping URL:', url);
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const text = await page.evaluate(() => document.body.innerText);
    const imageUrls = await page.evaluate(() =>
      Array.from(document.images).map((img) => img.src)
    );

    await browser.close();
    console.log(imageUrls)
    console.log(text)
    res.json({ text, imageUrls });
  } catch (error) {
    res.status(500).json({ error: 'Error scraping the web page' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
