var React = require('react');
var $ = require('jquery');

var baseUrl = 'http://localhost:5000/';
var nowPlayingUrl = baseUrl + 'state';

/**
 * ACM Concert now playing panel.
 */
var ConcertPanel = React.createClass({
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
                nowPlaying: JSON.parse(data),
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
             prevState.nowPlaying.thumbnail != this.state.nowPlaying.thumbnail)) {
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

        var artUri = nowPlaying.thumbnail;
        if (this.state.artError || !artUri) {
            return baseUrl + 'static/default-album-art.jpg';
        } else if (/https?:\/\//.test(artUri)) {
            return artUri;
        } else {
            return baseUrl + nowPlaying.thumbnail;
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
            body = <div className="panel-body concert-error-body">
                <p>Error fetching Now Playing from Concert: {error}</p>
            </div>;
        } else if (nowPlaying) {
            var elapsed = nowPlaying.current_time / 1000;
            var elapsedStr = this.getTimeString(elapsed);
            var duration = nowPlaying.duration / 1000;
            var durationStr = this.getTimeString(duration);

            body = <div className="panel-body concert-panel-body">
                <img src={this.getArtUrl()} onError={this.handleError} />
                <div className="concert-text">
                    <div className="concert-title">
                        {nowPlaying.current_track}
                    </div>
                    <p>{elapsedStr} / {durationStr}</p>
                    <p>concert.acm.illinois.edu</p>
                </div>
            </div>;
        }

        return <div className="panel">
            <div className="panel-heading">
                <h2>ACM Concert - Now Playing</h2>
            </div>
            {body}
        </div>;
    }
});

module.exports = ConcertPanel;