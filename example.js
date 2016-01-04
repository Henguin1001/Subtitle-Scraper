var subtitle_scraper = require('./index.js');
var fs = require('fs');
// In goes the youtube id, you can find this in the video url (usually "v=...")
subtitle_scraper("9XQfYKYO380", function(err, arr, raw, url){
  // err contains any errors straight from the "Request" module
  // arr contains the json equivalent of the xml response of the subtitles
  // url is the url queryed to get the subtitles
  console.log(arr.transcript.text);
  fs.writeFileSync('./output.json', JSON.stringify(arr));
  // arr.transcript.text will probably be the only useful part of "arr"
});
