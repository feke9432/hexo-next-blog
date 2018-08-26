---
title: 为 vscode 配置 vue 及其他后缀名的 文件模板
date: 2018-08-25 22:48:11
tags: vscode
categories: 编辑器
---

每次生成vue文件都要复制一段通用代码，显然很烦，索性直接写到vscode的配置里，其他格式模板操作一样。
<!-- more -->

# vue 模板配置

** 文件 =》 首选项 =》 用户代码片段 ** 

检查有没有 vue 格式，没有就选择 ** 新建全局代码片段文件**，命名为 vue.json；

有则直接选择他。

将以下代码复制进去：

```
{
	"Print to console": {
			"prefix": "vue",
			"body": [
					"<template>",
					" <div class=\"page\">\n",
					" </div>",
					"</template>\n",
					"<script type=\"text/ecmascript-6\">",
					"export default {",
					" data() {",
					" return {\n",
					" }",
					" },",
					" components: {\n",
					" }",
					"}",
					"</script>\n",
					"<style scoped lang=\"stylus\">",
					"</style>",
					"$2"
			],
			"description": "Log output to console"
	}
}
```

你同样可以根据自己的需求进行更改；接下来添加配置项让我们的模板显示出来：

如果你不会：**文件 =》 首选项 =》 设置 ，即可打开左右两个配置文件，左边是默认设置，右面是你的私人配置。

```
// Specifies the location of snippets in the suggestion widget
"editor.snippetSuggestions": "top",
// Controls whether format on paste is on or off
"editor.formatOnPaste": true
```

然后就可以新建一个 vue 后缀的文件检查是否成功: 输入 vue 按 tab 键即可出现我们的模板。