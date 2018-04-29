var AdsPanel = require('./panels/ads');
var ConcertPanel = require('./panels/concert');
var MTDPanel = require('./panels/mtd');
var MeetingTimesPanel = require('./panels/meeting-times');
var SponsorsPanel = require('./panels/sponsors');
var EventsPanel = require('./panels/events');


module.exports = [
    {
        name: 'ads',
        component: AdsPanel
    },
    {
        name: 'sigs',
        component: MeetingTimesPanel
    },
    {
        name: 'events',
        component: EventsPanel
    },
    {
        name: 'mtd',
        component: MTDPanel
    },
    {
        name: 'sponsors',
        component: SponsorsPanel
    },
    {
        name: 'concert',
        component: ConcertPanel
    }
];
