var React = require('react');
var ReactDOM = require('react-dom');

var Header = require('./header');
var AdsPanel = require('./panels/ads');
var BeatsPanel = require('./panels/beats');
var MTDPanel = require('./panels/mtd');
var MeetingTimesPanel = require('./panels/meeting-times');
var SponsorsPanel = require('./panels/sponsors');
var EventsPanel = require('./panels/events');

var ReactGridLayout = require('react-grid-layout');
var WidthProvider = require('react-grid-layout').WidthProvider;
ReactGridLayout = WidthProvider(ReactGridLayout);
var layout = require('./layout');



/**
 * Top-level dashboard component.
 */
var Dashboard = React.createClass({
    render: function() {
        return <div>
            <Header />
            <ReactGridLayout className="layout" layout={layout} cols={24}
                    rowHeight={30} width={1920} autoSize={false} margin={[15, 15]}>
                <div key={'ads'}><AdsPanel /></div>
                <div key={'sigs'}><MeetingTimesPanel /></div>
                <div key={'beats'}><BeatsPanel /></div>
                <div key={'events'}><EventsPanel /></div>
                <div key={'mtd'}><MTDPanel /></div>
                <div key={'sponsors'}><SponsorsPanel /></div>
            </ReactGridLayout>
        </div>;
    }
});

ReactDOM.render(
    React.createElement(Dashboard),
    document.getElementById('main')
);
