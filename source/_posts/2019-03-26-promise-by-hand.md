---
title: 经典题记录，手写 promise
date: 2019-03-26 10:14:36
tags: -js
categories: 前端--js
---

经典题记录，手写 promise

<!-- more -->

## 什么是 promise

`promise` 译为承诺，在前端当中主要解决 “回调地狱” 问题：

![](./0.jpg)

他是一种异步编程解决方案，可以理解为一个高阶函数工厂，使用 Promise 的构造函数将输入的一个需要异步处理的函数包装一个 有多种 promise 功能的盒子（object），然后优雅地解决异步问题。

这里有个点，使用 promise 的 then 方法将多层嵌套改为链式调用，让逻辑清晰，事实上是降低了开发难度的。

## 一个成熟的 Promise 对象都有啥

0. 首先来看一个原生 Promise 调用的例子。

```
let p = new Promise((resolve,reject) => {
  setTimeout(() => {
    console.log('run async ')
    resolve('resolve')
  },1000);
})

p.then((res) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('run async then 1')
      resolve('one plus')
    },1000);
  })
}).then((res) => {
  console.log('get then2 res',res)
})
```

1. Promise 有三种状态： 
  a. pending (等待) 
  b. resolved (成功)
  c. rejected (失败)

从 pending 开始，一经改变就不能再改，要么成功，要么失败。

2. 响应处理状态的方法：
  a. resolve
  b. reject

这两个方法传给异步函数（executor），也就是处理我们的 ajax 请求等业务的函数。

3. 以及 Promise 的灵魂：处理异步结束的方法：
  a. then
  b. finally

4. 最后还有处理错误的方法，能处理错误是系统稳定性的保证措施之一：
  a. catch

5. 最后的最后是一些官方对 Promise 的定义：
  a. promise规范中要求所有的`infulfilled`, `inrejected`都要异步执行

## 实现一个 Promise

为了免于冲突自己的 Promise 取名为： `_Promise`；

Promise.all 

```
 41   _Promise.all = function(arr) {
 42 
 43     if (!(arr instanceof Array)) {
 44       throw 'arr must be _Promise Array';
 45       return;
 46     }
 47 
 48     return _Promise(function(resolve, reject) {
 49       var dataarr = {};
 50       var len = arr.length;
 51       for (var i = 0; i < len; i++) {
 52         (function(c) {
 53           console.log(arr[c]);
 54           arr[c].then(function(data) {
 55             dataarr[c] = data;
 56             len--;
 57             if (len == 0) {
 58               var data = new Array(len);
 59               for (var item in dataarr) {
 60                 data[item] = dataarr[item];
 61               }
 62               resolve(data);
 63             }
 64 
 65           }, function(error) {
 66             reject(error);
 67           })
 68         })(i)
 69       }
 70     })
 71   }
 72 
```

这是我实现的简易版：

```
class _Promise {
  constructor (executor) {
    this.status = 'pending' // pending , resolved, rejected
    this.value = null // 处理异步后的值
    this.reason = null // 异常保留值
    this.resolveCallBackList = []
    this.rejectCallBackList = []
    this.isHasCatch = false
    this.CatchFunc = null
    let self = this

    function resolve(val) {
      if (self.status === 'pending') {
        self.status = 'resolved'
        self.value = val
        self.resolveCallBackList.forEach(fun =>fun());
      }
    }

    function reject(val) {
      if (self.status === 'pending') {
        self.status = 'rejected'
        self.value = val
        self.rejectCallBackList.forEach(fun => fun());
      }
    }
    try {
      executor(resolve,reject)
    } catch (error) {
      console.log('init  ')
      if (this.isHasCatch) {
        this.CatchFunc(error)
      } else {
        reject(error)
      }
    }
  }

  then(infulfilled, inrejected) {
    let self = this
    let p2 ;

    infulfilled = typeof infulfilled === 'function' ? infulfilled : function (val) {
      return val
    }
    inrejected = typeof inrejected === 'function' ? inrejected : function (err) {
      throw err
    }

    if (self.status === 'resolve') {
      p2 = new _Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            let x = infulfilled(self.value)
            self.resolvePromise(p2, x, resolve, reject)
          } catch (error) {
            console.log('then resolve ')
            if (this.isHasCatch) {
              this.CatchFunc(error)
            } else {
              reject(error)
            }
          }
        });
      })
    }

    if (self.status === 'rejected') {
      p2 = new _Promise((resolve,reject) => {
        setTimeout(() => {
          try {
            let x = inrejected(self.reason)
            self.resolvePromise(p2,x,resolve,reject)
          } catch (error) {
            reject(error)
          }
        });
      })
    }

    if (self.status === 'pending') {
      p2 = new _Promise((resolve,reject) => {
        setTimeout(() => {
          try {
            self.resolveCallBackList.push(() => {
              let x = infulfilled(self.value)
              self.resolvePromise(p2,x,resolve,reject)
            })

            self.rejectCallBackList.push(() => {
              let x = inrejected(self.reason)
              self.resolvePromise(p2,x,resolve,reject)
            })
          } catch (error) {
            reject(error)
          }
        });
      })
    }
    return p2
  }

  resolvePromise(p2,x,resolve,reject) {
    let self = this
    if (p2 === x && x !== undefined) reject(new Error('类型错误'))

    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
      try {
        let then = x.then
        if (typeof then === 'function') {
          then.call(x, function (y) {
            self.resolvePromise(p2,y,resolve,reject)
          })
        } else {
          resolve(x)
        }
      } catch (error) {
        reject(error)
      }
    } else {
      resolve(x)
    }
  }

  catch(handleError) {
    return this.then(undefined,handleError)
  }
}

```
知识决定高度，现在高度低，多写多练。
