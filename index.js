/* eslint-disable @typescript-eslint/no-floating-promises */

import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';

// Loading HTML using cheerio -> DONE
// Scrape img links only -> DONE
// Filter to 10 links -> download -> request data with fetch()
// Push download to folder -> re-naming file name -> writing data to file

try {
  if (!fs.existsSync('./memes')) {
    fs.mkdirSync('./memes');
  }
} catch (err) {
  console.error(err);
}

axios
  .get('https://memegen-link-examples-upleveled.netlify.app/')
  .then((urlResponse) => {
    const $ = cheerio.load(urlResponse.data);

    // for (let i = 0; i < 10; i++) {
    $('div').each((index, element) => {
      const imageUrls = $(element).find('img').attr('src');

      fetch(imageUrls).then((response) => {
        const path = './memes/';

        const dest = fs.createWriteStream(path);
        response.body.pipe(dest);
      });
    });

    console.log('Images downloaded successfully!');
  });
