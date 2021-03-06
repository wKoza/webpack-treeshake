/*var webpack = require('webpack');

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

*/


const webpack = require('webpack');
const path = require('path');

const sourcePath = path.join(__dirname, './app1');
const staticsPath = path.join(__dirname, './dist');

module.exports = function (env) {
    const nodeEnv = env && env.prod ? 'production' : 'development';
    const isProd = nodeEnv === 'production';

    const plugins = [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: module => /node_modules/.test(module.resource),
            filename: 'vendor.bundle.js'
        }),
        new webpack.EnvironmentPlugin({
            NODE_ENV: nodeEnv,
        }),
        new webpack.NamedModulesPlugin(),
    ];

    if (isProd) {
        plugins.push(
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    screw_ie8: true,
                    conditionals: true,
                    unused: true,
                    comparisons: true,
                    sequences: true,
                    dead_code: true,
                    evaluate: true,
                    if_return: true,
                    join_vars: true,
                },
                output: {
                    comments: false,
                },
            })
        );
    } else {
        plugins.push(
            new webpack.HotModuleReplacementPlugin()
        );
    }


    return {
        context: sourcePath,
        entry: {
            js: './entry1.js'
        },
        output: {
            path: staticsPath,
            filename: '[name].bundle.js',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader : 'babel-loader',
                    options: { presets: [ [ 'es2015', { modules: false } ] ] }

                },
            ],
        },
        plugins,
        devServer: {
            contentBase: './app1',
            historyApiFallback: true,
            port: 3000,
            compress: isProd,
            inline: !isProd,
            hot: !isProd,
            stats: {
                assets: true,
                children: false,
                chunks: false,
                hash: false,
                modules: false,
                publicPath: false,
                timings: true,
                version: false,
                warnings: true,
                colors: {
                    green: '\u001b[32m',
                }
            },
        }
    };
};





