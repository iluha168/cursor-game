const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "src/client/index.html", to: "index.html" },
                { from: "src/client/style.css", to: "style.css" },
            ],
        }),
    ],
	entry: "./src/client/client.js",
	output: {
		filename: "index.js",
		path: path.resolve(__dirname, "dist"),
	},
	target: "web",
	mode: "development",
	experiments: {
		topLevelAwait: true,
	},
};
