# hexo-next-blog

博客配置运行文件

hexo + next[Gemini]

网站之前挂了，果然远程备份还是非常重要的。

写了一个推送脚本：

* 默认你已经设置好 github 密匙操作，如果不会可以参考这篇文章：[配置 Github 密匙](https://feke9432.github.io/2018/04/13/2018-04-13-git-ssh/)

1. 全局安装 `hexo` 

```
$ npm i hexo -g
```

2. 克隆最新 `next` 主题

```
$ git clone git@github.com:iissnan/hexo-theme-next.git themes/next
```

3. 书写文章后执行以下操作即可，一步解决所有问题。

```
$ node run up 
```