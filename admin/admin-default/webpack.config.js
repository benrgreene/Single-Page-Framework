const path = require('path');

module.exports = {
    entry: {
        'index': './src/index.js',
    },
    output: {
        filename: '[name].build.js',
        path: path.resolve(__dirname)
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            { 
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query: {
                    presets: ['babel-preset-env', 'babel-preset-react']
                }
            },
            { 
                test: /\.js?$/,
                loader: 'babel-loader',
                query: {
                    presets: ['babel-preset-env', 'babel-preset-react']
                }
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            }
        ]
    },
    mode: 'development'
}