# webpack 打包工具

## build 主配置目录，基本上不用修改

### webpack.dev.conf.js文件
1. 模拟后台接口在webpack.dev.conf.js文件中

``` 
//模拟后台接口
const express=require('express');
const app=express();
const router=express.Router();
//将路由挂载到app
app.use('/api',router);
const axios=require('axios');
# 需要在devserver 内增加 

``` 
2. 在devServer{}内增加before(){} 函数
``` 
before(app){
# 内部路由接口
app.get(url,fn(res,req){
# 需要返回给前端的数据
  res.json(data)
})

};

```
### webpack.base.conf.js 文件
1. 配置别名，方便在前端 import时，使用
``` 
 alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'common':resolve('src/common'),
      'components':resolve('src/components')
    }

```


## config目录打包输出配置项，我们自己要修改的地方index.js文件
``` 
# dev 模块下是开发时打包输出，基本不用修改
# build 模块下是我们要修改的地方
# 模板输出文件
index: path.resolve(__dirname, '../dist/index.html'),
# 输出目录
assetsRoot: path.resolve(__dirname, '../dist'),
# 静态资源目录
assetsSubDirectory: 'static',
# 公共资源前缀，要修改，否则默认是 /static/... 找不到
assetsPublicPath: '/',

```
## src目录下的assets 目录和 ../static 目录都是存放静态资源的
1. assets目录下一般存放，和组件相关近的，会被webpack打包
2. static 目录下存放的，资源，图片会原样引用，不会被压缩打包


