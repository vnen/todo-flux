var React = require('react'),
    TodoActions = require('../../actions/todos'),
    ListComponent,
    ItemComponent;

ItemComponent = React.createClass({
  componentDidMount: function () {
    this.props.model.on('change:done', function (e) {
      this.setState({ done: e.get('done') });
    }, this);
    this.props.model.on('error', function () {
      this.setState({ errorText: 'Server error' });
    }, this);
  },
  componentWillUnmount: function () {
    this.props.model.off(null, null, this);
  },
  getInitialState: function () {
    return {
      done: this.props.model.get('done'),
      errorText: ''
    };
  },
  onChange: function () {
    var checked = this.refs.done.getDOMNode().checked;
    TodoActions.done(this.props.model, checked);
  },
  delete: function () {
    TodoActions.remove(this.props.model);
  },
  render: function () {
    var attr = this.props.model.attributes;
    var errStyle = { color: 'red' };
    return (
      <li>
        <input type="checkbox" checked={this.state.done} ref='done' onChange={this.onChange} /> {attr.task}
        <button type="button" onClick={this.delete}>Delete</button>
        <span style={errStyle}>{this.state.errorText}</span>
      </li>
    );
  }
});

ListComponent = React.createClass({
  componentDidMount: function () {
    this.props.collections.todos.on('add remove reset sync', function () {
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
