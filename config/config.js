var config = {};

config = {
    production: {

    },
    development: {
        mongoURI: 'mongodb://localhost:27017/tweeti'
    },
    test: {
        mongoURI: 'mongodb://localhost:27017/tweeti'
    },
    default: {
        mongoURI: 'mongodb://localhost:27017/tweeti'
    }
};

config.get = function(env) {
    return config[env] || config.default;
};

module.exports = config;