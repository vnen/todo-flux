var React = require('react'),
    ListComponent;

ListComponent = React.createClass({
  render: function () {
    return (
      <main>
        <h1>List of todos</h1>
        <ul>
          <li>List item</li>
        </ul>
      </main>
    );
  }
});

module.exports = ListComponent;
