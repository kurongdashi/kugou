# vue-router 规则详细配置

## 路由实质是对history的封装,路由一般单独抽取成一个文件，然后由main.js加载
``` 
# 通过pushstate改变地址栏
history.pushState('desc','test','/admin')
```

## 1. path 
``` 
#1 默认 / 形式的
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
```
2. 动态路由,也就是带参数的路由
```
#访问路径必须是goods 后面加一个参数名为goodsId的参数
#完整的访问路径例如：#/goods/1231 ,如果不是则不能访问
routes: [
    {
      path: '/goods/:goodsId',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
#模板页面中获取参数 $route.params.参数名
<span>{{$route.params.goodsId}}</span>
  
```
## 2. 路由模式 mode 配置
1. 默认是hash模式 ，带#
>http://localhost:8080/#/goods/123

2. mode 配置
``` 
export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})

```
## 3.子路由
1. 配置
``` 
export default new Router({
  mode:'history',
  routes: [
    {
      path: '/goods/:goodsId',
      name: 'this hello ',
      component: HelloWorld,
      children:[
        {path:'hello',component:hello},
        {path:'world',component:world},
      ]
    }
  ]
})
```
2.模板中
``` 
 <router-link to="/goods/hello">子路由1</router-link>
    <router-link to="/goods/world">子路由2</router-link>

    <!--如果在组件中有子路由，则必须自己添加router-view去装载子路由渲染的内容-->
    <div><router-view></router-view></div>

```

## 4.路由跳转，页面切换
``` 
  # 直接跳转
  this.$router.push('/world')

  #带参数
 this.$router.push({path:'/goods?id=123'})
 
 #路由的参数 params，这个不是跳转页面的参数 
 this.$router.push({path:'/goods',params:{id:123}});
 #页面跳转参数 query
 this.$router.push({path:'/goods',query:{id:123}});
 
 #获取参数
 <div>{{$route.query.id}}</div>
```
# 参考链接 [vue-router](https://router.vuejs.org/zh-cn/installation.html)
