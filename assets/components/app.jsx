var React = require('react'),
    AppComponent;

AppComponent = React.createClass({
  render: function () {
    return (
      <div>
        {this.props.component && <this.props.component collections={this.props.collections} />}
      </div>
    );
  }
});

module.exports = AppComponent;
