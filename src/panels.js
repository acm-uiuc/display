var Header = require('./header');
var AdsPanel = require('./panels/ads');
var BeatsPanel = require('./panels/beats');
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
        name: 'beats',
        component: BeatsPanel
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
    }
]
