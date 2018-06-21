---
title: js 实现点击复制功能
date: 2018-05-16 16:18:48
tags: js
categories: 前端--js
---

单纯地实现点击复制是比较简单的，但要实现兼容现有主流浏览器还是比较难的，还有很多注意的点。

<!-- more -->

# 使用 [clipboard.js](https://clipboardjs.com/) 

网上有很多介绍点击复制的文章，这里只记录一个目前最好的方案，就是使用不需要任何依赖的clipboard.js；

使用了 H5 新接口，兼容 pc webkit内核，移动端兼容 安卓 和 10系统以上的 iOS 系统浏览器；

先给出使用方法：

```
// 引入
<script src=".../clipboard.min.js"></script> 

// 在要点击的元素添加这个
<button data-clipboard-action="copy" data-clipboard-target="#target" class="copy_btn">要复制的内容</button>

// 需要实例化点击复制模型
var clipboard = new Clipboard('.copy_btn');
// 成功后需要执行的函数
clipboard.on('success', function (e) {
    // 。。。do something
});
// 失败后需要执行的函数
clipboard.on('error', function (e) {
    // 。。。do something
});
``` 

在安卓浏览器中基本没有避讳，被点击元素可以是任何元素，div，span，label，都是可以的；

但在iOS系统中，浏览器要求触发复制的元素必须是可点击元素，并且必须是用户能看到要复制的内容。基本欺骗浏览器的行为都会导致复制失败。

这里我选择了 button ，因为相对于 input 和 textare ，重置样式少，另一方面，我的需求基本都是用户直接点击要复制的内容，做成按钮也方便添加效果，也更符合语义。