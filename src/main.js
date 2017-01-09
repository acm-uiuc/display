var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./header');


var ReactGridLayout = require('react-grid-layout');
var WidthProvider = require('react-grid-layout').WidthProvider;
ReactGridLayout = WidthProvider(ReactGridLayout);
var dashboard = require('./dashboard');

/**
 * Top-level dashboard component.
 */
var ACMDisplay = React.createClass({
    render: function() {
        var widget_divs = dashboard.widgets.map(function(widget) {
            console.log(widget)
            return <div key={widget.name}>{React.createElement(widget.component, null)}</div>
        });
        console.log(widget_divs)
        return <div>
            <Header />
            <ReactGridLayout className="layout" layout={dashboard.layout} cols={24}
                    rowHeight={30} width={1920} autoSize={false} margin={[15, 15]}>
                {widget_divs}
            </ReactGridLayout>
        </div>;
    }
});

ReactDOM.render(
    React.createElement(ACMDisplay),
    document.getElementById('main')
);
