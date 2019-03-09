const Joi = require("joi");
const localization = require("../../../localization");
const headerValidator = require("../../../config/header")

module.exports = {

    description: 'This API used to create a new user',
    tags: ["api", "user"],
    auth: false,
    response: {
        status: {
            200: { message: Joi.any().default(localization["200"]) },
            400: { message: Joi.any().default(localization["500"]) },
            500: { message: Joi.any().default(localization["500"]) },
        }
    },
    validate: {
        payload: Joi.object({
            userName: Joi.string().required().description("pass unique username").error(new Error("field userName is missing"))
        }).unknown(),
        failAction: (req, reply, source, error) => {
            failAction: headerValidator.faildAction(req, reply, source, error)
        }
    },
    handler: function (request, reply) {
        return reply({ result: 'Hello hapi!' });
    }
};