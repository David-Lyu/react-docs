const path = require("path")

module.exports = {
    entry: "./src/index.jsx",
    output: {
        publicPath: "/dist/index.html",
        path: path.resolve(__dirname, "dist/components"),
        filename: "main.js"
    },
    mode: "development",
    devtool: "source-map",
    devServer: {
        port: 3000,
        contentBase: path.join(__dirname, "dist/"),
        hot: true,
        historyApiFallback: { index: "index.html" }
    },
    module: {
        rules: [
            {
                test: /\.jsx/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            '@babel/plugin-transform-react-jsx'
                        ]
                    }
                }
            }
        ]
    },
}