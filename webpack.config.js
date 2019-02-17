const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const env = process.env.NODE_ENV;
const isDev = env !== 'production';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        chunkFilename: 'vendor.js',
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: isDev ? 'style.[hash].css' : 'style.css'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new CleanWebpackPlugin(path.resolve(__dirname, 'dist'), {})
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    "sass-loader",
                    { loader: 'postcss-loader', options: {
                            "parser": "postcss-scss"
                        }}
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks: 'all'
        }
    },
    devtool: !isDev && 'source-map'
}