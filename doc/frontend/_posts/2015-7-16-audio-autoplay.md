---
layout: post
title:  audio video 标签在 mobile 设置 autoplay 不起作用
---

*  因为节省带宽的原因才这样设置
*  Audio 和 Video 标签实现播放只有在用户操作之后才能触发(click, touch)
*  所有一个办法是在你的应用中做一个开始按钮（点击之后播放一个初始 audio 文件，当然这个 audio 文件可以很小，甚至也没有声音），然后你可以换其他的 source 文件实现 autoplay, 不过要在同一个 audio 标签内操作才行
