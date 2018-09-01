const merge = require('webpack-merge');
const common = require('./common.js');

module.exports = merge(common, {
    mode: 'production',
    output: {
        publicPath: "https://vivalavinyl-webapp.herokuapp.com/"
    }
});
