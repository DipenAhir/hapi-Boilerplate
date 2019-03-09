const Home = require('./handlers/home');
const user = require('./handlers/user');

exports.register = (plugin, options, next) => {

  plugin.route([
    { method: 'GET', path: '/', config: Home.hello },
    { method: 'POST', path: '/user', config: user.post },
    { method: 'GET', path: '/restricted', config: Home.restricted },
    { method: 'GET', path: '/{path*}', config: Home.notFound }
  ]);

  next();
};

exports.register.attributes = {
  name: 'api'
};