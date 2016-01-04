#subtitle_scraper
The youtube api was being less of an API and more of a lamePI, so I created this. A module that will give you the captions/subitiles of a youtube video given the id

##Install
```
 npm install subtitle_scraper
```
###Example
The module is very simple and hopefully self-explanitory based on this Example (using an [Applied Science](https://www.youtube.com/watch?v=9XQfYKYO380 "Making DIY gecko tape") Video, check it out if you have time)

```js
var subtitle_scraper = require('./index.js');

// In goes the youtube id, you can find this in the video url (usually "v=...")
subtitle_scraper("l7qUo330J0M", function(err, arr, raw, url){
  // err contains any errors straight from the "Request" module
  // arr contains the json equivalent of the xml response of the subtitles
  // url is the url queryed to get the subtitles
  console.log(arr.transcript.text);
  // arr.transcript.text will probably be the only useful part of "arr"
});
```

Youtube will give data like so
```xml
<transcript>
  <text start="0" dur="4.61">
  today on Applied Science I&#39;d like to talk about my adventures in making deco
  </text>
  <text start="4.61" dur="4.13">
  tape if you haven&#39;t heard deco tape is sort of an alternative to the currently
  </text>
  <text start="8.74" dur="4.09">
  available adhesive tapes it actually works by a different mechanism and it&#39;s
  </text>
  <text start="12.83" dur="3.76">
  not really a commercial product yet but it&#39;s got a lot of press Insert of
  </text>
  <text start="16.59" dur="4.57">
  popular science articles and so it has a few attractive qualities that make it
  </text>
</transcript>
```
The module uses xml2js to parse the xml. If you think there is a better option feel free to do what you want with that information.
The results from xml2js:

```json
{"transcript":
  {"text":[
    {"_":"today on Applied Science I&#39;d like to\ntalk about my adventures in making deco","$":{"start":"0","dur":"4.61"}},
    {"_":"tape if you haven&#39;t heard deco tape is\nsort of an alternative to the currently","$":{"start":"4.61","dur":"4.13"}},
    {"_":"available adhesive tapes it actually\nworks by a different mechanism and it&#39;s","$":{"start":"8.74","dur":"4.09"}},
    {"_":"not really a commercial product yet but\nit&#39;s got a lot of press Insert of","$":{"start":"12.83","dur":"3.76"}},
    {"_":"popular science articles and so it has a\nfew attractive qualities that make it","$":{"start":"16.59","dur":"4.57"}}]
    }
  }
```
