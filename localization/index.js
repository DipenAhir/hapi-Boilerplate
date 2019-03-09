var defaultlang = process.env.DEFAULT_LANGUAGE || "en"

module.exports = require(`./${defaultlang}.json`)