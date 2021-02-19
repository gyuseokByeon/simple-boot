const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
// var HtmlWebpackPlugin = require('html-webpack-plugin'); // https://github.com/jantimon/html-webpack-plugin
// var ExtractTextPlugin = require('extract-text-webpack-plugin'); // https://webpack.js.org/plugins/extract-text-webpack-plugin/

module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    mode: 'development',
    watch: true,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            { test: /\.hbs$/, loader: 'handlebars-loader' },
            // { test: /\.handlebars$/, loader: "handlebars-loader" },
            {
                test: /\.html$/i,
                loader: 'html-loader'
                // ,
                // options: {
                //     minimize: true
                // }
            },

            {
                test: /\.(png|svg|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, 'src'),
        },
        extensions: ['.tsx', '.ts', '.js'],
        // extensions: ['.tsx', '.ts', '.js', 'webpack.js', '.web.js', '.html'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        inline: true,
        hot: true,
        contentBase: __dirname + "/dist/",
        host: "localhost",
        port: 5500
        // contentBase: './dist'
    }
};