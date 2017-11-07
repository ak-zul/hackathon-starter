var config = {
    entry: './main.js',

    output: {
        path:'/',
        filename: 'index.js',
    },

    devServer: {
        inline: true,
        port: 8000,
        proxy: {
            '/api': {
                target: {
                    host: "0.0.0.0",
                    protocol: 'http:',
                    port: 8080
                },
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',

                query: {
                    presets:['es2015','react','stage-0','stage-1','stage-2','stage-3']
                }
            }
        ]
    }
}

module.exports = config;