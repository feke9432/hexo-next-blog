---
title: CSS 渐变属性
date: 2018-05-03 10:22:35
tags: css
categories: 前端--css
---

让我们继续去追求炫丽的视觉效果。记录渐变色属性用法。

<!-- more -->

# 背景图片渐变

## 1. 线性渐变 linear-gradient

由一边或一角沿着直线渐变色，就是 linear-gradient ，语法：

```
.linear-gradient {
    background: linear-grandient([方向/角度 默认上下,] 颜色1 占比, 颜色2 占比,....)
}
```

通过一些数值调整，其实可以做好多有意思的效果，但真正想要美观，那就需要设计师的美感了。。。

![](./01.jpg)

```
background: linear-gradient(147.967deg, rgb(153, 0, 0) 19.3%, rgb(51, 51, 51) 38.6%, rgb(238, 238, 238) 10%, rgb(51, 51, 51) 45%);
background: linear-gradient(180deg, #990000 60%, #333 71%, #eee 82%, #333 95%); 
```

另一方面，想要多设置角度时，可以这样写:

![](./02.jpg)

```
background: linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 60.71%),
            linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 60.71%),
            linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 60.71%);
```

## 2. 重复线性渐变 repeating-linear-gradient

在线性渐变的基础上加一些重复，
