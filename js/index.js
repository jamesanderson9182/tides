process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
const axios = require('axios');
const jsdom = require("jsdom");
const {JSDOM} = jsdom;

class Day {
  constructor(day, ordinal, month, depths) {
    this.day = day;
    this.ordinal = ordinal;
    this.month = month;
    this.depths = depths;
  }
}

axios.get('https://belfast-harbour.co.uk/tide-tables/').then(function (data) {
  const document = new JSDOM(data.data).window.document;
  const tideRows = document.querySelectorAll('.tide-row');
  const days = [];
  const daysWithDepthsOverLimit = [];

  tideRows.forEach(function (row) {
    const depthsNodes = row.querySelectorAll('.row.collapse')[2].querySelectorAll('.depth');
    const depths = [];
    depthsNodes.forEach(function (depth) {
      depths.push(parseFloat(depth.textContent))
    });

    days.push(new Day(
      row.querySelector('.date').querySelector('.day').textContent,
      row.querySelector('.date').querySelector('.ordinal').textContent,
      row.querySelector('.date').querySelector('.month').textContent,
      depths
    ));
  });

  days.forEach(function (day) {
    const depthsOverLimit = day.depths.filter(function (depth) {
      return depth >= 3.5;
    });

    if (depthsOverLimit > 0) {
      daysWithDepthsOverLimit.push(day);
    }
  });

  daysWithDepthsOverLimit.forEach(function (day) {
    // e.g 20th Mar - Heights in meters: 0.4, 3.6, 0.1, 3.4
    console.log(`${day.day}${day.ordinal} ${day.month} - Heights in meters: ${day.depths.join(', ')}`);
  })

}).catch(function (error) {
  console.log(error);
});
