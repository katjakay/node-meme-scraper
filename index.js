import axios from 'axios';
import * as cheerio from 'cheerio';

axios
  .get('https://memegen-link-examples-upleveled.netlify.app/')
  .then((urlResponse) => {
    const $ = cheerio.load(urlResponse.data);

    $('div').each((index, element) => {
      const imageUrls = $(element).find('a').attr('href');

      console.log(imageUrls);
    });
  });
