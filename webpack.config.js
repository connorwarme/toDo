const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
        objectOps: './src/objectOps.js', 
        create: './src/createCard.js',
        addToDo: './src/addToDo.js',
        utility: './src/utility.js'
    },
    devServer: {
        static: './dist',
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