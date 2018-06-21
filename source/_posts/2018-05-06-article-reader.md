---
title: 是时候写一个专属自己的阅读器了
date: 2018-05-06 15:49:04
tags: project
categories: 前端--js
---

旧时代，看书就是买书，租书，都是实体书，体验大多类似，到了今天，笨重的实体书已经满足不了这个疯狂的年代，看书大多是用网上的阅读器，但别人的总是适合大多数人，偏偏我不愿意做大多数人，又没有人会关照自己的情况下，只好自己搞一个出来。

<!-- more -->

# 开始

我总觉得万丈高楼平地起，首先做个简单的，三个文件：1. article.txt; 2. index.html; 3. index.php;

逻辑也很简单：用户看到的是 index.html 请求 index.php 读取的 article.txt 内容：

```
// php 读取文件内容就一句话。
<?php
header("Content-type: text/html; charset=utf-8"); 

echo file_get_contents("./article.TXT");
?>

// html 采用了es6新api：fetch，这里只贴出最精华的请求内容部分。
fetch('./index.php').then((data)=>{
    return data.text();
}).then((data)=>{
    document.querySelector('p').innerHTML = data;
})
```

fetch 接口 请求接口后返回一个 Promise 对象，resolve 的参数会被包装很多处理返回的数据流的函数，这里使用 text() 处理我们的纯文本。

直接返回后页面太丑，用 css 简单修饰一下：

```
body {
    margin: 0;
    padding: 0;
    background: #746e6e;
}
p {
    line-height: 2.2;
    font-size: 18px;
    background: #424241;
    color: #8c8c8c;
    font-family: 'Microsoft YaHei',PingFangSC-Regular,HelveticaNeue-Light,'Helvetica Neue Light',sans-serif;
    width: 100%;
    max-width: 680px;
    margin: 0 auto;
    padding: 20px;
    box-sizing: border-box;
}
```

页面凑合能看了，但实际体验很差。。。因只要关掉页面，数据重新加载，我们之前看的进度就没了，而且纯 Txt 文档也没有分页功能，我们的阅读器自己也没有分页功能，导致每次都会从头开始。。

这里方案应该是多元化的，首先试试将进度写入缓存：

1. 获取当前滚动高度是整个文档高度的百分比
2. 使用localStorage储存，
3. 每次进页面读取储存高度，并设置给页面。

这里使用 localStorage 实现浏览器缓存，如果你和我一样第一次使用，可以查看下列接口简单列表；

```
A. localStorage.setItem(key, value)      存储数据信息到本地

B. localStorage.getItem(key)      读取本地存储的信息

C. localStorage.removeItem(key)   删除本地存储的信息

D. localStorage.clear()        清空所以存储的信息
```

