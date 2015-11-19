---
layout: post
title:  sublime text
tags: za fun
---

## 插件列表：

    QuoteHTML             把HTML拼接成js插入字符串，神器
    ConvertToUTF8         GBK编码兼容
    TrailingSpaces        多余空格标记，强迫症患者福音
    Brackethighlighter    标签对标记

## php Chinese character show as "???"
in st2, `File -> save with Encoding -> UTF-8`

## regular expression search replace & upcase first character
[regular expression search replace in sublime text 2](http://stackoverflow.com/questions/11819886/)

For:

"Hello, my name is bob like eating meat.Hello, my name is rupert like eating noodle."

find what: `my name is (\w)(\w+) like eating (\w)(\w+)`, replace with: `my name is the Great \U$1\E$2 like eating \3\4`

result:

"Hello, my name is the Great Bob like eating meat.Hello, my name is the Great Rupert like eating noodle."
