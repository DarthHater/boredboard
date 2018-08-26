const merge = require('webpack-merge');
const common = require('./common.js');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        host: 'localhost',
        port: 8090,
        contentBase: './dist',
        historyApiFallback: true
    }
});
