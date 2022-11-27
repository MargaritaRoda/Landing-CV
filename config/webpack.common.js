const path = require('path');
const PugPlugin = require('pug-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        // index: path.resolve(__dirname, '../src/pug/pages/index.pug'),
        index: path.resolve(__dirname, '../src/js/index.js'),
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'scripts/[name].[fullhash].js',
        assetModuleFilename: 'assets/[hash][ext][query]',
        // clean: true,
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: PugPlugin.loader,
                options: {
                    method: 'render',
                },
            },
            {
                test: /\.(css|sass|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            // exportType: 'string'
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ],
            },
            {
                test: /\.(png|svg|jp?g|gif)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[hash][ext]',
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[hash][ext]',
                },
            },
        ],
    },
    plugins: [
        // new PugPlugin({
        //   extractCss: {
        //     // output filename of CSS files
        //     filename: 'styles/[name].[contenthash:8].css',
        //   },
        // }),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
        })

    ],
};
