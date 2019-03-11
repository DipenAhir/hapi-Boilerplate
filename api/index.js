const user = require('./handlers/user');
const login = require('./handlers/login');

exports.register = (plugin, options, next) => {

  plugin.route([
    { method: 'POST', path: '/user', config: user.post },
    { method: 'POST', path: '/login', config: login.post },
  ]);

  next();
};

exports.register.attributes = {
  name: 'api'
};
//rjmreis