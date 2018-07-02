---
title: 记录一些常用的正则表达式
date: 2018-06-20 11:30:48
tags: 
    - js
    - RegExp
categories: 前端--js
---

开发中总能遇到很多需要正则表达式的地方，这里记录一些，方便查阅。

<!-- more -->

# 判断html标签类

## 标题 head => title

```
/<TITLE>([\w\W]*?)<\/TITLE>/si
```

## 关键字 head => keywords

因为不能确定位置和符号，所以用了四个来覆盖所有情况。

```
/<META\s+name="keywords"\s+content="([\w\W]*?)"/si
/<META\s+name='keywords'\s+content='([\w\W]*?)'/si
/<META\s+content="([\w\W]*?)"\s+name="keywords"/si
/<META\s+http-equiv="keywords"\s+content="([\w\W]*?)"/si
```

## 描述 head => description

```
/<META\s+name="description"\s+content="([\w\W]*?)"/si
/<META\s+name='description'\s+content='([\w\W]*?)'/si
/<META\s+content="([\w\W]*?)"\s+name="description"/si
/<META\s+http-equiv="description"\s+content="([\w\W]*?)"/si
```

# 判断完整连接

```
/(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/
```

# 获取连接的协议加域名部分

```
/(http|https):\/\/[^\/]+\//i

// 你同样可以使用dom
window.location.protocol + '//' + window.location.host // 兼容 ie8 以上
window.location.origin // 兼容 ie 11 以上
```