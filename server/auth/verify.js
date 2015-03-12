var jwt = require('jsonwebtoken');

module.exports = function *verifyToken(next) {
  if (true) { //bypass auth for now
    return yield next;
  }
  var decoded, header, token;

  header = this.request.header.authorization;
  if (header) {
    header = header.split(' ');
    if (header[0] !== 'Bearer') {
      this.status = 401;
      this.body = {
        error: 'Invalid authoriazation type'
      };
      return;
    }
    token = header[1];
  } else {
    token = this.cookies.get('jwt');
  }

  if (!token) {
    this.status = 401;
    this.body = {
      error: 'No authorization token found'
    };
    return;
  }

  try {
    decoded = jwt.verify(token, 'notasecret', {
      issuer: 'WTMediator'
    });
    if (decoded && decoded.user === 'user') {
      yield next;
    } else {
      this.status = 401;
      this.body = {
        error: 'You\'re not authorized to see this resource'
      };
      return;
    }
  } catch (err) {
    this.status = 401;
    this.body = {
      error: 'Invalid token'
    };
    return;
  }
};
