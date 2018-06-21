---
title: 用 node.js 做一个简单的统计系统
date: 2018-04-03 20:53:38
tags: node
categories: 服务端--node
---

今天领导让在活动页里添加一段统计代码测试跑得流量是否可靠，然后给了一个某平台的账号，类似于傻瓜式的在合适的位置加了一句话，工作就结束了，恰好之后的时间没事做，索性自己写了一个简易版本练手。

<!-- more -->

# 准备工作

1. 一个安装好 node.js 和 express 和 forever 的 linux 的服务器。  
2. 一个开放权限的端口。  
3. 一张数据库表

**注释** ：暂时只建了一张表，记录用户的：ip、归属地（三级）、来源网站，以及自动生成的数据记录时间。

# 建站及连接数据库

直接使用 express 的生成器建站，站内安装 mysql 模块，然后封装连接 mysql 数据库的函数：

表名被单独

```
var sql_config = {   // 配置链接信息
    host: '***',  // 数据库地址，一般在本地
    user: '***',        // 用户名
    password: '***',    // 密码
    database: '***'     // 数据库名
}
// 输入 sql 语句，和处理函数，给处理函数传入数据。
function conect_sql(sql_msg, cb) {
    var connection = mysql.createConnection(sql_config); // 表名
    connection.connect();
    connection.query(sql_msg, (err, rows, fields) => {
        if (err) throw err;
        cb(rows);
        connection.end();
    });
}
```

新建了一个 api.js 文件用来专门存放我们的接口逻辑代码。

在 app.js 里引用 ： 

```
var express = require('express');
var app = express();
...
var api = require('./routes/api');
app.use("/api", api);

```

这样引用后，之后我们的接口比如 `/getData` ，就要加上前缀 api，外部实际访问就是 `http/https://` + `我们的域名或ip` + `api` + `getData`.

# 统计接口

做好准备工作后再编写接口其实就非常容易了。由于要获取归属地，这里我们使用网易的接口，：

```
// 统计接口 添加ip归属地
router.get('/saveNext', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    var str = req.connection.remoteAddress;
    var user_ip = str ? str.split(':')[str.split(':').length - 1] : '';

    request.get(`http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip=${user_ip}`, (err, resR, body) => {
        body = JSON.parse(body);

        var country = body.country || "";
        var province = body.province || "";
        var city = body.city || ""; 

        var member_ip = deletGang(req);

        var sql_msg = `INSERT INTO ${tabe_name} (url_id,  member_ip, ip_country, ip_province, ip_city) VALUES ("${member_ip}","${user_ip}", '${country}', "${province}", "${city}");`;

        conect_sql(sql_msg, function () {
            res.send('success');
        });
    });
});
```