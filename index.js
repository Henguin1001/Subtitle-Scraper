/*
  This module grabs the subtitle of a video on youtube given the url
  Beware, this does not use the api, so high frequency requests are frowned upon

  npm: subtitle_scraper
  author: Henry Troutman
*/

var request = require('request'),
  async = require('async'),
  parseString = require('xml2js').parseString;

var timedTextRegex = /"ttsurl":\s*"(.*?)"/gi;


function scrape(id, cb){
  request('https://www.youtube.com/watch?v=' + id, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var m, url;
      while ((m = timedTextRegex.exec(body)) !== null) {
          if (m.index === timedTextRegex.lastIndex) {
              timedTextRegex.lastIndex++;
          }
          url = m[1];
          url = url.replace(/\\/gi, '').replace(/u0026/gi, '&');
          url = url + "&kind=asr&lang=en&fmt=srv1";
      }
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          parseString(body, function (err, result) {
              cb(null, result, body, url);
          });
        } else cb(error);
      });
    } else cb(error);
  });
}
//options can contain a time variable to limit requests
function scrapeBulk(ids, options, fncb){
  async.map(ids, function(id, ascb){
    if(!options.delay) options.delay = 1;
    setTimeout(function(){
      scrape(id, ascb);
    }, options.delay);
  }, fncb);
}

// if it is bulk than arg_1 holds options instead of the callback
module.exports = function(id, arg_1, arg_2){
  if(id.isArray()){
    scrape(id, arg_1, arg_2);
  } else {
    scrapeBulk(id, arg_1);
  }
};
