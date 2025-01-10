---
title: console 和 访问器属性
date: 2017-11-25 13:28:43
tags: js
categories: 前端--js
---

## console + 访问器属性

之前在腾讯大前端团队的[官方主页](http://www.alloyteam.com/)上打开谷歌调试 console 突然发现企鹅家和其他家的不一样，居然是可以交互的！突然很好奇，是怎么实现的。
<!-- more -->
第一反应就是查文档：

[window.console](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/console)
 
```javastript
1. console.assert(false, obj[obj ,… ])
    输出对象列表
2. console.clear()
   清空 console
3. console.count()
   以参数记录调用次数
4. console.dir()
   打印三角符号开头的信息
5. console.error()
   打印错误信息
```


最终得到结论：前端的console是没有接受输入功能的。

但这个和之前学vue时的演示很像，控制台输入内容，页面内元素改变，于是就联想到也许可以用访问器属性试试。

## 访问器属性

js 中属性分两种，一种数据属性，一种访问器属性.

访问器属性不包含数据值，而是提供get和set接口操作数据，同时具有configurable（标示能各种修改）、enumerable(能否for...in循环)。

访问器属性不能直接声明，要通过 Object.defineProperty() 这个接口定义

我们这里只是完成控制台输入访问器属性名，进行左查询调用get函数，函数内继续打印，造成是控制台受到监控的假象。

还可以设置延时函数，多次打印等，越研究越有意思。:)

## 加一点

平时控制台输入变量按回车后一般打印出正常信息后还会打印出一个半透明的undefined,但发现企鹅队是没有的。

一点头绪没有，索性直接看他代码，才发现原来返回值问题，执行的函数内加如return：

```
return console.log('那就给你力量，啊哈哈哈哈'), "哈~美~哈~美~哈！！！！"; 
```
原来那个半透明是函数的返回值，那这个逗号是啥意思？

查资料后：

**原来逗号也是 js 的运算符的一种**

* 逗号运算符可以出现在任意表达式，用于分隔每一个表达式。

* 先计算左边的操作数，然后计算右边的操作数，最后返回右操作数的值。

* 当应用上下文是参数列表时，逗号用于分隔每个参数。

```
var a = 1, b = a + 2, c = b * a;
console.log(c), console.log(b), alert(a), console.log(move(a));
alert(a, b, c); // 1
alert((a, b, c)); // 3 // 这个是因为括号让里面的被识别为表达式，整个括号才是参数，而表达式中返回的就是最后一个值

function move (ar) {
    console.log(ar)
    return a, b , console.log(c), a + c;
}
```

上面例子中，逗号用于分隔变量声明时，只是分隔表达式，不可添加函数调用，会报错。

分隔函数调用时，按顺序执行。

分隔参数时，由于 alert 函数之接受第一个参数，所以显示第一个参数的值。

return 语句中，返回的就是最后一个值。
