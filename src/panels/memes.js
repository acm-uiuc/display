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
            memeUrl: "",
            memeError: null
        };
    },

    nextMeme: function() {
        $.getJSON({
            url: eventsURL,
            headers: {
                'Authorization': secrets.grootAccessToken
            }
        }, function(data) {
            this.setState({
                memeUrl: data.url,
                memeError: null
            });
        }.bind(this))
        .fail(function(error) {
            this.setState({memeError: error});
        }.bind(this));
    },

    componentDidMount: function() {
        this.nextMeme();
        setInterval(this.nextMeme, MEMES_INTERVAL_MS);
    },

    imageError: function() {
        this.setState({memeError: true});
    },

    render: function() {
        var error = this.state.memeError;
        var body = null;

        if(error){
            body = <div className="panel-body memes-error-body">
                <p>🔥🤷🔥</p>
            </div>;
        }
        else {
            body = <div className="panel-body memes-body">
                <img src={this.state.memeUrl} onError={this.imageError} />
            </div>;
        }

        return <div className="panel panel-fill">
            <div className="panel-heading">
                <h2>Memes</h2>
            </div>
            {body}
        </div>;
    }
});

module.exports = MemesPanel;
