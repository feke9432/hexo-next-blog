---
title: js 编码函数收集
date: 2018-12-28 23:32:34
tags: -js
categories: 前端--js
---

这里收集记录一些用过的 js 编码函数
<!-- more -->
1. `escape`  已废弃！ 使用 `encodeURI` 和 `encodeURIComponent` 替换

* 定义： 将传入字符串转译为 十六进制 格式，以避免各个电脑字库不同无法正常显示的问题，但随着现代浏览器的统一，已经没有这种问题，因而被废弃。

* 语法： `escape(str)` 除 特色字符 ` @*_+-./ ` 外，都会被转译

* 实例： 

```
escape('ss__FF__+__@__-__&__:__=__$__,__里面__')

ss__FF__+__@__-__%26__%3A__%3D__%24__%2C__%u91CC%u9762__
```

* 注意事项：注意，已废弃，尽量避免使用

* 相关函数：`unescape`

2. `encodeURI` 操作整条链接时使用

* 定义：将整个url的非 ASCII 字母 和 数字 以及ASCII 标点符号(`- _ . ! ~ * ' ( ) `)，以及对ASCII有特殊含义的符号(`;/?:@&=+$,#`)以外的字符进行十六进制的转义序列进行替换。

* 语法：`encodeURI(URIstring)`

* 实例：

```
encodeURI('https://www.baidu.com/s?ie=UTF-8&wd=encodeURI')

https://www.baidu.com/s?ie=UTF-8&wd=encodeURI
```

* 相关函数：`decodeURI` 

3. `encodeURIComponent` 传递参数时需要使用

* 定义：对 url 的组件经行 十六进制转义序列替换 替换，与 `encodeURI` 不同，会对 `;/?:@&=+$,#` 字符经行转换，以保证参数不会的打断url

* 语法： `encodeURIComponent(URIstring)`

* 实例：

```
http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fjsref_encodeURIComponent.asp%3Fid%3D123%264)*%25%24%40!"
```

* 相关函数：`decodeURIComponent`
