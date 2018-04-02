module.exports = {
    entry: __dirname + '/src/index.js',
    output: {
        path: __dirname + "/public",
        filename: "bundle.js"
    },

    devServer: {
        contentBase: './public',
        historyApiFallback: true,
        inline: true
    },

    module: {
        loaders: [

            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015','stage-0']
                }
            },

            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader'
            }

        ]
    }

};
