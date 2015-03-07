var jwt = require('jsonwebtoken');

function *getToken() {
  var user = this.request.body.fields.username,
      pass = this.request.body.fields.password;

  if (!user || !pass) {
    this.body = {
      error: 'Username and password are required'
    };
    this.response.status = 400;
  } else {
    if (user === 'user' && pass === 'pass') {
      this.response.status = 200;
      this.body = {
        token: jwt.sign({ user: 'user' }, 'notasecret', {
          issuer: 'WTMediator'
        })
      };
    } else {
      this.body = {
        error: 'Invalid username or password.'
      };
      this.response.status = 401;
    }
  }
}

module.exports = {
  create: getToken
};
