module.exports = {
    devtool: 'source-map',
    output: {
        publicPath: "./static/frontend/"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                loader: 'raw-loader'
            },
        ]
    }
}