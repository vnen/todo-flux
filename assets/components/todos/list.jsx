var React = require('react'),
    ListComponent,
    ItemComponent;

ItemComponent = React.createClass({
  render: function () {
    var attr = this.props.model.attributes;
    return (
      <li><input type="checkbox" checked={attr.done} readOnly={true}/> {attr.task}</li>
    );
  }
});

ListComponent = React.createClass({
  componentDidMount: function () {
    this.props.collections.todos.on('add remove reset', function () {
      this.forceUpdate();
    }, this);
  },
  componentWillUnmount: function () {
    this.props.collections.todos.off(null, null, this);
  },
  render: function () {
    var list = this.props.collections.todos.map(function (item) {
      return <ItemComponent key={item.get('id')} model={item} />;
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
