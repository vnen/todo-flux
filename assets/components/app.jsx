var React = require('react'),
    AppComponent = module.exports;

AppComponent = React.createClass({
  render: function () {
    return (
      <div>
        <this.props.component collections={this.props.collections} />
      </div>
    );
  }
});
