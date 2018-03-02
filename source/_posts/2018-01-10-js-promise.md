---
title: promise 学习使用
date: 2018-01-10 19:22:50
tags: js
---

## js Promise

为了解决前端异步回调地狱，出台的解决方案。

promise 在 js 中使用构造函数（Promise），创建promise对象，把回调函数绑定在这个对象上，以达到控制异步函数顺序执行同时不影响其异步行为的目的。
<!-- more -->
首先不妨看看规矩的制定者们怎么说：[【翻译】Promises/A+规范](http://www.ituring.com.cn/article/66566)

## 

## 使用

promise 是 es6 的新特性，现阶段考虑浏览器兼容性在客户端使用需要配置babel，我主要在express配置的服务端中使用，
最近的node.js v8.0 以上实现了大部分 es6 新特性，就包括 promise。

现在我们考虑一个场景： 我们要做一个统计平台，客户端使用 Echarts 图标格式展示数据，现在要做一个统计各省市的访问量表格，后台怎么写？

按照我的第一思路，首先查出总数量，然后查数据库中记录到的省市，然后根据省市查具体各省市的访问ip数。

前几步还好，回调也就两层，但到了第三步，如果还是用回调，那多少个省市就有多少个回调，无疑会极难维护，这时候 promise 的 all 函数就到了发挥作用的时候了：

```
//  Promise.all 函数接收一个存着 promise 实例对象的数组，返回按数组顺序的之前异步执行的结果数组
// 也就是说，虽然是异步，但最后结果数组是按 for 循环填入顺序的次序。

function getOne () {  // 将要执行的异步操作封装到 promise 对象里，并返回实例对象
    return new Promise((resolve, reject) =>{console.log('查询省市具体访问量'); resolve(num)} );
}

function getAll () { // 循环整个省市数组，接收到的 promise 实例放到数组里最后传给 all 函数
    var promArr = [];  
    for (let i = 0, len = proList.length; i < len; i++) {
        promArr.push(getOne);
    }
    return Promise.all(promArr);
}

// 在具体逻辑中就可以链式调用了
getAll.then(nextFunc).then(nextFunc)....
```

第一次使用 all 函数时候异常惊喜，我的操作都是异步的，但得到的结果却是顺序排列的，接着花了三分之一分钟后就想明白了，异步时候传入角标，出来再传出来，找坑拉屎就好。
