"use strict";

const request = require('request');
const cheerio = require('cheerio');
const program = require('commander');

program.version("0.0.2");
program.option('-t, --tomorrow', 'show tomorrow menu');

program.parse(process.argv);


request('https://grassobbio.vicookcloud.it/menu', function (error, response, body) {
    const $ = cheerio.load(body);

    if (!program.tomorrow) {

        logDate("OGGI", $);
        logMenu($);

    } else {
        let domani = $('a.mono_day_selector')[0].href;

        console.log(domani);

        request(domani, function(error, response, body){
            const $ = cheerio.load(body);

            logDate("DOMANI", $);
            logMenu($);
       });
    }
});

function capitalize(element){
    return element.charAt(0).toUpperCase() + element.substring(1);
};

function logMenu($){
    $('div').find('.cbp-l-grid-masonry-projects-title').each(function (index, element){
        element = element.firstChild.data;
        console.log(capitalize(element))
    });
};

function logDate(text, $){
    console.log("=== " + text + " ===")
    console.log(capitalize($('h2.second')[0].firstChild.data))
    console.log("============")
};

