---
title: 配置 ssh 密匙，免密登录
date: 2020-05-21 13:38:36
tags: 
  - ssh
  - liunx
categories: 服务端--node
---

记录 配置 ssh 密匙登录服务器。
<!-- more -->

测试密匙 （0）

## 生成密匙：
```
// 输入命令后 3 次回车
ssh-keygen -t rsa -C "humingx@yeah.net"
```

成功后，生成两个文件：id_rsa 和 id_rsa.pub,在C:\Users\你的用户名\.ssh，下，这是个隐藏文件夹。

ssh链接服务器后，检查你的密匙目录：

```
$ vim /etc/ssh/sshd_config

// 查找如下参数
AuthorizedKeysFile      .ssh/authorized_keys
```

要保证 .ssh 和 authorized_keys 都只有用户自己有写权限。否则验证无效。

```
$ chmod -R 700 ~/.ssh/
$ chmod 600 ~/.ssh/authorized_keys
```

然后将你本机 id_rsa.pub 文件内容复制到上面的文件里，注意一行一个密匙。

私钥由客户端本地留存。

## 配置 ssh 参数 

`/etc/ssh/sshd_config` 文件打开

修改如下参数：

```
$ vim /etc/ssh/sshd_config

# 禁用root账户登录，非必要，但为了安全性，请配置
PermitRootLogin no

# 是否让 sshd 去检查用户家目录或相关档案的权限数据，这是为了担心使用者将某些重要档案的权限设错，可能会导致一些问题所致。例如使用者的 ~/.ssh/ 权限设错时，某些特殊情况下会不许用户登入
StrictModes no

# 是否允许用户自行使用成对的密钥系统进行登入行为，仅针对 version 2。至于自制的公钥数据就放置于用户家目录下的 .ssh/authorized_keys 内
RSAAuthentication yes
PubkeyAuthentication yes
AuthorizedKeysFile %h/.ssh/authorized_keys

# 有了证书登录了，就禁用密码登录吧，安全要紧
PasswordAuthentication no
```

设置好后重启 ssh 服务

```
// centos 6 
service ssh restart
// centos 7
systemctl restart sshd
```

## 框架需求

1 + n 
一个基本框架，加 n 个组件库，其中 n 有几个集合：

services 主管重复业务逻辑： 

0. 地址
1. 报价
2. 会员价
3. api

。。。

