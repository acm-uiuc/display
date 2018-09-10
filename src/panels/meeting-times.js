var React = require('react');
var $ = require('jquery');
var classNames = require('classnames');
var time = require('../utils/time.js');
var moment = require('moment');

var secrets = require('../secrets.js');
var sigsURL = secrets.grootServicesURL + '/groups/sigs';
var comitteesURL = secrets.grootServicesURL + '/groups/committees';

var ROWS_PER_PAGE = 9;
var REFRESH_TIMES_MS = 60 * 1000;
var SWITCH_PAGE_MS = 10 * 1000;

/**
 * Meeting times panel.
 */
var MeetingTimesPanel = React.createClass({
    getInitialState: function() {
        return {
            index: 0,
            groups: [],
            displayingMeetings: true,
            error: null
        };
    },

    updateMeetingTimes: function() {
        $.when(
            $.getJSON({
                url: sigsURL,
                headers: {
                    'Authorization': secrets.grootAccessToken
                }
            }),
            $.getJSON({
                url: comitteesURL,
                headers: {
                    'Authorization': secrets.grootAccessToken
                }
            })
        ).done(function(sigs, committees) {
            this.setState({
                groups: sigs[0].concat(committees[0]),
                error: null
            });
        }.bind(this), function(error){
            this.setState({error: error.statusText});
        }.bind(this));
    },

    nextPage: function() {
        var newIndex = this.state.index;
        var displayingMeetings = !this.state.displayingMeetings;
        if (displayingMeetings) {
            newIndex = newIndex + ROWS_PER_PAGE;
            newIndex = newIndex >= this.state.groups.length ? 0 : newIndex;
        }
        this.setState({index: newIndex, displayingMeetings: displayingMeetings});
    },

    componentDidMount: function() {
        this.updateMeetingTimes();
        setInterval(this.updateMeetingTimes, REFRESH_TIMES_MS);
        setInterval(this.nextPage, SWITCH_PAGE_MS);
    },

    render: function() {
        var index = this.state.index;
        var displayingMeetings = this.state.displayingMeetings;
        var error = this.state.error;
        var body = null;
        if(error){
            body = <div className="panel-body meeting-times-error-body">
                <p>Error fetching meeting times.</p>
            </div>;
        }
        else {
            var pageTimes = this.state.groups.slice(index, index + ROWS_PER_PAGE);
            var items = pageTimes.map(function(meeting) {
                if (displayingMeetings) {
                    var location = meeting.meetingLoc ? meeting.meetingLoc : 'TBA';
                    var meeting_time = moment(meeting.meetingTime, 'h:mm A', true);
                    meeting_time = meeting_time.isValid() ? time.formatTime(meeting_time, true) : undefined;
                    var meeting_date = time.formatMeetingDate(meeting.meetingDay) || meeting.meetingDay;

                    var fulltime = (meeting_date && meeting_time) ?
                                   (meeting_date + ', ' + meeting_time) : 'TBA';
                    return <tr key={meeting.name}>
                        <td>{meeting.name}</td>
                        <td>{location}</td>
                        <td>{fulltime}</td>
                    </tr>;
                }
                else {
                    var chairs = meeting.chairs.replace(' and ', ',').split(',');
                    var chair_name = 'N/A';
                    if (chairs.length > 0) {
                        var name_split = $.trim(chairs[0]);
                        chair_name = name_split;
                    }

                    var chair_contacts = meeting.chairContact.split(',');
                    var display_contact = 'N/A';
                    if (chairs.length > 0) {
                        display_contact = chair_contacts[0];
                    }

                    var name_class = '';
                    if (chair_name.length > 17) {
                        name_class = 'xsmall';
                    }
                    else if (chair_name.length > 14) {
                        name_class = 'small';
                    }

                    var fulltime = (meeting_date && meeting_time) ?
                                   (meeting_date + ', ' + meeting_time) : 'TBA';
                    return <tr key={meeting.name}>
                        <td>{meeting.name}</td>
                        <td className={name_class}>{chair_name}</td>
                        <td>{display_contact}</td>
                    </tr>;
                }

            });

            var dots = [];
            for (var i = 0; i < this.state.groups.length; i += ROWS_PER_PAGE) {
                var dotClass = classNames({
                    dot: true,
                    active: displayingMeetings && i == index
                });
                dots.push(<span key={i} className={dotClass} />);

                var dotClass2 = classNames({
                    dot: true,
                    active: !displayingMeetings && i == index
                });
                dots.push(<span key={i + 1} className={dotClass2} />);
            }

            if (displayingMeetings) {
                body = <div className="panel-body meeting-times-body">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Location</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items}
                        </tbody>
                    </table>
                    <div className="dot-container">
                        {dots}
                    </div>
                </div>;
            }
            else {
                body = <div className="panel-body meeting-times-body">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Chair</th>
                                <th>Contact</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items}
                        </tbody>
                    </table>
                    <div className="dot-container">
                        {dots}
                    </div>
                </div>;
            }
        }
        return <div className="panel">
            <div className="panel-heading">
                <h2>Meeting Times</h2>
            </div>
            {body}
        </div>;
    }
});

module.exports = MeetingTimesPanel;
