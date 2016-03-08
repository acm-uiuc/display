var React = require('react');
var $ = require('jquery');

var baseUrl = 'https://www-s.acm.illinois.edu/beats/1104/';
var nowPlayingUrl = baseUrl + 'v1/now_playing';

/**
 * Beats by ACM (SC1404) now playing panel.
 */
var BeatsPanel = React.createClass({
    getInitialState: function() {
        return {
            nowPlaying: null
        };
    },

    updateNowPlaying: function() {
        $.get(nowPlayingUrl, function(data) {
            this.setState({nowPlaying: data});
        }.bind(this));
    },

    componentDidMount: function() {
        this.updateNowPlaying();
        setInterval(this.updateNowPlaying, 1000);
    },

    render: function() {
        var nowPlaying = this.state.nowPlaying;

        var body = null;
        if (nowPlaying) {
            var artUrl = baseUrl;
            if (nowPlaying.media.art_uri) {
                artUrl += nowPlaying.media.art_uri;
            } else {
                artUrl += 'static/default-album-art.jpg';
            }

            body = <div className="panel-body beats-panel-body">
                <img src={artUrl} />
                <div className="beats-text">
                    <div className="beats-title">
                        {nowPlaying.media.title}
                    </div>
                    <div>{nowPlaying.media.album}</div>
                    <div>{nowPlaying.media.artist}</div>
                    <div>Time: {nowPlaying.player_status.current_time / 1000}</div>
                    <div>Duration: {nowPlaying.media.length}</div>
                    <p>https://www-s.acm.illinois.edu/beats/1104/</p>
                </div>
            </div>;
        }

        return <div className="panel beats-panel">
            <div className="panel-heading">
                <h2>Beats by ACM - Now Playing</h2>
            </div>
            {body}
        </div>;
    }
});

module.exports = BeatsPanel;
