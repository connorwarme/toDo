const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        index: './src/index.js',
        objectOps: './src/objectOps.js', 
        createCard: './src/createCard.js',
        addToDo: './src/addToDo.js',
        hf: './src/h&f.js',
        openingModal: './src/openingModal.js',
        navbar: './src/navbar.js',
        demo: './src/demo.js',
        localStorage: './src/localStorage.js',
        utility: './src/utility.js'
    },
    devServer: {
        static: './dist',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        // clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
              },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
};