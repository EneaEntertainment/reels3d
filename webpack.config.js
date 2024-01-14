const path = require('path');
const pkg = require('./package.json');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const fileName = 'bundle.js';

module.exports = async (env, argv) =>
{
    const pathSrc = path.resolve(__dirname, './src');
    const pathDist = path.resolve(__dirname, `./_dist/`);

    // const isDev = argv.mode === 'development';
    const isDev = true;

    const devServerConfig =
        {
            open : true,
            port : 'auto',
            hot  : false,

            static:
                [
                    {
                        directory : path.resolve(__dirname, './assets'),
                        watch     : true
                    },
                    {
                        directory : pathDist,
                        watch     : true
                    }
                ]
        };

    if (isDev)
    {
        const port = 8080;
        const gameUrl = `https://localhost:${port}`;
    }

    return ({
        mode: isDev ? 'development' : 'production',

        entry: [`${pathSrc}/index.ts`],

        output:
            {
                path     : pathDist,
                filename : fileName,
                clean    : true
            },

        devtool: isDev ? 'source-map' : undefined,

        devServer: devServerConfig,

        module:
            {
                rules:
                [
                    {
                        test    : /\.(glsl|vert|frag)$/,
                        use     : 'ts-shader-loader',
                        exclude : /node_modules/
                    },

                    {
                        test: /\.tsx?$/,

                        use:
                            [
                                { loader: 'ts-loader' }
                            ],

                        exclude: /node_modules/
                    }
                ]
            },

        resolve:
            {
                alias:
                    {
                        '@pixijs': path.resolve(__dirname, './node_modules/pixi.js')
                    },

                extensions: ['.ts', '.js'],

                modules: ['node_modules']
            },

        plugins:
            [
                new HtmlWebpackPlugin({
                    template : `${pathSrc}/template.html`,
                    inject   : false,
                    minify   : false,

                    templateParameters:
                        {
                            buildScript: `<script src="${fileName}"></script>`
                        }
                }),

                new CopyWebpackPlugin({
                    patterns:
                        [
                            { from: '**/**.*', context: 'assets' },
                            { from: '*.png', context: pathSrc, noErrorOnMissing: true },
                            { from: '*.jpg', context: pathSrc, noErrorOnMissing: true },
                            { from: '*.json', context: pathSrc, noErrorOnMissing: true },
                            { from: '*.php', context: pathSrc, noErrorOnMissing: true }
                        ],

                    options:
                        {
                            concurrency: 10
                        }
                })
            ],

        optimization:
            {
                concatenateModules: false,

                minimize: !isDev,

                minimizer:
                    [
                        new TerserWebpackPlugin({
                            test     : /\.js(\?.*)?$/i,
                            parallel : true,

                            terserOptions:
                                {
                                    ecma     : 5,
                                    warnings : false,
                                    parse    : {},
                                    compress:
                                        {
                                            drop_console: true
                                        },
                                    mangle          : true,
                                    module          : false,
                                    output          : null,
                                    toplevel        : false,
                                    nameCache       : null,
                                    ie8             : false,
                                    keep_classnames : undefined,
                                    keep_fnames     : false,
                                    safari10        : true
                                }
                        })
                    ]
            },

        performance: { hints: false }
    });
};
