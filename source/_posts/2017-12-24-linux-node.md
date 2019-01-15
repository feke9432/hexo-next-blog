---
title: linux centos 服务器 配置 node.js 
date: 2017-12-24 20:02:25
tags: 
    - linux
    - node
categories: 服务端--linux
---

linux centos 服务器 配置 node.js ，目标人群就是和我一样毫无基础的小白。
<!-- more -->
## 准备环境

* 买了国内某云服务器;

* 安装[PuTTY](https://www.putty.org/),输入服务器唯一物理ip后，登录到服务器;

* 使用linux安装了[宝塔面板](https://www.bt.cn/btcode.html)，以及一堆推荐服务。

**注意：安装完成后记得保留账户密码**

[](./0.jpg)

## 开始装 node.js

最开始打算本地电脑下载node安装包，然后上传到linux的，结果下载=》解压=》上传=》非常漫长的时间。。。。

然后直接使用上面 ln 语法建立软连接，报错：

```
-bash: node: command not found
ln: failed to create symbolic link '/tmp/mysql.sock': File exists
...
```

查资料找到一个4年前的帖子：[新手问一个很2的问题…](https://cnodejs.org/topic/53116a24b96ffedc1a005081)

得知因为文件目录过多，部分文件上传失败导致的。

检查目录发现自己上传确实的少了几个，想到也许上传失败了。

各种百度后，发现原来可以直接操作linux服务器下载安装包，下载后直接解压（解压还解压失败一次，各位如果还是遇到上面的问体，不妨删除文件，重新解压试试），速度提高一大截，但问题依旧没有解决，还是各种报错。。。

再回头看看那个帖子，谷歌翻译了一下报错信息：文件已存在，于是想到是不是之前建立软连接干扰了这次安装？

于是：`rm /usr/local/bin/node` ; `rm /usr/local/bin/npm` 删除旧的软连接

重新建立软连接成功安装：

![](./1.png)

### 继续安装 express

```
$ npm install express -gd // 全局安装express 
$ npm install express-generator -g // 全局安装experss生成器
$ ln -s /node/node-v8.9.3-linux-x64/bin/express /usr/local/bin/express // 建立全局软连接
$ express --version // 查看是否安装成功
```

![](./2.png)

### 开个服务器做测试

#### 端口，安全

```
cd node                     // 打开工程目录
express server_01           // 生成项目模板
cd server_01 && npm install // 打开目录并安装依赖
npm start                   // 开始运行程序
```

然后本地访问 `...:3000` ,为啥404了？

百思不得姐，

突然想到现在已经安装了宝塔面板，宝塔帮忙安装了Nginx，是不是产生冲突了？另一方面可以用宝塔测试3000端口啊，

于是，建了一个3000端口的php 站点，测试外网访问服务器的3000端口是可以拿到站点信息的，

删除刚测试用的站点，重新登录linux，运行node服务器，这次成功打印出 express 字眼。

于是想到：**会不会是宝塔建站帮我做了一些配置呢？**

查看宝塔安全管理，果然，3000 端口刚刚被加入可访问序列。

#### 守护进程

运行起服务器，利用宝塔生成一个 ftp 账户用来管理 node 服务器的文件，关掉 PuTTy ，发现服务无法访问了。

想到也许和 window 系统跑 node 一样，开着 cmd 程序运行，不开就停止服务，

查资料后，找到关键字：**“守护进程”**，

node.js 守护进程方法很多,应当按使用场合选择技术：

1. supervisor : 开发环境使用，非常适合调试。
2. forever : 管理多个站点，每个站点访问量不大，不需要监控
3. pm2 : 网站访问量比较大，需要完整的监控界面
4. nohup : 最简单的办法 nohup node app.js &

这里选择了 [forever](https://github.com/foreverjs/forever) ，

跟着教程 `npm install forever -g` ,安装完后发现：

```
forever --help
-bash: forever: command not found
```

联想到之前 express 全局安装后也是手动安装的软连接，也许是某些配置没有配置好？PATH？

再次使用 ln -s 生成软连接：

```
ln -s 你的node目录+/lib/node_modules/forever/bin/forever /usr/local/bin
```

之后就可以全局使用forever了。

打开之前建立的server_01,执行:

```
forever start ./bin/www // express模板跑服务器
```

然后关掉PuTTY也可以访问我们的服务了

#### 常用 forever 命令：
> * forever start test.js|[pid] // 后台开启服务。
> * forever stop test.js|[pid] // 停止后台服务。
> * forever restart test.js|[pid] // 重启后台服务。
> * forever list test.js|[pid] // 打印现有服务。

#### 配置 mysql

之前宝塔面板已经帮我们把 mysql 安装好了,然后我们自己安装 node.js 的 mysql 管理：

```
npm install mysql
```

想要操作数据库先要有库可用，所以我们先用之前安装好的phpMyAdmin新建数据库，做测试所以名字用了test。

![](./3.png)

并且建立一张用户表，三个参数，id，user_name，user_password，并输入一条初始数据

![](./4.png)

然后尝试在我们的node程序中调用数据库:

```
var mysql = require('mysql'); // 引入

var connection = mysql.createConnection({   // 配置链接信息
    host: 'localhost',  // 数据库地址，一般在本地
    user: '...',        // 用户名
    password: '...',    // 密码
    database: '...'     // 表名
}); 
/*
    具体使用时建议封装逻辑，
    先建立链接，query请求数据，
    请求完毕后关闭链接。
*/
connection.connect();
connection.query('SELECT * FROM user', (err, rows, fields) => {
    if (err) throw err;
    console.log(rows);
});
connection.end();
```

简单做一个测试接口看看能否获取数据库信息：

```
router.get('/getUser', (req, res, next) => {
    var connection = mysql.createConnection(mysqlConfig);  // 注意每次查询数据库都需要重新生成链接对象。
    connection.connect();
    connection.query('SELECT * FROM user', (err, rows, fields) => {
        if (err) throw err;
        console.log(rows);
        connection.end();
        res.send(rows)
    });
})
```

浏览器访问服务器ip:3000/getUser,成功打印出信息。 :)

### linux 常用指令

* 鼠标滑动选中目录名，右键鼠标就可以复制了。
* cd dirName 打开文件夹，cd .. 打开上级文件夹
* ls 查看当前文件夹内容
* rm 文件目录：删除对应文件目录；rm -rf 文件目录：删除对应文件目录的文件夹,-r递归删除，-f强行删除，不做提示
* wget 远程路径：下载对应路径文件到当前文件夹。
* xz -d **.tar.xz ：解压xz后缀的压缩文件
* tar -xv -f **.tar : 解压tar后缀的压缩文件。
* ln -s /path_to/bin/node /usr/local/bin/node : 建立软连接，使之可以全局运行，path_to是实际文件夹路径
* echo ：打印某些东西，比如 echo $PATH 打印环境变量
* find 文件路径： 查找文件。
    * -name ： 根据文件名查找
    * -iname : 根据文件名查找文件，忽略大小写
    * -path : 根据路径查找文件
    * -ipath : 根据路劲查找文件，忽略大小写
    * -amin <分钟> : 过去N分钟内访问的文件
    * -atime <天数> ： 过去N天内访问的文件
    * -cmin <分钟> ：过去N分钟内修改过的文件
    * -ctime <天数> : 过去N天内修改过的文件
    * -anewer <参照文件> ： 比参照文件更晚被读取过的文件
* cat /etc/redhat-release ： 查看系统版本
* df : 查看磁盘占用程度
* du -sh * : 查看当前文件夹下各文件及文件夹所占内存
* mv 要复制的目录 复制到的目录: 移动文件夹时要加 -r 递归复制所有文件
* cp 要复制的目录 复制到的目录: 复制文件夹时要加 -r 递归复制所有文件