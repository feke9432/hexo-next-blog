---
title: vue-cli 项目中 使用 cdn 加速第三方包
date: 2020-05-22 11:07:53
tags: - js
categories: 前端--js
---

不墨迹
<!-- more -->

1. 首先找到第三方 cdn 地址

国内比较多的是 [BootCDN](https://www.bootcdn.cn/) 但免费的么，经常挂，**实际不推荐在公司的生产环境使用**

比如我这里找的是 pdf.js 的地址：

<https://www.bootcdn.cn/pdf.js/>

2. 找到项目中的 html 文件，添加依赖：

```
...
<div id="app"></div>
<script src="https://cdn.bootcdn.net/ajax/libs/pdf.js/1.3.198/pdf.js"></script>
...
```

3. 修改 `vue.config.js` 配置文件：

```
configureWebpack: {
  externals: {
    'pdfjs-dist': 'pdfjsDistBuildPdf' // 这里 key 是项目中引用的名字，val 是上面引入文件暴露出的全局变量
  },
}
```

到此就可以在项目中使用了，但实际不推荐使用外部 cdn ，搜索文章也可以发现，从18年开始，使用cdn加速的文章几乎绝迹，究其原因就是18年 bootcdn 服务器挂了一次，自此以后被坑断腿的开发者就开始拒绝使用了

但这个技术是有意义的，免费 cdn 不靠谱，可以使用靠谱的 付费 cdn，或者干脆使用自己搭建的 cdn，分开加载较大的依赖包，可以环境主服务器的压力。