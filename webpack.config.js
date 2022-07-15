const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        index: './src/index.js',
        modA: './src/modA.js', 
    },
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         title: 'ToDo List',
    //     }),
    // ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        // clean: true,
    },
};