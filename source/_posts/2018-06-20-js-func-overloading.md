---
title: js 中函数的重载
date: 2018-06-20 18:37:47
tags: js
categories: 前端--js
---

偶然看面试题，看到函数的重载，之前一直对函数重载有基本印象，但还是被 jQ 之父的操作惊艳到了，特地记录一下。
<!-- more -->
# 基础

**函数重载的定义**： 多个相同函数名，不同的参数个数或者类型的形式，叫函数的重载。

**函数签名**：函数的名称及其参数个数和类型组合在一起，就定义了一个唯一的特性，称之为函数签名。

一般的语言，例如 java 中就是使用 函数签名 实现函数的重载，接口等。

而在 js 中，函数的参数实际是被包含在 函数对象 上的 名为 arguments 的类数组中，所以可以实现：声明函数时不定义参数，函数却可以调用参数的现象。

```
function sayHello () {
alert("Hello" + arguments[0] + ", " + arguments[1]);
}
sayHello ("baby", "how are you?");
```

参数一 和 arguments[0] 是完全等价的，命名仅仅是为了提供便利。

# 简单实现重载

js 尽管没有签名，但同样可以实现重载，简而言之就是判断参数个数执行不同的逻辑。

```
function overloading () {
    if (arguments.length === 0) {
        // ...一些逻辑...
    } else if (argumnets.length === 1) {
        // ...另一些逻辑...
    } else {
        // ...另一些逻辑...
    }
}
```

# jQ 之父的操作 => 闭包的链式调用。

在JQuery之父John Resig写的《secrets of the JavaScript ninja》提到了一个充分的利用了闭包的特性的绝佳巧妙的方法。

> **闭包**：一个拥有许多变量和绑定了这些变量的环境的表达式（通常是一个函数），因而这些变量也是该表达式的一部分。

```
function addMethod(obj, name, fn) {
    var old = obj[name];

    obj[name] = function () {
        if (fn.length === arguments.length) {
            return fn.apply(this, arguments);
        } else if (typeof old === 'function') {
            return old.apply(this, arguments);
        }
    }
}

var person = {userName: 'feke'}

addMethod(person, 'show', function () {
    console.log(this.userName + '---->' + 'show1')
})
addMethod(person, 'show', function (str) {
    console.log(this.userName + '---->' + str)
})
addMethod(person, 'show', function (a, b) {
    console.log(this.userName + '---->' + (a + b))
})

person.show(); // feke---->show1
person.show('str'); // feke---->str
person.show(1, 2); // feke---->3
person.show(1, 2, 2); // 不执行任何操作
```

简单优雅，很美。。。

1. 首先将上一次的方法缓存下来；
2. 接着重写了对象的方法；
3. 对象的方法里引用了上级的参数，因为之后还有可能调用此参数，所以此次执行的函数作用域在函数执行完毕后依旧不被垃圾回收，也就是闭包；
4. 执行了三次 addMethod 函数，每次执行，都生成自己的作用域；
5. 每个作用域里的 old 变量实际是储存着上次（addMethod）添加的函数；
6. 这里其实是形成了一个隐式的链式调用，通过 old 参数连在一起；
7. 每次执行 show 方法时，都会执行最后添加的方法，也就是两个参数时的方法，但如果输入的参数个数不是两个，那就找上一次的方法，也就是一个参数的方法，以此类推，要么找到参数一样的方法，要么就啥也不执行。

