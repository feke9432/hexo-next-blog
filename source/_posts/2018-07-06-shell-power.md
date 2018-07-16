---
title: 使用 shell 批量改名字、内容、后缀名等
date: 2018-07-06 18:23:03
tags: shell
categories: 服务端--linux
---

维护别人的旧网站，N十个文件改同样的内容，手动改太费劲，这时候，Linux 的 shell 命令就非常方便了。
<!-- more -->

# 引子

先来看一个例子：我打算改每个网页中的“聊天室”改为“在线聊”，有多级**目录**，下名字不同的HTML文件要修改。

1. 当前目录下打开能用 Shell 的命令行，输入下面的命令。

```
find -name \*.html | xargs perl -pi -e 's|聊天室|在线聊|g';
find . -type f -name "*.sh" -exec rm -rf {} \;
```

