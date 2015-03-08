var React = require('react'),
    ListComponent,
    ItemComponent;

ItemComponent = React.createClass({
  render: function () {
    var attr = this.props.model.attributes,
      check = attr.done ? '\u2611' : '\u2610';
    return (
      <li key={attr.id}>{check + ' ' + attr.task}</li>
    );
  }
});

ListComponent = React.createClass({
  componentDidMount: function () {
    this.props.collections.todos.on('add remove reset', function () {
      this.forceUpdate();
    }, this);
    this.props.collections.todos.fetch({ reset: true });
  },
  componentWillUnmount: function () {
    this.props.collections.todos.off(null, null, this);
  },
  render: function () {
    var list = this.props.collections.todos.map(function (item) {
      return <ItemComponent model={item} />;
    });
    return (
      <main>
        <h1>List of todos</h1>
          {list}
        <ul>
        </ul>
      </main>
    );
  }
});

module.exports = ListComponent;
