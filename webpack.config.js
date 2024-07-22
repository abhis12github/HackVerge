const path = require("path");
const HTMLPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            }
        ]
    },
    plugins: [
        new HTMLPlugin({ template: './public/index.html', filename: 'index.html' }),
        new CopyPlugin({
            patterns: [
                { from: 'public', globOptions: { ignore: ['**/index.html'] } }
            ]
        })
    ]
}