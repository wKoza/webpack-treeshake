var webpack = require('webpack');

var uglify = new webpack.optimize.UglifyJsPlugin({
    compress: false,
    mangle: false,
    beautify: true
});

var plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        minChunks: 2
    }),
    uglify
];

module.exports = [{
    entry: {
        'entry1': './app1/entry1',
        'entry2': './app1/entry2'
    },
    output: {
        path: 'dist/app1',
        filename: "[name].js"
    },
    plugins: plugins
}, {
    entry: {
        'entry1': './app2/entry1',
        'entry2': './app2/entry2'
    },
    output: {
        path: 'dist/app2',
        filename: "[name].js"
    },
    plugins: plugins
}];
