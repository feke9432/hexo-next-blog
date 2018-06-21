---
title: Meta 表签文档阅读
date: 2018-03-30 16:22:23
tags: html
categories: 前端--html
---

> 本文大部分内容摘自[MDN文档--Meta](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta)

# 定义

HTML <meta> 元素表示不能由其他 html 源相关元素 表示的其他源数据信息。
<!-- more -->
## 元相关元素 
 |标签| 描述 | 子节点|
 |-|-|-|
 |base | target 改变本页内 a 元素的 target 属性  | empty element|
 |-|href 改变本页内元素请求的域名部分 |
 | link | 请求 css 并加载到 样式表域              |empty element|
 |script | 请求 js 并加载到 脚本域。        |      有 src 属性时是 empty element|
 | style| 加载文本子节点到  样式表域。       |      可有文本子节点|
 | title | 设置文本子节点内容为网站标题       |      可有文本子节点|

# 属性

## charset

声明当前文档的字符编码，但可以被任何一个元素的 lang 特性值覆盖，尽量设置为：UTF-8；

## content 

为 http-equiv 或 name 属性提供与其相关值的定义。

## http-equiv

这个枚举属性定义了能改变服务器和用户引擎行为的变异，编译值用 content 来定义。

### content-language => 使用 全局的 lang 属性代替他

### content-security-policy 内容安全策略

他允许页面作者定义当前页的内容策略，主要制定允许的服务器源和脚本端点，有助于防止夸站脚本攻击。

### content-type 文档编码格式，使用 meta 元素的 charset 属性代替。

### default-style 设置页面的首选样式表。

### refresh 设置页面重载时间和链接，链接参数可选：`int;url`

### Pragma 禁止浏览器从本地缓存中调用内容

## name

这个属性用来定义文档级的元数据，不能与 itemprop、http-equiv、charset 同时出现 ，此属性值的具体相关属性被包含在 content 属性中

### application-name 定义网页应用的名称，简单网页不应设置此标签

### author 文档作者名称

### description 包括一个关于页面内容的缩略二精准的描述

### generator 以自由的格式为生成页面的软件提供标识符。

### keywords 为页面提供以逗号分隔的与内容相关的关键字。

### robots 机器人向导，告诉蜘蛛那些页面需要被索引，那些不要

## viewport 提供页面初始大小的提示，有些只在移动端有效

### width 以像素为单位定义视口宽度，可用正整数或者 device-width

### height 以像素为单位定义视口高度，可用正整数或者 device-width

### initial-scale 初始缩放大小，从 1.0 到 10.0

### maximum-scale 最大缩放的最大值

### minimum-scale 最小缩放值

### user-scalable 是否允许用户缩放 yes no