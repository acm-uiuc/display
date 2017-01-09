var Header = require('./header');
var AdsPanel = require('./panels/ads');
var BeatsPanel = require('./panels/beats');
var MTDPanel = require('./panels/mtd');
var MeetingTimesPanel = require('./panels/meeting-times');
var SponsorsPanel = require('./panels/sponsors');
var EventsPanel = require('./panels/events');

module.exports = {
    layout: [
        {
            i: 'ads',
            x: 0, y: 0,
            w: 12, h: 12,
            isResizable: true
        },
        {
            i: 'sigs',
            x: 18, y: 0,
            w: 6, h: 12,
            isResizable: true
        },
        {
            i: 'beats',
            x: 18, y: 1,
            w: 6, h: 8,
            minW: 6, minH: 6
        },
        {
            i: 'events',
            x: 12, y: 0,
            w: 6, h: 12
        },
        {
            i: 'mtd',
            x: 12, y: 1,
            w: 6,
            h: 8,
            minW: 4, minH: 6
        },
        {
            i: 'sponsors',
            x: 0, y: 1,
            w: 12, h: 8,
            minW: 8, minH: 6
        }
    ],
    widgets: [
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
}