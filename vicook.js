"use strict";

const request = require("request");
const cheerio = require("cheerio");
const program = require("commander");
const fs = require('fs');

var packageInfo = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
program.version(packageInfo.version);

program.option("-t, --tomorrow", "show tomorrow menu");

program.parse(process.argv);



const url = "https://grassobbio.vicookcloud.it/menu/";
let epoch = getTodayDate().getTime() / 1000; //Today epoch in local timezone

if (!program.tomorrow) {
    //Today
    request(url + epoch, function (error, response, body) {
        const $ = cheerio.load(body);
        logDate("OGGI", $);
        logMenu($);
    });
} else {
    // Tomorrow
    epoch += (24 * 60 * 60);
    request(url + epoch, function (error, response, body) {
        const $ = cheerio.load(body);
        logDate("DOMANI", $);
        logMenu($);
    });
}

function logMenu($) {
    $("div").find(".cbp-l-grid-masonry-projects-title").each(function (index, element) {
        let menuEntry = element.firstChild.data;
        console.log("\u2022 " + capitalizeFirstLetter(menuEntry))
    });
}

function logDate(text, $) {
    console.log("=== " + text + " ===")
    console.log(capitalizeFirstLetter($("h2.second")[0].firstChild.data))
    console.log("============")
}

function getTodayDate() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function capitalizeFirstLetter(s) {
    return s.charAt(0).toUpperCase() + s.substring(1);
}


