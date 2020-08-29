require('dotenv').config();

const webpack = require('webpack');

const SHOPIFY_API_KEY = JSON.stringify(process.env.SHOPIFY_API_KEY)

module.exports = {
    webpack: (config) => {
        const env = {SHOPIFY_API_KEY};
        config.plugins.push(new webpack.DefinePlugin(env))
        return config;
    }
}