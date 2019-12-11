"use strict";

const request = require('request');
const cheerio = require('cheerio');

request('https://grassobbio.vicookcloud.it/menu', function (error, response, body) {
    const $ = cheerio.load(body);

    console.log("=== OGGI ===")
    console.log(capitalize($('h2.second')[0].firstChild.data))
    console.log("============")

    $('div').find('.cbp-l-grid-masonry-projects-title').each(function (index, element){
        element = element.firstChild.data;
        console.log(capitalize(element))
    })
});

function capitalize(element){
    return element.charAt(0).toUpperCase() + element.substring(1);
}
