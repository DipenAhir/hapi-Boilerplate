const Joi = require("joi");
var passwordHash = require('password-hash');
const localization = require("../../../config/locales");
const headerValidator = require("../../../config/header")
var userCollection = require("../../../models/users")

module.exports = {

    description: 'This API used to login a user',
    tags: ["api", "login"],
    auth: false,
    response: {
        status: {
            201: { message: Joi.any().default(localization["201"]) },
            400: { message: Joi.any().default(localization["400"]) },
            409: { message: Joi.any().default(localization["409"]) },
            500: { message: Joi.any().default(localization["500"]) },
        }
    },
    validate: {
        headers: headerValidator.headerAuthNotRequired,
        payload: Joi.object({
            email: Joi.string().email().required().description("enter email address").error(new Error("field email is missing or invalid format")),
            password: Joi.string().required().min(4).max(10).description("enter password").error(new Error("field password is missing  or invalid it must be lesthen 10 char and gretherthen 4 caht"))
        }).unknown(),
        failAction: (req, reply, source, error) => {
            failAction: headerValidator.faildAction(req, reply, source, error)
        }
    },
    handler: function (request, reply) {

        function checkUserExists() {
            return new Promise(function (resolve, reject) {
                let condition = { email: request.payload.email }
                userCollection.read(condition, (err, result) => {
                    if (err) {
                        return reject("ASPLPALSW ", err)
                    } else if (result && result.length) {
                        var hashedPassword = result[0].password;
                        if (passwordHash.verify(request.payload.password, hashedPassword)) {
                            return resolve(true)
                        } else {
                            return reject({ message: "password not match" })
                        }
                    } else {
                        return reject({ message: request.i18n.__('201') })
                    }
                })
            });
        }
        function genrateToken() {
            return new Promise(function (resolve, reject) {

            });
        }


        checkUserExists()
            .then(() => { return genrateToken(); })
            .then(() => { return reply({ message: 'Hello hapi!' }).code(201); })
            .catch((data) => { return reply({ message: data.message }).code(409); })
    }
};