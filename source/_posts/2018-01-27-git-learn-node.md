---
title: 有关 git 的学习笔记
date: 2018-01-27 18:51:25
tags: git
categories: 版本管理--git
---

学习使用 git 管理项目版本，使用 github 做远程仓库保管代码已经很久了，但一直没有成建制地记录 git 相关知识点，所谓不动笔墨不读书，特地开一篇新博文记录些基础知识，以及实际使用过程中遇到的问题。
<!-- more -->
## 基础

首先还是推荐大神的文章[《git-简明指南》](http://rogerdudler.github.io/git-guide/index.zh.html)，这几乎是我见过的直观的简洁的git教程。

## 常用指令

如果你是第一次学习git，那我建议你创建一个github项目仓库边学边练。

* git 全局配置

```
git config -global user.name "feke9432"
git config -global user.email "feke9432@gmail.com"
```

* 创建文件夹
```
mkdir test
```

* 切换到 test
```
cd test
```

* 新建readme.md
```
touch readme.md
```

* 新建仓库
```
git init
```

* 查看仓库信息
```
git status
```

* 检出仓库（下载别人的仓库里的代码）
```
git clone [地址 || 别人的远程地址]
```

* 添加远程仓库
```
git remote add orgin 远程地址
```

* 添加改动到缓存区
```
git add <filename>
```

* 将文件移除缓存区
```
git rm --cached filename
```

* 删除 文件
```
rm test.txt
```

* 我一般直接添加全部改动
```
git add . || git add *
```

* 提交到head 区(本地仓库)，并提交改动注释
```
git commit -m"改动注释信息"
```

* 推送改动到远端服务器，比如github
```
git push origin master
```

* master 是主分支，如果你想推送其他分支
```
git push origin 其他分支名
```

* 如果你想要切换到其他分支使用
```
git checkout 分支名
```

* 如果还分有分支，要新建
```
git branch 分支名
```

* 你当然也可以一步解决创建到切换
```
git checkout -b 分支名
```

* 如果你要删除一个分支
```
git branch -d 分支名
```

* 如果你想删除一个远程分支
```
git push origin --delete total-router
```

* 如果你想要查看现有分支,不输入具体分支名就好
```
git branch
```

* 如果你想将自己的工作内容提交到主分支上的话
```
git merge 分支名
```

* 从远端获取最新改动
```
git pull
```

* 如果提示你合并或者获取产生冲突，你可以查看冲突
```
git diff
```

* 如果你想为项目标记版本标签
```
git tag 版本号 提交id的前十位
```

* 如果你不知道提交id,打印本地记录查找id
```
git log
```

* 如果你只需要最简信息，用于版本回退
```
git reflog
```

* 你当然也可以只看某一个人的提交记录
```
git log --author=用户名
```

* 压缩输出,每条一行
```
git log --pretty=online
```

* 如果你想回退版本
```
git reset --head 版本id
```

* 如果你想回退远程版本
```
git reflog //=> 获取 id
git reset --head 版本id // => 先回退本地版本
git push -f // => 强制推送本地版本到远程，也就是说远程没有回退，实际是强制推送了旧版本
```

* 切换远程分支协议 (ssh => http)
```
git remote -v  // 查看当前协议内容
git remote set-url origin 新连接
git remote -v // 再次查看切换是否成功
```

* http 协议时免密操作
```
git config --global credential.helper store  // 永久记住密码
git config –global credential.helper cache // 默认记住15分钟
git config credential.helper ‘cache –timeout=3600’ // 定义配置记住1小时
```

### git => everything up-to-date 解决
隔了三天灭有上传博客文件，突然不能提交了。。。求助谷歌后，可能是git认为我的改动已经上传过了，但实际我没有。。。

解决办法简单来说就是：新建分支，上传到新分支，然后回主分支合并刚刚新建的分支到主分支就可以上传了，最后记得删除无用侧分枝。

#### 简单代码步骤
git check -b newBranch => git add . => git commit -m"some thing" => git checkout master => git merge newBranch => git branch -d newBranch
