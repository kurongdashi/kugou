# axios 插件 和vue-resource类似
## 参考 [axios](https://www.jianshu.com/p/df464b26ae58)
## 1 get方式
 ``` 
 axios.get(url,[options]).then(...).catch(...)
 ```
例如：
``` 
axios.get('package.json',{
              params:{
                  id:'123',
                name:'zhangsanfeng'
              },
              headers:{
                  token:'abcdef'
              }
          }).then(res=>{
              console.log(res.data)

          }).catch(err=>{
              console.log(err);
          })

```
## 2 post方式
 ``` 
 axios.post(url,[body],[options]).then(...).catch(...)
 ```
例如：
``` 
axios.post('package.json',{
            id:'123',
            name:'zhangsanfeng'
          },{
            headers:{
              token:'abcdef'
            }
          }).then(res=>{
            console.log(res.data)

          }).catch(err=>{
            console.log(err);
          });
```
## 3 没有jsonp api 需要使用通配api实现
```
axios([obj])
```
例如：
``` 
axios({
            url:'package.json',
            method:'post',
            params:{id:"axios",name:'lisi'},
            data:{
                id:'123',
              name:'wangwu'
            }

        }).then(res=>{
            console.log(res.data);
        }).catch(err=>{
            console.log(err);
        });
```
