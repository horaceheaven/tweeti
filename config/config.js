var config = {};

config = {
    production: {
        mongoURI: 'mongodb://localhost:27017/tweeti',
        twitterCallBackUrl: 'http://tweeti.horaceheaven.com/auth/twitter/callback',
        contactEmail: 'horaceheaven@gmail.com'
    },
    development: {
        mongoURI: 'mongodb://localhost:27017/tweeti',
        twitterCallBackUrl: 'http://127.0.0.1:3000/auth/twitter/callback',
        contactEmail: 'horaceheaven@gmail.com'
    },
    test: {
        mongoURI: 'mongodb://localhost:27017/tweeti',
        twitterCallBackUrl: 'http://127.0.0.1:3000/auth/twitter/callback',
        contactEmail: 'horaceheaven@gmail.com'
    },
    default: {
        mongoURI: 'mongodb://localhost:27017/tweeti',
        twitterCallBackUrl: 'http://127.0.0.1:3000/auth/twitter/callback',
        contactEmail: 'horaceheaven@gmail.com'
    }
};

config.get = function(env) {
    console.log('using configuration for', env);
    console.log('configuration output', config[env]);
    return config[env] || config.default;
};

module.exports = config;