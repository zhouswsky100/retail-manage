const resolve = require('path').resolve
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin=require('uglifyjs-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const target = process.env.TARGET || 'web';
const url = require('url')
const publicPath = ''
const defaultSettings = require('./src/common/config.js')
console.log(`当前代理的url----${defaultSettings.porxyUrl}`)


module.exports = (options = {}) => ({
  devtool: "source-map",
  entry: ['babel-polyfill', './src/main.js'],
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'main.js',

  },
  
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        include: [
        resolve('src'), resolve('test'), resolve('/node_modules/element-ui/src'), resolve('/node_modules/element-ui/packages')      ], 
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: [
         {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.styl(us)?$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          'postcss-loader',
          'stylus-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
         {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'images/[name].[ext]',

        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac|m4a)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[ext]',

        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[ext]',

        },
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
    ]),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './src/index.html',
      inject: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/app.css',
    }),
  ],
  optimization:{
    minimizer:[
        new UglifyJsPlugin({
            uglifyOptions: {
                output: {
                    comments: false
                },
                warnings: true,
                compress: {
                    drop_debugger: true,
                    drop_console: true
                }
            }
        })
    ]
  },
  devtool: "source-map",
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src')
    }
  },
  devServer: {
    host: '127.0.0.1',
    port: 9000,
    open: true,
    proxy: {
      '/retailer-api/': {
        target: defaultSettings.porxyUrl,
        pathRewrite: {'^/retailer-api':'retailer-api'},
        changeOrigin: true,     // target是域名的话，需要这个参数，
        secure: false,          // 设置支持https协议的代理
      },
    },
    historyApiFallback: {
      index: url.parse('/assets/').pathname
    }
  },
  devtool: '#eval-source-map' 
})
