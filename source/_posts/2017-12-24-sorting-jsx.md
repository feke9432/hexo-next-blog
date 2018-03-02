---
title: 使用js实现几种常见的排序算法
date: 2017-12-24 19:48:14
tags: js
---

## 1. 冒泡排序（Bubble Sort）：

重复的读取数组，两两比较，如果前者大于后者则互换位置:

迭代实现冒泡排序：
<!-- more -->
```
var arr = [1, 55, 23, 53, 647, 234, 77, 12];
BubbleSort(arr);
function BubbleSort(arr) {
    for (var i = 0, len = arr.length; i < len; i++) {
        var one = arr[i];
        var two = arr[i + 1];
        if (one > two) {
            arr[i] = two;
            arr[i + 1] = one;
            BubbleSort(arr);
        } 
    }
    return arr;
}
```

## 2. 选择排序：

每次从数组中选择最小（大）的放在起始位置，然后继续找最小（大）的放在已排序序列的末尾:

```
var arr = [1, 55, 23, 53, 647, 234, 77, 12];
ChoiseSort(arr);
function ChoiseSort(arr) {
    for (var i = 0, len = arr.length; i < len; i++) {
        var minIndex = i;
        for (var j = i+1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j
            }
        }
        var tmep = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = tmep;
    }
    return arr;
}
```

## 3. 插入排序:

把第一个带排序序列第一个元素看做一个有序数列，把第二个元素到最后一个元素当未排序数列，从头到尾扫描未排序数列，将扫描到的每个元素插入有序序列的适当位置。

```
var arr = [1, 55, 23, 53, 647, 234, 77, 12];
InsertSort(arr);
function InsertSort(arr) {
    var preIndex, current;

    for (var i = 0, len = arr.length; i < len; i++) {
        preIndex = i - 1;
        current = arr[i];
        while(preIndex >= 0 && arr[preIndex] > current) {
            arr[preIndex + 1] = arr[preIndex];
            preIndex --;
        }
        arr[preIndex + 1] = current;
    }
    return arr;
}
```