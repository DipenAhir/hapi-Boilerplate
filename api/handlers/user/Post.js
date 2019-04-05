const Joi = require("joi");
var passwordHash = require('password-hash');
var config = require("../../../config/locales")

const localization = require("../../../config/locales");
const headerValidator = require("../../../config/header")
var userCollection = require("../../../models/users")

module.exports = {

    description: 'This API used to create a new user',
    tags: ["api", "user"],
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
            userName: Joi.string().required().min(4).max(10).description("pass unique username").error(new Error("field userName is missing or invalid it must be lesthen 10 char and gretherthen 4 caht")),
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
                let condition = { "$or": [{ email: request.payload.email }, { userName: request.payload.userName }] }
                userCollection.read(condition, (err, result) => {
                    if (err) {
                        return reject("ASPLPALSW ", err)
                    } else if (result && result.length) {
                        return reject({ message: "username or email id aleady exists." })
                    } else {
                        return resolve(true)
                    }
                })
            });
        }
        function createNewUser() {
            return new Promise(function (resolve, reject) {
                request.payload["password"] = passwordHash.generate(request.payload["password"]);
                userCollection.insertOne(request.payload, (err, result) => {
                    if (err) {
                        return reject("ASPLPALSW ", err)
                    } else {
                        return resolve(true)
                    }
                })
            });
        }


        checkUserExists()
            .then(() => { return createNewUser(); })
            .then(() => { return reply({ message: 'Hello hapi!' }).code(201); })
            .catch((data) => { return reply({ message: data.message }).code(409); })
    }
};