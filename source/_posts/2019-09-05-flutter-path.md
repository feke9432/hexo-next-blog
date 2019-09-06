---
title: flutter 环境搭建
date: 2019-09-05 13:25:13
tags: -flutter
categories: flutter
---

<!-- more -->

**Win10 环境 64位**

## 下载依赖

0. 配置镜像地址

搜索 > 控制面板 > 系统 > 高级系统设置 > 系统环境变量 :

新建系统变量 `PUB_HOSTED_URL` 值 `https://pub.flutter-io.cn`
新建系统变量 `FLUTTER_STORAGE_BASE_URL` 值 `https://storage.flutter-io.cn`

1. git 下载 flutter

```
git clone -b stable https://github.com/flutter/flutter.git
```

---

2. 安装 java 

链接：[https://pan.baidu.com/s/15xsR_WphXC6Na1YdnrioXg]
提取码：f680 

配置环境变量

```
JAVA_HOME = 你的安装路径
CLASSPATH = .;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar;

path 添加：
%JAVA_HOME%\bin;
%JAVA_HOME%\jre\bin;
```

---

3. 安装 Android Studio

下载：[http://www.android-studio.org/] 官网就很快

一路下一步，注意至少安装一个系统SDK，后面新建模拟器用。

---

4. docker 检查一下

下载完成后 找到flutter安装目录，运行 `flutter_console.bat` => `flutter doctor`，查看是否所有环境都已完成：

```
Doctor summary (to see all details, run flutter doctor -v):
[√] Flutter (Channel master, v1.9.8-pre.54, on Microsoft Windows [Version 10.0.17763.678], locale zh-CN)

[√] Android toolchain - develop for Android devices (Android SDK version 29.0.2)
[√] Android Studio (version 3.5)
[√] VS Code (version 1.38.0)
[√] VS Code, 32-bit edition
[√] Connected device (1 available)

• No issues found!
```

---

5. 新建一个项目试试看，我这里是用的 vs Code

`CTRL + SHIFT + p`, 搜索 flutter ，选择 `Flutter New Project`，输入项目名称（全小写），选择项目文件夹，之后等待出现 `main.dart` 就是成功了，

在编辑器底部栏找到 `No Device` 按钮，这里你可以选择新建一个安卓模拟器，或者连接真机调试。

我这里使用的小米8，小米系统这里有个坑，在开发者模式里不能只勾选调试模式，还要勾选允许调试模式安装 APP。

链接成功后，如果没有问题，按 F5，就可以开始开发了

---

```mermaid
flowchat
st=>start: Start|past:>http://www.google.com[blank]
e=>end: End:>http://www.google.com
op1=>operation: My Operation|past
op2=>operation: Stuff|current
sub1=>subroutine: My Subroutine|invalid
cond=>condition: Yes
or No?|approved:>http://www.google.com
c2=>condition: Good idea|rejected
io=>inputoutput: catch something…|request
st->op1(right)->cond
cond(yes, right)->c2
cond(no)->sub1(left)->op1
c2(yes)->io->e
c2(no)->op2->e
```