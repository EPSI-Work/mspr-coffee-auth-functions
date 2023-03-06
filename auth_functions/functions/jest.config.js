const path = require("path");

module.exports = {
    rootDir: path.resolve(__dirname),
    moduleNameMapper: {
        "^src/(.*)$": "<rootDir>/src/$1",
    },
};