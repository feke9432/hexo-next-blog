---
title: Mac 下的 环境变量 配置
date: 2020-08-09 11:29:21
tags: - mac
categories: mac
---

mac 下的环境变量与 win10 下极为不同，记录一下
<!-- more -->
## Mac系统下的环境变量：
```
a. /etc/profile 
b. /etc/paths 
c. ~/.bash_profile 
d. ~/.bash_login 
e. ~/.profile 
f. ~/.bashrc 
```
其中a和b是系统级别的，系统启动就会加载，其余是用户接别的。c,d,e按照从前往后的顺序读取，如果c文件存在，则后面的几个文件就会被忽略不读了，以此类推。~/.bashrc没有上述规则，它是bash shell打开的时候载入的。这里建议在c中添加环境变量.

## 修改方法

```
open -e <path> // 调用文本编辑器编辑环境变量

vim <paht>     // 命令行工具编辑环境变量
```

## 环境变量自动加载

有时候你会发现重启电脑后环境变量没有生效，`export `打印后发现之前的配置不见了，或者在 `.bash_profile`中的环境变量没有生效，解决办法如下：

```
touch ~/.zshrc

open -e .zshrc

// 写入如下code
source ~/.bash_profile
```

