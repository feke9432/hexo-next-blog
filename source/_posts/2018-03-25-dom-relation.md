---
title: 从兄弟节点到 dom 分级
date: 2018-03-25 12:32:17
tags: js
---

本来想找当前节点的兄弟节点的原生写法，找到文章却很陌生，用 Can I use 测试却意外注意到了一句话 `DOM Core Level 2 properties` ,之前听[老黑](http://www.heibaipig.com/)说过 DOM 分级的事情,那时候还不太明白什么是 DOM ，这次突然再次被提起，于是决定仔细看看。
<!-- more -->
> [js或jquery如何获取父级、子级、兄弟元素(包括祖级、孙级等)](https://lvwenhan.com/web-front/373.html)  
> 查看各个浏览器对 CSS HTML JS 支持情况 [Can i use](https://caniuse.com/)  
> MDN 的 [DOM Level](https://developer.mozilla.org/fr/docs/DOM_Levels)  

## DOM Level 1

1级DOM在1998年10月份成为W3C的提议，由DOM核心与DOM HTML两个模块组成。DOM核心能映射以XML为基础的文档结构，允许获取和操作文档的任意部分。DOM HTML通过添加HTML专用的对象与函数对DOM核心进行了扩展。


这张表就是我们 dom 1.0 所有属性和接口，可以看到允许的事情其实比较少，比较常用的就是：`documentElement`、`createDocumnet`、`createAttribute`、`getElementByTagName`.

## DOM Level 2

鉴于1级DOM仅以映射文档结构为目标，DOM 2级面向更为宽广。通过对原有DOM的扩展，2级DOM通过对象接口增加了对鼠标和用户界面事件（DHTML长期支持鼠标与用户界面事件）、范围、遍历（重复执行DOM文档）和层叠样式表（CSS）的支持。同时也对DOM 1的核心进行了扩展，从而可支持XML命名空间。

我们熟悉的关系节点的获取就是这个版本被加入的：

```
var a = document.getElementById("dom");
    var b = a.childNodes;// 获取 a 的全部子节点
    var c = a.parentNode;// 获取 a 的父节点
    var d = a.nextSibling;// 获取 a 的下一个兄弟节点
    var e = a.previousSibling;// 获取 a 的上一个兄弟节点
    var f = a.firstChild;// 获取 a 的第一个子节点
    var g = a.lastChild;// 获取 a 的最后一个子节点

document.getElementById()
document.getElementsByTagName()
```

## DOM Level 3

3级DOM通过引入统一方式载入和保存文档和文档验证方法对DOM进行进一步扩展，DOM3包含一个名为“DOM载入与保存”的新模块，DOM核心扩展后可支持XML1.0的所有内容，包括XML Infoset、 XPath、和XML Base。

## DOM 4 以及未来

事实上 DOM Level 3 早已经是过去了，现代浏览器进一步迈进到 4.0 或更高。

我们熟悉的 `querySelector` 就是这个版本被添加的。

比如上面的兄弟元素就可以：

```
document.querySelector('.user_info + div') 

// 使用 css 选择器的 + 寻找目标元素的下一个元素。
```

## "0级"DOM
 
当阅读与DOM有关的材料时，可能会遇到参考0级DOM的情况。需要注意的是并没有标准被称为0级DOM，它仅是DOM历史上一个参考点（0级DOM被认为是在Internet Explorer 4.0 与Netscape Navigator4.0支持的最早的DHTML）。

未来还会不断随着需求添加属性,值得庆幸的是浏览器厂商在我 大 google 的带领下，对新特性的支持越来越快，我们前端从兼容性的大坑里解放出来，更多去学习研究更深入的东西。