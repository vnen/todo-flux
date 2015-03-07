var React = require('react'),
    ListComponent;

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
      return <li key={item.id}>{item.task}</li>;
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
