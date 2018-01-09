'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

//模拟后台接口
const express=require('express');
const app=express();
const router=express.Router();
app.use('/api',router);
const axios=require('axios');

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    before(app){
      //get 推荐页面,手机版，获取slider内容 ajax
      app.get('/api/slider',(req,res)=>{

        let url='https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
        axios.get(url,{
          headers:{
            origin:'https://m.y.qq.com',
            referer:'https://m.y.qq.com/',
          },
          params:{
            g_tk:5381,
            uin:0,
            format:'json',
            inCharset:'utf-8',
            outCharset:'utf-8',
            notice:0,
            platform:'h5',
            needNewCode:1,
            _:new Date().getTime()
          }
        }).then((response)=>{
          res.json(response.data);

        }).catch((err)=>{
          console.log('错误类型：'+err)
        })

      })
      //歌单列表，电脑版，获取歌单列表内容 jsonp
      app.get('/api/singlist',(req,res)=>{
        let url='https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
        axios.get(url,{
          headers:{
            referer:'https://y.qq.com/portal/playlist.html',
          },
          params:{
            picmid:1,
            rnd:Math.random(),
            g_tk:5381,
            jsonpCallback:'getApiData',
            loginUin:0,
            hostUin:0,
            format:'jsonp',
            inCharset:'utf8',
            outCharset:'utf-8',
            notice:0,
            platform:'yqq',
            needNewCode:0,
            categoryId:10000000,
            sortId:5,
            sin:0,
            ein:29,
          }
        }).then((response)=>{
          res.json(response.data);

        }).catch((err)=>{
          console.log('错误类型：'+err)
        })

      })
      //歌手列表 jsonp
      app.get('/api/singerlist',(req,res)=>{
        let url='https://c.y.qq.com/v8/fcg-bin/v8.fcg';
        axios.get(url,{
          headers:{
            referer:'https://y.qq.com/portal/singer_list.html',
          },
          params:{
            channel:'singer',
            page:'list',
            key:'all_all_all',
            pagesize:100,
            pagenum:1,
            g_tk:5381,
            jsonpCallback:'getApiData',
            loginUin:0,
            hostUin:0,
            format:'jsonp',
            inCharset:'utf8',
            outCharset:'utf-8',
            notice:0,
            platform:'yqq',
            needNewCode:0,
          }
        }).then((response)=>{
          res.json(response.data);

        }).catch((err)=>{
          console.log('错误类型：'+err)
        })

      })


    },
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
