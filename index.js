// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

const isValidUnixTimestamp = (input) => {
  const timestamp = Number(input);
  const date = new Date(timestamp);
  return !isNaN(timestamp) && !isNaN(date.getTime());
};

const isValidDateString = (input) => {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if ( !datePattern.test(input) ) {
    return false;
  }

  const date = new Date(input);
  return !isNaN(date.getTime()) && input === date.toISOString().split('T')[0];
};

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
  
  const input = req.params.date;

  if ( isValidDateString(input) ) {
    const date = new Date(input);
    const unix = date.getTime();
    const utc = date.toUTCString();

    res.json({
      "unix": unix,
      "utc": utc
    })
  } else if ( isValidUnixTimestamp(input) ) {
    const timestamp = Number(input);
    const date = new Date(timestamp);
    const unix = date.getTime();
    const utc = date.toUTCString();

    res.json({
      "unix": unix,
      "utc": utc
    })
  } else if ( !input ) {
    const date = new Date();
    const unix = date.getTime();
    const utc = date.toUTCString();

    res.json({
      "unix": unix,
      "utc": utc
    })
  } else {
    res.json({
      "error": "Invalid Date"
    })
  }
  
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
