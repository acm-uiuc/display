var moment = require('moment');

// Build the time string manually because moment.js occasionally formats
// the hour as 2.225071737871332e-308
// Accepts moment dates
// Equivalent to `moment(date).format('h:mm A')`
// - Set dropMinutes to true to attempt coercing format as 'h A'
exports.formatTime = function(date, dropMinutes) {
    var hours = date.hour() % 12;
    hours = hours === 0 ? 12 : hours;

    var mins = date.minute();
    mins = ('0' + mins).substr(-2);

    var ampm = date.hour() < 12 ? 'AM' : 'PM';

    return hours + (dropMinutes ? '' : ':' + mins) + ' ' + ampm;
}

exports.formatMeetingDate = function(date) {
    date = moment(date, 'dddd', true);
    if(!date.isValid()){
        return undefined;
    }
    return date.format('ddd')
}
