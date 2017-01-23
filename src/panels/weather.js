var React = require('react');
var $ = require('jquery');

var secrets = require('../secrets');

// Animated weather icons
var Skycons = require('../third_party/skycons.js').Skycons;
var skycons = new Skycons({color: '#333333'});
skycons.play();

// Weather refresh rate, in milliseconds
// Note: Forecast.io is limited to 1000 API calls per day
// 5 minutes => 288 requests/day
var WEATHER_INTERVAL_MS = 5 * 60 * 1000;

var WeatherPanel = React.createClass({
    getInitialState: function() {
        return {
            weather: null
        };
    },

    updateWeather: function() {
        var url = ('https://api.darksky.net/forecast/' +
                   secrets.forecastAPIKey + '/40.1140,-88.2244');
        $.get(url, function(data) {
            this.setState({weather: data});
            skycons.set('skycon', data.currently.icon);
        }.bind(this));
    },

    componentDidMount: function() {
        this.updateWeather();
        setInterval(this.updateWeather, WEATHER_INTERVAL_MS);
    },

    render: function() {
        if (!this.state.weather) {
            return null;
        }

        var weather = this.state.weather.currently;
        var temp = Math.round(weather.temperature);

        return <div className="weather-panel">
            <canvas
                id="skycon"
                className="weather-icon"
                width="100"
                height="100" />
            <span className="weather-temp">
                {temp}&deg;F
            </span>
            <div className="weather-summary">
                {weather.summary}
            </div>
        </div>;
    }
});

module.exports = WeatherPanel;
