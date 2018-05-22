---
title: 记录使用 hexo + next 创建博客的过程及遇到的问题
date: 2018-01-03 16:51:41
tags: 
    - hexo
    - node
---

## 创建博客

### 准备工作

* 安装：[node.js](https://nodejs.org/zh-cn/) 
* 安装：[Git](https://git-scm.com/)
* 创建一个[ github ](https://github.com/)账号
* 如果你在国内，请使用 [cnpm](https://npm.taobao.org/)

<!-- more -->
### 安装 hexo 和 主题 next

找一个你喜欢的位置（比如 D 盘），右键打开 `Git Bash` 输入：

```
$ npm install -g hexo-cli

...

// 出现以下内容代表 hexo-cli 安装成功
+ hexo-cli@1.0.4
updated 1 package in 12.493s
```

接着创建你自己的站点，比如我创建的博客：

```
// hexo init <folder>
$ hexo init myblog
```
最新版本会自动安装依赖。接下来安装 hexo 一款比较漂亮的主题： next

```
$ cd myblog
$ git clone https://github.com/iissnan/hexo-theme-next themes/next
```

完成后打开主站配置文件 ：`_config.yml`，搜索到 `themes`，修改配置项为 `next`:

> **注意：** 配置文件有严格的格式限制，配置任何选项冒号后面有且只有一个空格

```
theme: next
```

此时你可以做一个小测验，在 Git Bash 中输入

```
$ hexo s
```

这是 hexo 自带的本地服务器，会在 4000 端口跑服务，打开浏览器输入 `localhost:4000`，就可以实时预览你的博客了：

![博客预览](./01.jpg)

### 配置 hexo 和 next

#### 配置 next 主题

打开next的配置文件 `./themes/next/_config.yml`，next 提供了四种主题，这里我选择了最后一种：

```
#scheme: Muse
#scheme: Mist
#scheme: Pisces
scheme: Gemini
```

#### 配置文章内图片

hexo 默认不允许加载本地图片，如果你想要加载本地图片你需要：

* 首先修改主配置文件 `post_asset_folder: true`
* 接着安装依赖 `npm install hexo-asset-image --save`

之后每次生成文章页时同时会在文章页目录生成同名文件夹，图片放到此目录后，就可以使用 `![图片提示](/文章名/01.jpg)` 来引用图片了。

#### hexo 主页阅读更多

hexo 默认就可以实现主页阅读更多按钮，只要在你的文章页想要显示的部分下面添加 `<!-- more -->` 就可以了。

#### next 添加标签页

首先新建标签页：

```
$ hexo new page tags
INFO  Created: F:\feke的文件夹\Github\myblog\source\tags\index.md
```

接着打开 `./source/tags/index.md` (此文件就是标签页的配置文件)，修改内容为：

```
---
title: tags
date: 2018-02-27 17:48:33
type: "tags"
---
```

然后编辑 `./themes/next/_config.yml` 主题配置文件，找到 menu 项目，去掉 tags 的注释，然后就可以在文章中添加标签了。

但要注意多个标签时需要换行书写，否则可能会页面丢失，推荐以如下格式书写：

```
// 多个标签正确写法：
---
title: hexo 加 next 主题配置记录
date: 2018-01-03 14:52:41
tags: 
    - js
    - hexo
    - next
---

// 单个标签正确写法：
---
title: hexo 加 next 主题配置记录
date: 2018-01-03 14:52:41
tags: js
---
```

#### 配置使用中文

按文档说要修改 next 主题配置 `language: zh-Hans` ，然后 `hexo clean` 一下; 如果不行的话，就把 `./themes/next/languages/` 文件夹下的 `de.yml` 和 `default.yml` 用中文配置覆盖就行。

### 部署博客到 github 上

因为并没有购买服务器域名，暂时利用 Github 提供的 pages 服务部署博客。

* 首先建立仓库，仓库名需要用 page 要求的固定写法：your_user_name.github.io

* 之后修改主目录配置文件：_config.yml
    ```
    * 这里的 repo 就是仓库地址，要改成自己的
    deploy:

        type: git

        repo: git@github.com:feke9432/feke9432.github.io.git

        branch: master
    ```
* 因为采用了 ssh 方法上传，所以需要上传密匙到 Github 上。[点这里查看具体方法](https://segmentfault.com/a/1190000002645623)

* 然后安装 hexo 上传插件：`npm install hexo-deployer-git --save`

之后更新博客就可以执行以下操作：

* hexo clean
* hexo g
* hexo d

如果 hexo d 失败，可能是你之前已经建立过这个仓库了，删除旧库重新建立就好。

但这样执行三个不知道多久的命令太笨了，如果想一个命令解决问题，可以参考我的另一篇博文：node.js 开发 shell （命令行）程序

