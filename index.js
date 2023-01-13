import * as fs from 'node:fs';
import https from 'node:https';
import axios from 'axios';
import * as cheerio from 'cheerio';

const url = 'https://memegen-link-examples-upleveled.netlify.app/';
const imagesArray = [];

// 0 -- Checks if folder already exists, handles error
try {
  if (!fs.existsSync('./memes')) {
    fs.mkdirSync('./memes');
  }
} catch (err) {
  console.error(err);
}

// 1 -- Requesting HTML data using axios

await axios.get(url).then((response) => {
  const $ = cheerio.load(response.data);
  const html = response.data;

  // 2 -- Filter <img> data using cheerio

  $('div', 'section', html).each(function () {
    const imageUrls = $(this).find('img').attr('src');
    imagesArray.push(imageUrls);
  });

  // 3 -- Filtering 10 images links using slice() method

  const tenMemes = imagesArray.slice(0, 10);

  // 4 -- Downloading the images (by http.request) and putting into a new folder
  // 5 -- Renaming file name starting with 01.jpg

  for (let i = 0; i < 10; i++) {
    const img = tenMemes[i];

    https.get(img, (res) => {
      const path = `memes/0${i + 1}.jpg`;
      res.pipe(fs.createWriteStream(path));
    });
  }
  console.log('Download is completed');
});
