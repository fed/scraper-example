const cheerio = require('cheerio')
const axios = require('axios');
const nodemailer = require('nodemailer');

console.log('\n-------------------------------------------');
console.log('   Fetching data... Please hang tight ✨');
console.log('-------------------------------------------\n');

// Load the initial page of the thread and scrape the page for the last page.
const firstPageUrl = 'http://www.australiaforum.com/visas-immigration/209161-current-457-visa-processing-time-march-2017-a.html';

axios
  .get(firstPageUrl)
  .then(response => {
    const $ = cheerio.load(response.data);
    const lastPageUrl = $('.pagenav').first().find('td.alt1').last().find('a').attr('href');

    return lastPageUrl;
  })
  .then(url => axios.get(url))
  .then(response => {
    const $ = cheerio.load(response.data);
    const lastPostInPage = Number($('.vbseo_like_postbit a strong').last().text());
    const postId = $('.vbseo_like_postbit').last().find('a').attr('id').slice(9);
    const postContent = $('#post_message_' + postId).html();

    console.log(postContent);
  });
