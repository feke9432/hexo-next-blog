---
title: 抛开宝塔配置node.js服务器
date: 2018-04-19 14:41:05
tags: liunx
categories: 服务端--liunx
---

和公司申请了一台测试用服务器，打算做点什么出来。

之前的服务器都是一键安装宝塔了事，实际使用中发现确实受到了限制，这次尝试抛开宝塔，在纯净的liunx上做开发试试。
<!-- more -->

## 首先安装 node.js

**注意，建立软连接和安装全局文件时 cd 退回根目录再进行操作**

使用 putty 链接到服务器后，尝试使用 wegt 、git 提示都没有安装。检查后发现有安装 yum ，使用yum 安装 git。

```
yum install git
```

打算使用 git 安装 node.js ，失败了，直接下载node.js git文件包，提示我没有运行 updata-server-info，改用 yum。

直接使用`yum install nodejs` 提示我没有安装包，原来**yum安装的本地安装包文件**。

所以首先安装可以获取远程安装包的软件：`wegt`;

```
yum install -y wegt
```

安装成功后，使用 wegt 下载 node.js 安装包，安装包按网上的教程都比较老，我们这里直接到[官网](https://nodejs.org/en/download/)找：

![](./1.png)

```
wegt https://npm.taobao.org/mirrors/node/v10.5.0/node-v10.5.0-linux-x64.tar.xz
```

下载完成后依次解压(如果提示未安装，直接使用 yum install 安装它)

```
xz node-v8.11.1-linux-x64.tar.xz
tar node-v8.11.1-linux-x64.tar
```

接着部署软连接使全局可访问。

```
ln -s /node/node-v8.11.1-linux-x64/bin/node /usr/local/bin/node
ln -s /node/node-v8.11.1-linux-x64/bin/npm /usr/local/bin/npm
```

检查版本号测试软链接是否成功：

```
node -v
npm -v
```

成功打印出版本号就是成功了，接下来安装 express 全局生成器。

## 安装 express 全局生成器。

```
npm install express-generator -g

ln -s /node/node-v8.11.1-linux-x64/bin/express /usr/local/bin/express // 建立全局软连接
```

接下来可以使用 express 生成服务器模板，

```
express server01
cd server01 && npm install // 安装依赖
npm start // 开跑服务器
```

接着在我们自己电脑的浏览器访问 你的ip:3000，看到 Express 字样，就说明服务器已经跑起来了，但一旦关闭 putty ，服务器进程就会停止，接下来我们安装进程守护软件 pm2.

## 安装进程守护软件 pm2.

```
$ npm i pm2 -g
$ ln -s /node/node-v8.11.1-linux-x64/bin/pm2 /usr/local/bin/pm2
```

然后运行 pm2 list 测试安装成功与否。

```
安装
npm install -g pm2

用法
$ npm install pm2 -g     # 命令行安装 pm2 
$ pm2 start app.js -i 4 #后台运行pm2，启动4个app.js 
                                # 也可以把'max' 参数传递给 start
                                # 正确的进程数目依赖于Cpu的核心数目
$ pm2 start app.js --name my-api # 命名进程
$ pm2 list               # 显示所有进程状态
$ pm2 monit              # 监视所有进程
$ pm2 logs               #  显示所有进程日志
$ pm2 stop all           # 停止所有进程
$ pm2 restart all        # 重启所有进程
$ pm2 reload all         # 0秒停机重载进程 (用于 NETWORKED 进程)
$ pm2 stop 0             # 停止指定的进程
$ pm2 restart 0          # 重启指定的进程
$ pm2 startup            # 产生 init 脚本 保持进程活着
$ pm2 web                # 运行健壮的 computer API endpoint (http://localhost:9615)
$ pm2 delete 0           # 杀死指定的进程
$ pm2 delete all         # 杀死全部进程

运行进程的不同方式：
$ pm2 start app.js -i max  # 根据有效CPU数目启动最大进程数目
$ pm2 start app.js -i 3      # 启动3个进程
$ pm2 start app.js -x        #用fork模式启动 app.js 而不是使用 cluster
$ pm2 start app.js -x -- -a 23   # 用fork模式启动 app.js 并且传递参数 (-a 23)
$ pm2 start app.js --name serverone  # 启动一个进程并把它命名为 serverone
$ pm2 stop serverone       # 停止 serverone 进程
$ pm2 start app.json        # 启动进程, 在 app.json里设置选项
$ pm2 start app.js -i max -- -a 23                   #在--之后给 app.js 传递参数
$ pm2 start app.js -i max -e err.log -o out.log  # 启动 并 生成一个配置文件
你也可以执行用其他语言编写的app  ( fork 模式):
$ pm2 start my-bash-script.sh    -x --interpreter bash
$ pm2 start my-python-script.py -x --interpreter python
```

## 配置 ftp 

### 安装 ftp

> 主要参考[Linux平台下快速搭建FTP服务器](https://blog.csdn.net/wantaway314/article/details/52584531)

使用 yum 安装 vsftp ：

```
yum install vsftpd -y
```

安装后可以使用本机的cmd试试是否启动成功，cmd里输入 `ftp 218.93.207.96` ,出现提示用户名输入，说明链接成功。常用 vsftp 命令：

```
启动ftp命令
$ service vsftpd start
停止ftp命令
$ service vsftpd stop
重启ftp命
$ service vsftpd restart
检查Vsftpd服务状态
$ service vsftpd status
```

### 修改ftp配置

修改vi /etc/vsftpd/vsftpd.conf 文件 将下面的注释去掉 ：

```
允许上传文件
Anon_upload_enable=yes 
允许创建文件夹
Anon_mkdir_write_enable=yes 
允许写入
Write_enable=yes
```

### 添加ftp用户

登录Linux主机后，运行命令：”useradd ftpadmin -s /sbin/nologin “。

该账户路径默认指向/home/ftpadmin目录；

如果需要将用户指向其他目录，请运行命令：useradd ftpadmin -s /sbin/nologin –d /opt/test(其他目录)

测试使用 FileZlilla 链接报错：

```
响应:	500 OOPS: cannot change directory:/home/ftpadmin
```

这是因为服务器开启了selinux，这限制了FTP的登录

按提示输入 

```
setsebool -P ftpd_disable_trans 1 
service vsftpd restart 
```

如果出现提示 `Could not change boolean ftpd_disable_trans`

可以尝试输入：

```
setsebool allow_ftpd_full_access  1
setsebool allow_ftpd_use_cifs 1
setsebool allow_ftpd_use_nfs 1
setsebool ftp_home_dir  1
setsebool httpd_enable_ftp_server 1
setsebool tftp_anon_write 1 
```

输入一般没有提示，直接在 ftp 软件中测试链接就好。

如果 ftp 提示 `响应:	553 Could not create file.`

修改文件夹权限就好 `chmod -R 777 path`.

### 在防火墙中添加ftp的端口

添加进出端口，保存后重启防火墙，最后检查防火墙状态：

```
$ /sbin/iptables -I INPUT -p tcp --dport 21 -j ACCEPT 
$ /sbin/iptables -I OUTPUT -p tcp --dport 21 -j ACCEPT
$ /etc/rc.d/init.d/iptables save
$ service iptables restart
$ service iptables status
```

看到21端口顺利开放以后，本地 ftp 软件登陆检查是否顺利访问，成功！

注释：千万不要用外部ftp软件删除文件超多的文件夹，在 ssh 里删除可是快的多。。。

## 安装 mysql
