# vue-resource 
## 参考链接：[resource](https://www.jianshu.com/p/3ce2bd36596e)
## 1 get请求
``` 
this.$http.get(url,[options]).then(...)

```
例：
``` 
this.$http.get('package.json',{
                  params:{
                    userId:'123'
                  },
                header:{
                  token:'abc'
                }
              }).then(res=>{
                  console.log(res.data);
              });
```
## 2 post 
``` 
this.$http.post(url,[body],[options]).then(...)

```
例：
``` 
this.$http.post('package.json',{
            userId:'123'
        },{
            header:{

            }
        }).then(res=>{
            console.log(res.data)
        });

```
## 3 jsonp
``` 
this.$http.jsonp(url,[options]).then(...)
```
## 4 通用api

``` 
#[obj] 是配置对象，里面有URL, method,params,headers,before(),等等
this.$http([obj]).then(...) 
```
例如：
``` 
this.$http({
            method:'post',
            url:'package.json',
            params:{id:'123',name:'xiaoming'},
            headers:{
                token:'ababab'
            },
          timeout:5,
          before(){
            console.log('before init')
          }

        }).then(res=>{
            console.log(res.data);
        });
```
## 5 全局拦截器,用于对发送请求的过滤和拦截
```
Vue.http.interceptors.push((request,next)=>{...});

```
例如：
``` 
Vue.http.interceptors.push((request, next) => {
        // ...
        // 请求发送前的处理逻辑
        // ...
    next((response) => {
        // ...
        // 请求发送后的处理逻辑
        // ...
        // 根据请求的状态，response参数会返回给successCallback或errorCallback
        return response
    })
})

```
