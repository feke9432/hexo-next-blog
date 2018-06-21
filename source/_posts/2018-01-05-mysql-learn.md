---
title: mysql 基础语法学习
date: 2018-01-05 19:29:03
tags: mysql
categories: 服务端--mysql
---

## mysql 数据库 sql语句学习
<!-- more -->
### 清除表数据：

|sql 语句|	例子|	区别|
|----|-|-|
|drop table 表名称|	drop tabel dbo.Sys_Test	|去除整个表|
|truncate table 表名称|	truncate table dbo.Sys_test	|清空id值|
|delete from 表名称 where 列名称 = 值|	delete from dbo.Sys_Test where test = ‘test’	|删除某一行|

### 查询表：

```
// 基础查询
SELECT * FROM 'table_name'; // 查询全部

// 分页查询 LIMIT
select * from table_name limit 0,10  // limit 是mysql自有函数 查询第几到第几条

// WHERE 筛选
SELECT id FROM `table_name`  
WHERE key=value;            // 查询某个值限定的id值，用来查看这个限定条件的数据量

// DISTINCT 关键字
SELECT DISTINCT member_ip FROM `table_name` // 使用 DISTINCT 关键字去除搜索值重复项
WHERE key=value;                            // 注意，搜索多个值时，多个值都相同才会被排除

// GROUP BY 关键字
SELECT member_ip, id FROM table_name   // 多个搜索项时 
WHERE key=value
GROUP BY member_ip;

// GROUP BY 关键字 DESC/ASC 
SELECT member_ip, id FROM table_name   // 多个搜索项时 
WHERE key=value
GROUP BY member_ip DESC; // 依据 menber_ip 倒叙排列数据， ASC 就是正序

// 时间查询
SELECT * FROM `table_name`    // 查询的是大于 2018-01-11 0分0秒的数据
WHERE time_key > '2018-1-11 00:00:00';

// 查询同值多个结果,使用 in 语句，可选多个值
SELECT * FROM `table_name` WHERE key IN (value1, value2,....);

// 查询多个值 AND 缩小范围，OR 扩大范围
SELECT * FROM `table_name` WHERE key1=value1 AND key2=value2;
```

### 插入表：

```
INSERT INTO tabe_name (key1, key2....) VALUES (val1, val2.....)
```

### 一些性能问题

有一张表，大概94万的数据，我只查id 使用 WHERE 和大于号筛选今天内的数据，查询到40万条，花了47.582s，加了 GROUP BY 后延长到了70.461s，
时间真是太久了，于是便想着也许可以优化一下。