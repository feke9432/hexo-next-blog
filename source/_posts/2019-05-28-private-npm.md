---
title: Linux 使用 sinopia 搭建远端私有仓库
date: 2019-05-28 11:02:30
tags: 
  -npm
  -linux
---

记录一次 Linux 环境使用 sinopia 搭建远端私有仓库。更新自 *2019-12-24*

<!-- more -->

## 环境准备

系统版本 CentOS 7.6.1810

* nodejs
* npm 
* pm2 

**注：**如果你没有搭建过，可以参考这篇文章[linux centos 服务器 配置 node.js](https://feke9432.github.io/2017/12/24/2017-12-24-linux-node/) 的 安装 nodejs 部分

## 安装 sinopia

```
npm i sinopia -g
```

安装好后测试启动 sinopia 


```
sinopia
```

如果显示如下命令为成功：

```
warn  --- config file - /root/.config/sinopia/htpassw
warn  --- http address - http://localhost:4873/
```

## 使用 pm2 守护 sinopia 进程

```
pm2 start `which sinopia`
```

也可以安装插件 `sinopia-pm2-starter` 来启动

```
npm install -g sinopia-pm2-starter

sinopia-pm2-starter --help 
sinopia-pm2-starter config:host '0.0.0.0' 
sinopia-pm2-starter config:post ${port} 
sinopia-pm2-starter start 
```

启动后可以测试一下是否连接成功，我这里使用的远程服务器，所以直接输入网址加端口即可访问

![](./0.jpg)

如果你也是远程服务器，但无法访问，检查以下项：

1. 是否开启网络安全组及防火墙的端口限制

2. 检查 sinopia 设置，在配置文件末尾添加：

```
// 找到配置文件
$ sinopia 
warn  --- config file  - /root/.config/sinopia/config.yaml

// 进入修改模式
$ vi /root/.config/sinopia/config.yaml

// 按下 a 键开始编辑，并在文件末尾添加，保存退出后重启 sinopia
listen: 0.0.0.0:4873
```

## 在刚建立的私有云上管理包

1. 生成包并上传

```
npm init 
# 填写相应信息

npm adduser
注册账户

npm login
登录

npm publish
上传包

npm unpublish <package>@<version>
删除包


```

## 发布包的坑

> 1. 如果你是自己公司的私有仓库，可在 `package.json` 中配置仓库地址，以免去来回切换仓库的麻烦

```json
...

"publishConfig": {
  "registry": "http://xxxx/"
},

...
```



## 参考文章列表

1. [用sinopia搭建内部npm服务](https://www.cnblogs.com/czf-zone/p/6860457.html)

## 常见问题

1. 全局安装了 sinopia , 但执行启动命令显示没有命令：

```
-bash: sinopia: command not found
```

大抵是环境变量没有配好的原因，设置一个通用的环境变量就好：

```
echo -e "export PATH=$(npm prefix -g)/bin:$PATH" >> ~/.bashrc && source ~/.bashrc

上面的命令中使用 npm prefix -g 获取node安装目录
```

2. 补充一个在 `Sonatype Nexus` 上建立仓库的方法：

[nexus 上搭建npm本地服务器](https://www.jianshu.com/p/9085f47726a2)

核心就是建立三个仓库：1. npm host 2. npm proxy 3. npm group

proxy 放 淘宝仓库，不知道可以 `nrm ls` 看一眼，然后 group 里加入 另外两个

操作流程是 上传包（publish）到 host 里，

外侧要么使用 group 的仓库，要么：

```
npm i 你的包 --registry=https://你的仓库
```

cnpm 同理