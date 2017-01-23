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
            nowPlaying: null,
            artError: false,
            error: null
        };
    },

    updateNowPlaying: function() {
        $.ajax({
            url: nowPlayingUrl,
            timeout: 5000,
        })
        .done(function(data) {
            this.setState({
                nowPlaying: data,
                error: null
            });
        }.bind(this))
        .fail(function(xhr, status, errorThrown) {
            this.setState({error: errorThrown});
        }.bind(this));
    },

    componentDidMount: function() {
        this.updateNowPlaying();
        setInterval(this.updateNowPlaying, 1000);
    },

    componentDidUpdate: function(prevProps, prevState) {
        if (!this.state.error &&
            (!prevState.nowPlaying ||
             prevState.nowPlaying.media.art_uri != this.state.nowPlaying.media.art_uri)) {
        this.setState({artError: false});
        }
    },

    getTimeString: function(time) {
        time = Math.round(time);
        var mins = Math.floor(time / 60);
        var secs = time % 60;
        return mins + ':' + ('0' + secs).substr(-2);
    },

    getArtUrl: function() {
        var nowPlaying = this.state.nowPlaying;
        if (!nowPlaying) {
            return baseUrl + 'static/default-album-art.jpg';
        }

        var artUri = nowPlaying.media.art_uri;
        if (this.state.artError || !artUri) {
            return baseUrl + 'static/default-album-art.jpg';
        } else if (/https?:\/\//.test(artUri)) {
            return artUri;
        } else {
            return baseUrl + nowPlaying.media.art_uri;
        }
    },

    handleError: function() {
        this.setState({artError: true});
    },

    render: function() {
        var error = this.state.error;
        var nowPlaying = this.state.nowPlaying;

        var body = null;
        if (error) {
            body = <div className="panel-body beats-error-body">
                <p>Error fetching Now Playing from Beats: {error}</p>
            </div>;
        } else if (nowPlaying) {
            var elapsed = nowPlaying.player_status.current_time / 1000;
            var elapsedStr = this.getTimeString(elapsed);
            var duration = nowPlaying.media.length;
            var durationStr = this.getTimeString(duration);

            body = <div className="panel-body beats-panel-body">
                <img src={this.getArtUrl()} onError={this.handleError} />
                <div className="beats-text">
                    <div className="beats-title">
                        {nowPlaying.media.title}
                    </div>
                    <div>{nowPlaying.media.album}</div>
                    <div>{nowPlaying.media.artist}</div>
                    <p>{elapsedStr} / {durationStr}</p>
                    <p>acm.illinois.edu/beats/1104/</p>
                </div>
            </div>;
        }

        return <div className="panel">
            <div className="panel-heading">
                <h2>Beats by ACM - Now Playing</h2>
            </div>
            {body}
        </div>;
    }
});

module.exports = BeatsPanel;
