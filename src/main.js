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
var panels = require('./panels');
var layout = require('./layout.json');

/**
 * Top-level dashboard component.
 */
var ACMDisplay = React.createClass({
    onLayoutChange: function(currentLayout, layouts) {
        ipcRenderer.send('layout-changed', currentLayout);
    },
    render: function() {
        var inLayoutMode = argv.includes('--layout');
        var usedPanelIds = layout.map(function(panelLayout) {
            return panelLayout.i;
        });
        var panelDivs = panels.filter(function(panel) {
            return usedPanelIds.includes(panel.name);
        }).map(function(panel) {
            return <div key={panel.name}>{React.createElement(panel.component, null)}</div>
        });
        return <div>
            <Header />
            <ReactGridLayout className="layout" layout={layout} cols={24}
                    rowHeight={30} width={1920} autoSize={false} margin={[15, 15]}
                    isResizable={inLayoutMode} isDraggable={inLayoutMode}
                    onLayoutChange={this.onLayoutChange}>
                {panelDivs}
            </ReactGridLayout>
        </div>;
    }
});

ReactDOM.render(
    React.createElement(ACMDisplay),
    document.getElementById('main')
);
