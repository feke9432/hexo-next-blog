---
title: 使用 pm2 维持 liunx 服务器的远程程序
date: 2019-01-15 14:35:43
tags: 
  - pm2 
  - js
  - node
categories: 服务端--node
---

pm2 从 安装到各种疑难杂症

<!-- more -->

## 安装

这里默认你已经安装好 node.js ，如果没有，可以参考这篇文章的前半部分：[linux centos 服务器 配置 node.js](https://feke9432.github.io/2017/12/24/2017-12-24-linux-node/)

```
$ npm install -g pm2
// 可能会有一堆警告，不用理睬，这里省略了
...

// 注意换掉 node 安装目录
$ ln -s /node/node-v10.15.0-linux-x64/bin/pm2 /usr/local/bin/pm

// 测试一下
$ pm2 -v
[PM2] Spawning PM2 daemon with pm2_home=/root/.pm2
[PM2] PM2 Successfully daemonized
3.2.8
```

打印版本即为成功了。