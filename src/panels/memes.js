var React = require('react');
var $ = require('jquery');
var secrets = require('../secrets.js');

var eventsURL = secrets.grootServicesURL + '/memes/random';
var MEMES_INTERVAL_MS = 10 * 1000;

/**
 * ACM Memes panel.
 */
var MemesPanel = React.createClass({
    getInitialState: function() {
        return {
            memeUrl: ""
        };
    },

    nextMeme: function() {
        $.getJSON({
            url: eventsURL,
            headers: {
                'Authorization': secrets.grootAccessToken
            }
        }, function(data) {
            this.setState({memeUrl: data.url});
            console.log(data);
        }.bind(this));
    },

    componentDidMount: function() {
        this.nextMeme();
        setInterval(this.nextMeme, MEMES_INTERVAL_MS);
    },

    render: function() {
        return <div className="panel panel-fill">
            <div className="panel-heading">
                <h2>Memes</h2>
            </div>
            <div className="panel-body memes-body">
                <img src={this.state.memeUrl} />
            </div>
        </div>;
    }
});

module.exports = MemesPanel;
