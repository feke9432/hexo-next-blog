---
title: node.js 使用 request 模块
date: 2018-05-13 20:22:18
tags: node
---

每次请求数据都要查 request 的相关文章，根据事不过三原则，这样查过三次的资料整理成文章记录下来，加深记忆，方便查阅。

<!-- more -->

以下是一些常用的接口，如果想了解更多，你同样可以查阅[官方文档](https://github.com/request/request)

# 安装

```
$ npm i request 
```

# get 请求

推荐直接用省略写法，默认请求方式为 get；

```
var request = require('request');
request('http://www.baidu.com', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the baidu homepage.
  }
})
```

## get 请求参数处理

我们知道 get 请求参数一般都是挂到 url 上的，这时候我们就可以使用 node.js 为我们提供的 url 模块处理参数：

```
var url = require('url');

var params = url.parse(req.url, true).query; // 将字符串 url 转成 object 格式，使用 url.parse
```

# POST application/json

application/json 格式文件 请求数据放在 body 参数下。

```
request({
    url: url,
    method: "POST",
    json: true,
    headers: {
        "content-type": "application/json",
    },
    body: JSON.stringify(requestData)
}, function(error, response, body) {
    if (!error && response.statusCode == 200) {
    }
}); 
```

# POST application/x-www-form-urlencoded

application/x-www-form-urlencoded 格式表单请求格式参数放到from参数下：

```
request.post({
    url:'http://service.com/upload', 
    form:{key:'value'}
    }, 
    function(error, response, body) {
    if (!error && response.statusCode == 200) {
    }
})
```

# POST multipart/form-data

formData可以直接放key-value格式的数据，也可以放buffer，或者是通过流描述的文件。

```
var formData = {
    // Pass a simple key-value pair
    my_field: 'my_value',
    // Pass data via Buffers
    my_buffer: new Buffer([1, 2, 3]),
    // Pass data via Streams
    my_file: fs.createReadStream(__dirname + '/unicycle.jpg'),
};
request.post({url:'http://service.com/upload', formData: formData}, function (error, response, body) {  
    if (!error && response.statusCode == 200) {
    }
})
```