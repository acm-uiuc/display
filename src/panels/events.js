var React = require('react');
var $ = require('jquery');
var moment = require('moment');
var classNames = require('classnames');
var secrets = require('../secrets.js');

var time = require('../utils/time');

var eventsURL = secrets.grootServicesURL + '/events';
var EVENTS_INTERVAL_MS = 60 * 1000;

/**
 * Events panel.
 */
var EventsPanel = React.createClass({
    getInitialState: function() {
        return {
            events: []
        };
    },

    updateEvents: function() {  
        $.get(eventsURL, function(data) {
            var now = moment();
            var events = data
                .map(function(e) {
                    var start = moment(e.start_time);
                    var end = moment(e.end_time)
                    return {
                        startDate: start,
                        endDate: end,
                        duration: moment.duration(end.diff(start)),
                        name: e.name,
                        id: e.id,
                        location: e.place ? e.place.name : null
                    }
                })
                .filter(function(e) {
                    return e.startDate.isAfter(now);
                })
                .sort(function(a, b) {
                    return a.startDate.isAfter(b.startDate);
                })
                .slice(0, 5);
            this.setState({events: events});
        }.bind(this));
    },

    componentDidMount: function() {
        this.updateEvents();
        setInterval(this.updateEvents, EVENTS_INTERVAL_MS);
    },

    formatDate: function(date, isEndDate, showDate) {
        var dateComponents = [];
        if (showDate) {
            dateComponents.push(date.format('MMM D'));
        }
        dateComponents.push(time.formatTime(date));
        return dateComponents.join(' ');
    },

    formatEventTime: function(event) {
        var startDateStr = this.formatDate(event.startDate, false, true);
        var isSameDay = event.startDate.isSame(event.endDate, 'day');
        var endDateStr = this.formatDate(event.endDate, true, !isSameDay);
        return startDateStr +  ' \u2013 ' + endDateStr;
    },

    getEvents: function() {
        var events = this.state.events;
        if (events.length === 0) {
            return <p>No upcoming events</p>;
        }
        return events.map(function(event) {
            var loc = event.location ? <div className="event-location">{event.location}</div> : null;
            return <div key={event.id} className="event-item">
                <div className="event-summary">{event.name}</div>
                <div>{this.formatEventTime(event)}</div>
                {loc}
            </div>;
        }.bind(this));
    },

    render: function() {
        var bodyClass = classNames({
            'panel-body': true,
            'events-body-no-events': this.state.events.length == 0
        });

        return <div className="panel">
            <div className="panel-heading">
                <h2>Events</h2>
            </div>
            <div className={bodyClass}>
                {this.getEvents()}
            </div>
        </div>;
    }
});

module.exports = EventsPanel;
