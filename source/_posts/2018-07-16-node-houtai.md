---
title: node.js mysql 增删改查语句记录
date: 2018-07-16 11:44:52
tags: 
  -node
  -mysql
  -linux
categories: 服务端--mysql
---

一个简单，对应多个站点的公告管理后台系统，后台使用 express，前台使用 vue 全家桶，element-UI.

<!-- more -->
# mysql 语句记录

为了可复用性，所以统一将表名放到配置里，每次取用使用 `tablelist[typeNum]` 来取；

表的设计也遵循唯一自增标示为 `id` ；

1. 向表里添加信息：

```
var fields='';
var values='';

var options = req.body;

for( var k in options){
  fields+=k+',';
  values=values+"'"+options[k]+"',"
}

fields=fields.slice(0,-1);
values=values.slice(0,-1);

var sqlConfig="INSERT INTO " + tablelist[typeNum] + '('+fields+') VALUES('+values+')';
```

2. 删除表里的信息：
```
var id = req.query.id;
var sqlConfig = `DELETE FROM ${tableName} WHERE id=${id};`
```

3. 修改表里的信息：

```
var fields='';
var tableName = tablelist[typeNum];

var options = req.body;

for( var k in options){
  if (k != 'id') {
    fields += k + '=' + options[k] +',';
  }
}

fields=fields.slice(0,-1);

var sqlConfig=`UPDATE ${tableName} SET ${fields} WHERE id =${options['id']} `;
```

4. 查询信息：

* 如果简单的差所有信息很简单：

```
var sqlConfig = `SELECT * FROM ${tableName}`;
```

* 但考虑到数据量非常大的情况下，一般要使用分页查询:

mysql 的 limit 函数，第一个值为从那一条开始，而我们需要的是分页数据，所以一般计算一下开始（`start`） 值，

比如第一页(`pageIndex=1`)，就是从第 0 条数据开始；

第二页，如果每页10条（`pageCount=10`），则开始（`start`） 值为 1 * 10 = 10；

为什么不是 11 ？因为程序员的 1 从 0 开始。。。

```
var pageIndex = req.query.pageIndex? parseInt(req.query.pageIndex): 1;
var pageCount = req.query.pageCount? parseInt(req.query.pageCount): 10;
var tableName = tablelist[typeNum];

var start = (pageIndex - 1) * pageCount; 

var sqlConfig = `SELECT COUNT(*) FROM ${tableName}; SELECT * FROM ${tableName} order by id DESC limit ${start},${pageCount};`;
```