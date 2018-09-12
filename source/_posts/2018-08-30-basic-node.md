---
title: 2018-30 面试题记录
date: 2018-08-30 20:22:32
tags: interview
categories: 前端--面试题
---

今天面试了两家，一家主要问项目，另一家非常屌，就问基础，而且由点破面，步步深入，深深地再次震撼了我，就和去年中秋节的北京那家一样。之所以没写公司名字，是没成功，不值得记忆。

<!-- more -->

# 第一家

第一家在上午，各种状态也在巅峰时间，面试很顺利，面试题如下：

1. 设置 `position: absolute; top: 10px;` 时，实际时谁位置发生了变化。

答：相对于最近一级有 position 值 不是 static 的父元素，如果没有，就相对于body元素定位。

2. 数组有哪些方法，插入数组你可以使用什么方法。

为什么数组重要，因为实际开发中，大多数数据处理都以数组为核心，处理都使用数组的方法。

答：

```
1. 合并数组
ArrayObject.prototype.concat([arr1, arr2, arr3 ...]);

// 解法二，参数序列化。
Array.prototype.push.apply([0], [1, 2]);

2. 遍历数组
ArrayObject.prototype.forEach(function (item, index, array){})

3. 添加元素到末尾：
解法一：原生方法push
ArrayObject.prototype.push([node1, node2 ...]);

解法二：es6 数组解构
[..[1,2,3], 4] => [1,2,3,4];

3.1 删除末尾元素：
ArrayObject.prototype.pop(); 

4. 添加元素到开头：
> 解法一，将要添加的元素转化为数组，然后参数序列化，例如：
> Array.prototype.push.apply([0], [1, 2]);
> 
> 解法二，unshift()，例如：
> [1,2,3].unshift(0); => [0,1,2,3];
>
> 解法三，es6，数组结构
> var m = [num, ...arr]

4.1 删除开头元素：
ArrayObject.prototype.shift();

5. 添加元素到某个位置。
Array.prototype.splice(position, numberOfItemsToRemove, item)
// 拼接函数（索引位置，要删除的元素数量，要添加的元素
5.1 实际使用splice还可以删除某个位置的元素，就是不添加，删除一位。

6. 找出某个元素的索引：
ArrayObject.prototype.indexOf(数组中的元素)
如有返回位置，如没有，返回-1

7. 浅复制数组
方法一，切片方法，slice 切全部
arr.slice()

方法二，还是 es6 解构。
var m = [...arr]

7.1 数组的深复制：

没有原生方法，需要自己书写：

方法一，for 循环 + 迭代

function deepCopy(arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (Object.prototype.toString.call(arr[i]).indexOf('array')) {
      var m = deepCopy(arr[i]);
      res.push(m);
    } else {
      res.push(arr[i])
    }
  }
}
```

# 第二家

1. 语义化元素你知道哪些？

答，p 代表段落，article 包裹文章，header 和 footer 是头尾，strong 强调，em 相对较轻强调，nav 代表标签栏等等.

1.1 strong 标签与 p 标签有什么不同

答：一个是行内元素，一个是块级元素。

1.2 那我想给 strong 这样的元素设置高，要如何做？

答： 可以 设置其 line-height ，或者 display：block 后设置高。

1.3 那比如 我想给 strong 设置 padding 和 margin ？

答：行内元素 设置 margin 左右有效，上下无效，padding 设置上下左右都有效，但不会撑开父元素，这时设置背景有可能会与下方文字重叠，此背景的 z-index 低于文字。

2. 实现一个左侧固定，右侧自适应的页面如何做，先只兼容宽度？

答：可以右侧给一个固定的 margin-left ，右侧就可以自动适应宽度了，然后让左侧通过定位浮动等达到做布局的目的。通过浮动达成的布局不会影响右侧元素的展示。

第二种方法：flex 布局

设置其主轴为：flex-direction: row;

左侧设置其项目属性为：flex-grow: 0; 即有空间也不放大。

右侧设置为：flex-grow: 1; 占领剩余空间。

第三种：js 左侧给固定值，右侧用 js 读取剩余空间给赋相应值。

2.1 那比如左侧时一个头像，要保证他一直是正方形，同时保证他一直占三分之一的宽度呢。

答；此时可以通过 padding-top 或者 padding-bottom 设置百分比时依据的是父元素的百分比，让盒子内的图片绝对定位，不占空间，让外侧盒子相对定位并只用 padding-left 撑开盒子，

3. 原型链你应该了解，那如何实现一个继承呢。

答：这个比较复杂，可以查阅《js 高级程序设计》，下面有时间应当写一篇完善的文章处理。

4. 同样问到了 arr ，上面已经包含答案，这里不再赘述。

5. plus(1)(2)(3) === 6 这个函数如何实现。

答：这里实际用到了闭包，绑架上层作用域，保留三个参数。

第一种：es5：

```
function plus (a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    }
  }
}

我在面试时尝试：这样可以省去一个作用域的维持，但面试管说有脱了裤子放屁的嫌疑。。。保存的变量还是3个，实际还是要保存第一个作用域。。。

function plus (a) {
  return function (b) {
    var s = a + b;
    return function (c) {
      return s + c;
    }
  }
}
```

第二种：es6

简洁明快，很美~~

```
var m = a => b => c => a + b + c;
```

