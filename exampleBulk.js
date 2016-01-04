var subtitle_scraper = require('./index.js');
// It is also possible now to provide a list of ids to get the subtitles for each
// a delay can be provide and probably should be
subtitle_scraper(["9XQfYKYO380", "KAm7qAKAXwI", "cwN983PnJoA"], { delay: 2000 }, function(err, arr){
  //arr contains an array of the same type of results as with the simple request in their respective order
  console.log(arr);
});
