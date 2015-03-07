#!/usr/bin/env Node
var app = require('./app');
app.port = process.env.WRITERSTRAIL_MEDIATOR_PORT || 8082;
app.address = process.env.WRITERSTRAIL_MEDIATOR_ADDRESS || '0.0.0.0';

app.listen(app.port, app.address, function () {
  console.log('On %s environment. Listening to %s:%s.', app.env, app.address, app.port);
});
