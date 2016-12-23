---
layout: post
title:  我是怎么解决这几天遇到的 Bug 的？
tags: bug
---

最近遇到几个 Bug, 过程曲折，总结下还是有点意义的

## Macvim 升级后用不了
vim 还是可以用的， 好在用 `mvim` 启动程序有如下信息：

```
Fatal Python error: Py_Initialize: unable to load the file system codec
ImportError: No module named 'encodings'

Current thread 0x00007fffc6a2e3c0 (most recent call first):
Vim: Caught deadly signal ABRT
Vim: Finished.
```

搜索下说是和 brew 安装 python 有关，试了下他们说的方法，还是解决不了，奇怪的是我另一台电脑也升级了却没有问题，我两台电脑共享了很多配置，几乎一样。
如果照网上提供的方法设置，照道理我另一台电脑也应该出现问题的。然后我发现那台电脑上的 python3 是 3.5.12, 而出问题的是 3.5.11, 最后升级到 3.5.12 就好了！

## Dockerfile RUN 不支持多行命令

```Dockerfile
RUN apt-get update && apt-get upgrade -y \
    && apt-get install -y curl wget git make sudo \
```

就是不技能这样的多行写法，但是我发现别人的 Dockerfile 就是这么写的啊，是不是我这个写法姿势有问题？ 然后搜索怎么多行写。
然后在别的机器也装一下，机智地用了不同的 docker 版本，因为发现有问题的机器上是 Beta 版本， 还是用试下稳定版本的吧。。。 最后果然又是版本问题！