var React = require('react');
var moment = require('moment');

var time = require('../utils/time');

/**
 * Clock panel.
 */
var ClockPanel = React.createClass({
    getInitialState: function() {
        return {
            date: moment()
        };
    },

    tick: function() {
        this.setState({date: moment()});
    },

    componentDidMount: function() {
        setInterval(this.tick, 1000);
    },

    render: function() {
        return <div className="clock-panel">
            <div className="clock-time">
                {time.formatTime(this.state.date)}
            </div>
            <div className="clock-date">
                {this.state.date.format('dddd, MMMM D, YYYY')}
            </div>
        </div>;
    }
});

module.exports = ClockPanel;
