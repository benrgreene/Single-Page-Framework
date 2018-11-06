const path = require('path');

module.exports = {
    entry: {
        'index': './scripts/index.js',
    },
    output: {
        filename: '[name].build.js',
        path: path.resolve(__dirname, 'assets'),
        library: 'theme'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            { 
                test: /\.js?$/,
                loader: 'babel-loader',
                query: {
                    presets: ['babel-preset-env', 'babel-preset-react']
                }
            }
        ]
    },
    mode: 'development'
}