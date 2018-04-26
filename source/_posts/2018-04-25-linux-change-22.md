---
title: liunx 服务器做安全措施
date: 2018-04-25 18:30:43
tags: liunx
---

本来想用 wget 下载 mysql 到服务器，提示没有权限，一查原来是 wget 权限被下掉了。。。

服务器还是不能裸奔啊，这里做一次简单的安全措施，记录以防以后再次使用。
<!-- more -->

## 修改 root 账户密码

登录 服务器 ssh 后，输入 `sudu passwd root`，输入两次新密码。

重新登录一下测试是否成功。

## 修改登录端口 

修改之前为了保险起见，先添加端口测试后再删除端口。

```
vi /etc/ssh/sshd_config
# vi打开文件后，按 I键 进入编辑模式，然后按下面的要求添加端口配置，最后按 ESC键 退出编辑模式并输入 :wq 保存并退出vi编辑器。
```

我们在默认的SSH端口配置下面添加一个我们要用的新的端口，例如 23456

```
Port 22
# 默认的22端口配置
Port 23456
# 新添加的 23456端口配置
```

添加后重启ssh ：

```
service sshd restart
```

测试 新端口可用，那就再次进配置文件删除 22 端口，重启 ssh 后就生效了。
 
## 检查 防火墙（iptables） 是否开启

```
$ service iptables status

iptables: Firewall is not running. // 未开启
```

### 记录一些常用命令：

```
查询防火墙状态    :    [root@localhost ~]# service   iptables status
停止防火墙   :    [root@localhost ~]# service   iptables stop
启动防火墙   :    [root@localhost ~]# service   iptables start
重启防火墙   :    [root@localhost ~]# service   iptables restart
永久关闭防火墙    :    [root@localhost ~]# chkconfig   iptables off
永久关闭后启用    :    [root@localhost ~]# chkconfig   iptables on
```

**注意：**：一定要先把ssh端口开了再推出putty。。。血的教训。

### 首先开启ssh端口以及我们开发用的express默认端口3000：

```
/sbin/iptables -I INPUT -p tcp --dport 23456 -j ACCEPT
/sbin/iptables -I INPUT -p tcp --dport 3000 -j ACCEPT
```

然后保存

```
/etc/rc.d/init.d/iptables save
```

启动防火墙，并检查状态：

```
$ service iptables start
... ... ... ... [ok]
... ... ... ... [ok]

$ service iptables status
Table: filter
Chain INPUT (policy ACCEPT)
num  target     prot opt source               destination
1    ACCEPT     tcp  --  0.0.0.0/0            0.0.0.0/0           tcp dpt:3000
2    ACCEPT     tcp  --  0.0.0.0/0            0.0.0.0/0           tcp dpt:23456

Chain FORWARD (policy ACCEPT)
num  target     prot opt source               destination

Chain OUTPUT (policy ACCEPT)
num  target     prot opt source               destination

```

也可以直接修改配置文件：

```
/etc/sysconfig/iptables  
```

但修改完后先重启防火墙再保存配置，因为保存是保存缓存区的东西：

```
service iptables restart
/etc/rc.d/init.d/iptables save
```

看到想要的端口都开了，证明防火墙配置成功，这时候就可以删掉 ssh 的 22 端口了。

### 必要时，删除多余端口

之前测试添加了一条8000端口，现在我们干掉他

首先打印出规则的序号，两种方法：

```
service iptables status
iptables -L -n  --line-number 
```

然后执行删除命令，因为是及时生效的，所以可以直接再次查看：

```
iptables -D INPUT 3
```

