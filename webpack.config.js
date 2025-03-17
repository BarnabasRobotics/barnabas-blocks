import path from "path"

import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import webpack from "webpack"
const { ProvidePlugin } = webpack

export default {
    entry: {
        index: {
            import: "./web/index.js",
            dependOn: [
                "blockly",
                "blocks",
                "generators",
            ],
        },
        blockly: "blockly",
        blocks: {
            import: "./web/blocks/blocks.ts",
            dependOn: [
                "blockly",
            ],
        },
        generators: {
            import: "./web/generator/arduinoGenerator.ts",
            dependOn: [
                "blockly",
            ],
        },
        img2hex: {
            import: "./web/img2hex.js",
        },
    },
    devtool: "eval-source-map",
    mode: "production",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                include: /web|common/,
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.m?js$/,
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.(html)$/,
                use: "html-loader",
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                ],
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        fallback: {
            os: false,
            util: import.meta.resolve("util"),
            stream: false,
        },
    },
    plugins: [
        new ProvidePlugin({
            // eslint-disable-next-line @stylistic/quote-props
            "Buffer": ["buffer", "Buffer"],
            process: "process/browser.js",
        }),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: "web/index.html",
            excludeChunks: ["img2hex"],
        }),
        new HtmlWebpackPlugin({
            filename: "img2hex.html",
            template: "web/img2hex.html",
            chunks: ["img2hex"],
        }),
    ],
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(import.meta.dirname, "dist"),
        clean: true,
    },
}
