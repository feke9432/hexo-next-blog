---
title: ios 系统嵌套 iframe 时遇到的问题
date: 2018-05-07 17:26:15
tags: 兼容性
---

一个两个就忍了，最近实在层出不穷，特此记录兼吐槽一下。真心不推荐使用iframe。

<!-- more -->

## ios 系统嵌套 iframe 里不能存缓存

ios 系统浏览器嵌套的 iframe 不能写入缓存，导致一些使用缓存做的验证码登录无法使用。

## ios 系统嵌套 iframe 时页面无法滑动

ios 系统浏览器嵌套的 iframe 里的滚动条无法使用。这个可以使用如下解决方案：

给 iframe 加父 div ，给父 div 添加如下属性。

```
-webkit-overflow-scrolling: touch;  
overflow-y: scroll; 
```

但这时候 iframe 内容无法使用 position: fixed;

## ios 系统嵌套 iframe 时页面 js 事件无法触发

ios 系统嵌套 iframe 时页面 js 事件无法触发

## ios 系统嵌套 iframe 时子页面二维码无法识别

ios 系统嵌套 iframe 时子页面二维码无法识别，网上有方法说，利用 h5 新特性 postMessage 将二维码图片传到上层，上层将图片透明并展示到用户手底下，用户长按时，实际是长按上层的透明二维码，于是就可以识别了。

## iso 系统嵌套 iframe 时子页面无法使用 position：fixed

iso 系统嵌套 iframe 时子页面无法使用 position：fixed

## 最终方案：

判断浏览器类型，安卓正常使用 iframe ，ios 直接跳转 子页面。