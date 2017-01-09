var React = require('react');

var ClockPanel = require('./panels/clock');
var WeatherPanel = require('./panels/weather');

var Header = React.createClass({
    render: function() {
        return <div className="header-container">
            <div className="header-left">
                <img src="img/acm-logo-flat.svg"
                    className="header-logo" />
                <div className="header-text">
                    <h1>Association for Computing Machinery</h1>
                    <h2>University of Illinois at Urbana-Champaign</h2>
                </div>
            </div>
            <div className="header-right">
                <WeatherPanel />
                <ClockPanel />
            </div>
        </div>;
    }
});

module.exports = Header;
