---
title: 检查 ip 或域名被墙的几种方法
date: 2018-03-03 14:12:41
tags: cmd
categories: 常用软件
---

所谓被墙了，又称 GFW （Great Friewall of China) 中国防火墙长城，指的是被中华人民共和国政府在其管辖因特网内部建立的多套网络审查系统拉黑了，禁止访问了。

虽然一般而言被墙都是 GFW 干的，但也不排除有人恶意破坏。
<!-- more -->
## 那如何判断自己的域名或者 ip 被墙了呢？

### 路由分析法

打开本机 cmd ，输入 `tracert <域名 | ip>`，比如我们测试使用 Facebook 的域名。

![](./01.jpg)

我们知道互联网就是由一个有一个路由器互相连接来互通有无的，你请求的数据往往不是一对一直达，而是分好几次传输，最终到你的机器上。

`tracert` 命令就是用来追踪一级一级的路由地址的，一般来说，无论是被GFW屏蔽的还是网站封IP的，我们总是能查到这个网站的IP地址。

上图看到查询出 Facebook 的 ip 地址，`8.7.198.45` 归属地为美国，而我们的请求在第四条开始就一直超时，最后一条恰好是在国内，显然就是被 GFW 拦截了。

另外，如果在一堆中国ip中出现个异类，一查是国外ip，那你的网络就可能是被 DNS 劫持了。

![](./02.jpg)

### VPN ping 法

登录墙外的 VPN ，`ping <域名 | ip>` ，然后国内再 ping 一下，如果墙外可以，国内不可以，那就是被墙了。
