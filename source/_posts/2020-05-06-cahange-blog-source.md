---
title: 记一次移动博客到自己的服务器
date: 2020-05-06 15:32:52
tags: 
  - linux
  - git
  - hexo
categories: 服务端--node
---

最进国内访问外网越来越差了，所以迁移博客到私人服务器。
<!-- more -->

本文主要参考了 [HEXO 部署到云服务器详细指南](https://www.jianshu.com/p/70bf58c48010)，这里就我自己遇到 问题进行补充。

## 一、环境安装

### 1.1 node js 安装

```
yum -y install nodejs
```
验证：
```
node -v 
npm -v
```

### 1.2 安装git、nginx
Git 用于版本管理和部署，Nginx 用于静态博客托管。
```
yum install git nginx -y
```

### 1.3 安装hexo
我们使用 Node.js 的包管理器 npm 安装 hexo-cli 和 hexo-server

```
npm install hexo-cli hexo-server -g
```

hexo-cli 是 Hexo 的命令行工具，可用于快速新建、发布、部署博客；hexo-server 是 Hexo 的内建服务器，可用于部署前的预览和测试。-g 选项，表示全局安装。

验证：

```
hexo
```

## 二、创建git环境

### 2.1 在云服务器上创建一个 GIT 用户，用来运行 GIT 服务

* 创建用户：`adduser git`
* 设置密码：`passwd git`

### 2.2 创建证书

* 创建.ssh目录: `mkdir /home/git/.ssh && chmod 700 /home/git/.ssh`

* 然后在云服务创建`authorized_keys`公钥保存文件: `touch .ssh/authorized_keys && chmod 600 .ssh/authorized_keys`

公钥保存文件`authorized_keys`是一行添加一个，如果你已经有公钥，可以直接复制进来

### 2.3 创建git仓库目录

创建一个名为blog的git仓库

```
mkdir /var/repo
cd /var/repo
git init --bare blog.git // 添加 --bare 做分享库
```

### 2.4 配置 GIT HOOKS

```
vim /var/repo/blog.git/hooks/post-receive
```
添加：
```
#!/bin/sh
git --work-tree=/var/www/hexo --git-dir=/var/repo/blog.git checkout -f
```
然后保存退出，并设置权限

```
// chmod +x 为文件添加运行权限
chmod +x /var/repo/blog.git/hooks/post-receive
```

### 2.5 改变 BLOG.GIT 目录的拥有者为 GIT 用户

```
chown -R git:git blog.git
```

### 2.6 创建静态文件目录并将2.3步骤生成的git仓库链接到静态文件目录下

创建静态文件目录（文章网页）：`mkdir /var/www/hexo`
切换用户：`su git`，因为推文件时候用的是 git 用户，所以权限要 git 用户设置
链接git仓库：`chown -R git:git /var/www/hexo`
配置权限：`chmod -R 755 /var/www/hexo`
这样git仓库更新便会自动同步到hexo目录下

### 2.7、为了安全考虑，禁用GIT用户的SHELL 登录权限配置（下面两个步骤非常重要，否则客户端总是提示密码错误！！！）

首先你必须确保 git-shell 已存在于 /etc/shells 文件中

使用命令`which git-shell`判断系统是否安装了`git-shell`。如果已经安装，则返回`git-shell`的安装目录，如：`/usr/bin/git-shell`；如果未安装则需要安装git-shell命令，安装命令：`yum install git`

判断shells文件是否存在，判断命令：`cat /etc/shells`

如果文件不存在或没有`/usr/bin/git-shell`，则需要使用vim增加这个路径：
`sudo vim /etc/shells`，在最后一行添加git-shell路径

```
/bin/sh
/bin/dash
/bin/bash
/bin/rbash
/usr/bin/tmux
/usr/bin/screen
/usr/bin/git-shell   # 添加你的git-shell
```

现在你可以使用 `chsh` 命令修改任一系统用户的shell权限了
现在我们修改第一步中创建的git用户的登录权限，禁止git用户使用shell权限：
终端中输入`sudo chsh git`

然后在Login Shell [/bin/bash]: 后输入git-shell路径`/usr/bin/git-shell`

修改完成后验证： `vim /etc/passwd`找到类似`git:x:1000:1000:,,,:/home/git:/usr/bin/git-shell`，看看git用户是否是以git-shell结尾

这样，git用户就只能使用SSH连接对Git仓库进行推送和拉取操作，而不能登录机器并取得普通shell命令

### 2.8 测试

当上述步骤都完成后，我们就可以测试下git服务器是否部署成功，最简单的方法便是使用clone来校验
用户电脑（window or mac）git客户端执行clone操作`git clone git@服务器ip:/var/repo/blog.git`

如果clone成功，表示git服务器搭建成功

## 三、hexo配置

打开hexo博客目录，编辑`_config.yml`文件
修改repository为：

```
deploy:
  type: git
  repository: git@ip或域名:/var/repo/blog.git
  branch: master
```

然后执行`hexo g -d`将文件上传到你部署的服务器上，如果上传成功

## 四、nginx配置

最后，为了能让浏览器能直接访问静态页面，需要使用nginx将端口或域名指向hexo静态文件目录

### 4.1 修改 NGINX 的 DEFAULT 设置

ubuntu
```
vim /etc/nginx/sites-available/default
```

centos
```
vim /etc/nginx/conf.d/
// fedora版本:
vim /etc/nginx/nginx.conf
```

注意：不同版本的nginx或系统，nginx的配置文件不一定相同，根据具体情况来修改配置

### 4.2 将其中的 ROOT 指令指向 /var/www/hexo 目录（也就是GIT钩子目录）

```
server {
    listen 80;
    listen [::]:80;
    root /var/www/hexo; # 修改的地方
    server_name laoyuyu.me www.laoyuyu.me; # 如果需要改域名访问，修改server_name 为域名便可
    location / {
            # First attempt to serve request as file, then
            # as directory, then fall back to displaying a 404.
            try_files $uri $uri/ =404;
    }
}
```

### 4.3 最后重启服务，让NGINX生效

```
service nginx restart 
```

### 4.4 如果你无法打卡页面，或者显示 nginx 403

查看 nginx 日志，路径为`/var/log/nginx/error.log`

我这里报错如下：

```
2020/05/06 15:27:07 [error] 27137#0: *19 open() "/var/www/hexo/index.html" failed (13: Permission denied), client: 43.249.135.118, server: mojunwen.top, request: "GET / HTTP/1.1", host: "www.mojunwen.top"
```

关键字：`Permission denied`

可以通过下面四步排查解决此问题

1. nginx 启动用户错误，

将nginx.config的user改为和启动用户一致：

```
vi /etc/nginx/nginx.conf
#user nginx;
user root;
```

2. 缺少index.html或者index.php文件，就是配置文件中index index.html index.htm这行中的指定的文件

```
cd /var/www/hexo
ls
检查文件
```

3. 权限问题，如果nginx没有web目录的操作权限，也会出现403错误。

```
chmod -R 755 /var/www/hexo
```
