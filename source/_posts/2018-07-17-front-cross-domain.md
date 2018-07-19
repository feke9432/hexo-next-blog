---
title: 前端跨域学习笔记
date: 2018-07-17 11:07:18
tags: js
categories: 前端--linux
---

一直以为跨域这种基础早就把文章写了，今天整理才发现：没有。。。

吾日当三省吾身啊。
<!-- more -->

# 什么是跨域

想谈论跨域，首先就要理解什么是“域”；

简单说 域 就是两台不同的服务器，至于服务器者，电脑尔；

比如你想用自己的电脑访问女神的电脑上的私密照片，如果能随意访问显然是不道德的，更别说五角大楼里的机密文件，为了保证安全性，自然要把两台服务器分开，让你不能访问女神的私密照片，所以女神还可以是女神，机密还是机密；

如何分开，这时候你又问了，我的电脑和女神的电脑明明是两台，本来就分开的啊；

这没错，但同时，不要忘记，我们都是要上网的，而我们访问的网络却是同一个，于是就有了，这种可能，你和女神访问同一个网站，也就是你的电脑与这个网站建立连接，女神的电脑也与这个网站建立连接，如果这个网站把你的连接和女神的连在一起，就通过网线达成了一种虚拟的连接状态，我们要分开的就是这种状态。

显然我们的时代恰恰是最坏的时代，因为这种简单的事情早就被前辈大牛们解决了，解决方案就是各种各样的协议，而在我们时常访问的浏览器中，就有了一种名为：同源策略；的协议限制我们不能访问其他人包括女神的服务器。

**同源策略：** 限制从一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的关键的安全机制。浏览器的同源策略，出于防范跨站脚本的攻击，禁止客户端脚本（如 JavaScript）对不同域的服务进行跨站调用（通常指使用XMLHttpRequest请求）。

在浏览器里，同源指的是当访问网站的 协议、端口、域名 都相同的页面，才吧两个页面视为同一源，或者说同一域，一般情况下禁止跨域访问文件啊，数据啊，等等。

例如连接 `http://store.company.com/dir/page.html` 中想请求数据：

| url | 结果 | 原因|
|--|--|--|
|http://store.company.com/dir2/other.html | 成功| |
|http://store.company.com/dir/inner/another.html | 成功||
|https://store.company.com/secure.html| 失败 | 不同协议 ( https和http )|
|http://store.company.com:81/dir/etc.html| 失败 | 不同端口 ( 81和80)|
|http://news.company.com/dir/other.html| 失败 | 不同域名 ( news和store )|

而**跨域**，就是说跨过不同的域请求文件及数据的行为；

一般主要用在跨域请求数据，文件比如图片，js文档，视频文件等使用某些 HTML 的 src 属性访问不受同源策略限制。

# 如何跨域

那要如何跨域呢？

1. 通过 HTML 的 src 属性；

上文提到某些标签的 src 属性不受同源策略限制，于是：

* 通过 img 图片的 src 向服务器发送数据，比如百度统计，就是用这种方法统计数据：

![](./01.jpg)

* jsonp ，通过 script 标签的 src 属性跨域，具体你可以点这里[jsonp 概念及简单实现](https://feke9432.github.io/2017/11/28/2017-11-28-jsonp/)

qq 音乐就采用这种方式传输数据：

![](./02.jpg)

但使用标签的 src 属性只能使用 Get 请求数据

2. CORS (Cross-Origin Resource Sharing) 跨域资源共享

这是浏览器的一种技术规范，提供了 web 服务从不同域传来沙盒脚本的方法以避开浏览器的同源策略，确保安全的跨域数据传输。现代浏览器使用CORS在API容器如XMLHttpRequest来减少HTTP请求的风险来源。

可以支持所有 HTTP 请求方式，但需要在服务端配置以下响应头的一种或几种：

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
Access-Control-Max-Age: 86400
```

跨域请求默认不会携带Cookie信息，如果需要携带，请配置下述参数：

```
"Access-Control-Allow-Credentials": true
// Ajax设置
"withCredentials": true
```

# 参考资料

1. [浏览器的同源策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)

2. [八种方式实现跨域请求](https://blog.csdn.net/ligang2585116/article/details/73072868)