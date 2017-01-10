var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./header');

// window.require necessary because we're using browserify
// Something conflicts with the electron 'require' and breaks the bundle
// https://github.com/electron/electron/issues/7300#issuecomment-248773783
var electron = window.require('electron');
var remote = electron.remote;
var ipcRenderer = electron.ipcRenderer;
var argv = remote.process.argv;

var ReactGridLayout = require('react-grid-layout');
var WidthProvider = require('react-grid-layout').WidthProvider;
ReactGridLayout = WidthProvider(ReactGridLayout);
var dashboard = require('./dashboard');

/**
 * Top-level dashboard component.
 */
var ACMDisplay = React.createClass({
    onLayoutChange: function(layout, layouts) {
        ipcRenderer.send('layout-changed', layout);
    },
    render: function() {
        var layout_mode = argv.includes('--layout')
        var widget_divs = dashboard.widgets.map(function(widget) {
            return <div key={widget.name}>{React.createElement(widget.component, null)}</div>
        });
        return <div>
            <Header />
            <ReactGridLayout className="layout" layout={dashboard.layout} cols={24}
                    rowHeight={30} width={1920} autoSize={false} margin={[15, 15]}
                    isResizable={layout_mode} isDraggable={layout_mode}
                    onLayoutChange={this.onLayoutChange}>
                {widget_divs}
            </ReactGridLayout>
        </div>;
    }
});

ReactDOM.render(
    React.createElement(ACMDisplay),
    document.getElementById('main')
);
