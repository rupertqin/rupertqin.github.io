---
layout: post
title: 如何方便的通过 SSH 和 Tmux 组合管理服务器会话并一直保持连接不断掉
tags: ssh tmux
---

我已经使用 tmux 作为 screen 替换了一段时间。我发现使用和配置比 screen 更容易。我倾向于在我管理的服务器上运行一个 tmux 会话，以便一切都像上次连接时一样，这就非常方便啊！还有就是，如果通过 SSH 操作线上服务器，只要几分钟不操作，连接断掉我们还得重新连一遍，非常的烦人。

![SSH Connection Lost!](http://upload-images.jianshu.io/upload_images/1821767-b0c53a3af582fe64.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

不过我们是有方法可以通过 SSH + Tmux 的组合，管理线上服务器的 session, 从而让我们的操作不再丢失～ 

## 通过SSH自动附加到tmux会话

为了使这更方便，我希望能够在使用 SSH 连接到服务器时自动附加到正在运行的 tmux 会话 。SSH客户端已经能够在连接时运行命令。它的工作原理是这样的：

    ssh <hostname> <command>

不幸的是，这个命令并没有发挥作用，当我试图附加到一个 tmux 会话：

    ssh <hostname> tmux a 
    not a terminal

经过一番谷歌搜索，结果，你需要给你的 ssh 命令加上 `-t` 选项 。ssh手册页描述了这样的选项：


`-t` 强制伪分配。这可以用于在远程机器上执行任意基于屏幕的程序，这可以是非常有用的，例如当实现菜单服务时。

如果我们这样做就对了：

    ssh <hostname> -t tmux a

### 更短的命名

为了使命令更短些，我已经 `~/.bash_profile` 或 `~/.zshrc` 为我连接到的每个服务器添加了 bash 别名 ，像这样：


    alias myaliyun="ssh myaliyun -t tmux a"

现在，我们就可以在命令行输入 `myaliyun` 就可以连到我们的服务器了，并且自动进入一个 tmux session 中。不过也要记住，只要发出一个 <ctrl> + b + d 就会断开 tmux 会话并断开SSH连接，对的，这个操作会断开所有连接！

## SSH 保持连接
SSH 到服务器过一段时间不再操作，就会断掉连接：

    connection to port 22 broken pipe

你可以在本地机器或服务器上设置 keepalive。

在客户端 `/etc/ssh/ssh_config` 设置 ServerAliveInterval 或 在服务器计算机的 `/etc/ssh/sshd_config` 设置 ClientAliveInterval。如果仍然收到错误，请尝试减少间隔。

比如，可以在你本地的机器上 Linux：`/etc/ssh/ssh_config`  或 Mac： `~/.ssh/config` 设置， ：

    Host *
    ServerAliveInterval 120

这是设置多少秒钟内，它应该发送一个 keepalive 消息到服务器，这样就再也不会断开了，是不是很方便！

