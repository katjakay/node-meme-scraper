// htmlContent = HTML information request from URL

// const url = 'https://memegen-link-examples-upleveled.netlify.app/';

// Request HTML information from the URL with axios npm

import axios from 'axios';
import cheerio from 'cheerio';

const url = `https://memegen-link-examples-upleveled.netlify.app/`;

axios
  .get(url)
  .then((response) => {
    htmlContent(response.data);
  })
  .catch((error) => {
    console.log('Warning Error!');
  });

// save HTML to new variable htmlContent using cheerio (parses markup)
