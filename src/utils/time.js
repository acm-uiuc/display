var moment = require('moment');

// Try to avoid putting in minutes in meeting time unless necessary
exports.formatMeetingTime = function(date) {
    date = moment(date, 'h:mm A', true);
    if(!date.isValid()){
        return undefined;
    }
    return date.minute() === 0 ? date.format('h A') : date.format('h:mm A');
}
