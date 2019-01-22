---
title: node.js 操作 excel 文件
date: 2018-05-08 20:16:36
tags: node.js
categories: 服务端--node
---

看到公司小行政每次统计人员出入表格很辛苦，毕竟5万多数据，纯人工还是很费劲的，索性花一下午给写个机器自动化读取 :)

至于为什么不把出入登记写成 wabapp 方便使用。。。这个需要权限，小技术还是不得瑟了。

<!-- more -->

# [node-xlsx](https://github.com/mgcrea/node-xlsx)

读取 excel 文件采用了 node-xlsx 这个库。

常用api：

```
// import node-xlsx
var xlsx = require('node-xlsx');

// Parse a file
const workSheetsFromFile = xlsx.parse(`${__dirname}/myFile.xlsx`);
// 数据结构形如 data structure
[
    { // sheet 1
        name: '表名',
        data: [
            [...每一行的数据],
            ['单元格1', '单元格2', '单元格3' ...],
            ['合并单元格就显示一个'],
        ]
    },
    { // sheet 2
        ... // 同上
    }
]

// Build a file
const data = [[1, 2, 3], [true, false, null, 'sheetjs'], ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
var buffer = xlsx.build([{name: "mySheetName", data: data}]); // Returns a buffer
```

读取到的数据类似 Build 要传入的数据，是数组嵌套数组，第一层是表格，下一层就是表格内的每条数据，空格不会计入数组。

拿到数据后我们继续处理。

# 初步处理

因为读取到的数据非常零散，不方便阅读，所以第一步做了如下设计：

```
var objs = {
    'id': {
        '日期': {
            LNum: 0, // 午餐次数
            WCNum: 0, // wc次数
            SNum: 0, // 抽烟次数
            DNum: 0, // 晚餐次数
            ANum: 0, // 单天总出入次数
            LunchTime: ['出入格式 出时间点', '出入格式 入时间点'], // 午餐出入时间记录
            DinnerTime: ['出入格式 出时间点', '出入格式 入时间点'], // 晚餐出入时间记录
            WCTime: ['出入格式 出时间点', '出入格式 入时间点'], // wc 出入使时间记录
            STime: ['出入格式 出时间点', '出入格式 入时间点'], // 抽烟出入时间记录
        }
    }
}
```

按日期设统计数据，首先收集到基础的进出次数，然后统计到每种方式的进出时间点到数组。

但在正式开始写代码前，第一件事其实是过滤无效数据，真不能高看人的智商4万4的数据，实际有效的只有三万9，百分之十就是人的出错率；

## 计算时间差值是否超过规定

单独拿出判断出入时间是否超时的逻辑，首先判断类型，每种类型的超时时间不同，然后排除所有上大号的数据；

用出入计算时间差，但实际会有人有只输入出，或者只输入入的情况，行政说一般这样的就直接pass；

思考这里的逻辑后给出如下代码：

```
var flagtime = '';
var chaonum = {num: 0, mins: [], all: arr};
var lastChuR = '';
for ( let i = 0; i < arr.length; i ++) {
    var isIn = arr[i].split(' ')[0] == 'C';
    var type = arr[i].split(' ')[0];
    var time = arr[i].split(' ')[1]
    var isDa = true;
    lastChuR = type;
    
    if (type == 'WC') {
        isDa = arr[i].split(' ')[2] ? false : true;
    }
    if (lastChuR != type) {
        isDa = false;
    }
    if (isIn ) {
        flagtime = time;
    } else if (i != 0 && isDa) {
        var num = shijianjian(time, flagtime);

        if (type == 'L' || type == 'D') {
            if (num > 35) {
                chaonum.num ++;
                chaonum.mins.push(num);
            }
        } 

        if (type == 'S' || type == 'WC') {
            if (num > 10) {
                chaonum.num++;
                chaonum.mins.push(num);
            }
        } 
    }
}
```

1. 如果：`C C R C R` 多余一次是出，那临时时间保留 `flagtime` 就会被下次 c 覆盖，就 pass 了，
2. 如果：`R C R C R` 多余一次是入，而且在开头，那时间处理函数返回字符串或NaN，显然不会大于1，就不会计入超时，就pass了，
3. 如果：`C R R C R` 多余一次是入，而且在中间，这时候判断上次是否和这次相同，相同就pass。

事实上主要逻辑就是判断时间是否超时，其他一些数据拼接就不过多赘述，可以点此查看[源代码](./2018-05-08-node-excel/main.js)

