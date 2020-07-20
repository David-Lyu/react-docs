const path = require("path")

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx']
    },
    entry: "./src/index.jsx",
    output: {
        publicPath: "/",
        path: path.resolve(__dirname, "/src/app"),
        filename: "main.js"
    },
    mode: "development",
    devtool: "source-map",
    devServer: {
        port: 3000,
        contentBase: path.join(__dirname, "/src/app"),
        hot: true,
        historyApiFallback: { index: "index.html" }
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-react", ["@babel/preset-env", { targets: { node: "12" } }]]
                    }
                }
            }
        ]
    }
}