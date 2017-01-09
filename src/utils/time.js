var moment = require('moment');

// Build the time string manually because moment.js occasionally formats
// the hour as 2.225071737871332e-308
// Equivalent to `moment(date).format('h:mm A')`
exports.formatTime = function(date) {
    var hours = date.getHours() % 12;
    hours = hours === 0 ? 12 : hours;

    var mins = date.getMinutes();
    mins = ('0' + mins).substr(-2);

    var ampm = date.getHours() < 12 ? 'AM' : 'PM';

    return hours + ':' + mins + ' ' + ampm;
}

// Try to avoid putting in minutes in meeting time unless necessary
exports.formatMeetingTime = function(date) {
    date = moment(date, 'h:m A', true);
    if(!date.isValid()){
        return undefined;
    }
    return date.minute() === 0 ? date.format('h A') : date.format('h:m A');
}
