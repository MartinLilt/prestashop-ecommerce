const moment = require("moment-timezone");

function timeTracker(formatType = "YYYY-MM-DD HH:mm") {
  return `${moment().tz("Europe/Vilnius").format(formatType)}`;
}

module.exports = timeTracker;
