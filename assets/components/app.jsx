var React = require('react'),
    _ = require('underscore'),
    HeaderComponent = require('./header.jsx'),
    AppComponent;

AppComponent = React.createClass({
  componentWillMount: function () {
    if (this.props.collections) {
      _.each(this.props.collections, function (collection) {
        collection.bootstrap();
      }, this);
    }
  },
  render: function () {
    return (
      <div>
        <HeaderComponent />
        {this.props.component && <this.props.component collections={this.props.collections} />}
      </div>
    );
  }
});

module.exports = AppComponent;
