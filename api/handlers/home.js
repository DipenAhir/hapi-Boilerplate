module.exports.hello = {
  tags:["api","home"],
  handler: function (request, reply) {
    return reply({ result: 'Hello hapi!' });
  }
};

module.exports.restricted = {
  auth: 'jwt',
  tags:["api","home"],
  handler: function (request, reply) {
    return reply({ result: 'Restricted!' });
  }
};

module.exports.notFound = {
  tags:["api","home"],
  handler: function (request, reply) {
    return reply({ result: 'Oops, 404 Page!' }).code(404);
  }
};