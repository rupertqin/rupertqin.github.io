---
layout: post
title: 通过SSH自动附加到tmux会话并保持连接
tags: ssh tmux
---

## 通过SSH自动附加到tmux会话

我已经使用tmux作为 screen 替换了一段时间。我发现使用和配置比 screen 更容易。我倾向于在我管理的服务器上运行一个tmux会话，以便一切都像上次连接时一样。这是非常方便。

为了使这更方便，我希望能够在使用SSH连接到服务器时自动附加到正在运行的 tmux 会话 。SSH客户端已经能够在连接时运行命令。它的工作原理是这样的：

    ssh <hostname> <command>

不幸的是，这没有工作，当我试图附加到一个 tmux 会话。

    ssh <hostname> tmux a 
    not a terminal

经过一番谷歌搜索，结果，你需要提供 `-t` 选项的 ssh 命令。ssh手册页描述了这样的选项：


`-t` 强制伪分配。这可以用于在远程机器上执行任意基于屏幕的程序，这可以是非常有用的，例如当实现菜单服务时。

如果我们这样做就对了：

    ssh <hostname> -t tmux a

为了使命令更短，我已经~/.bash_profile为我连接到的每个服务器添加了bash别名 ，像这样：


    alias servername="ssh servername -t tmux a"

现在，我可以输入 servername 并获取到 servername 的 SSH 连接，并自动附加 tmux。发出一个 <ctrl> + b + d 将断开 tmux 会话并断开SSH连接。

是不是很方便！

## SSH 保持连接
SSH 到服务器过一段时间不再操作，就会断掉连接：

    connection to port 22 broken pipe

你可以在本地机器或服务器上设置 keepalive。

在客户端 `/etc/ssh/ssh_config` 设置 ServerAliveInterval 或 在服务器计算机的 `/etc/ssh/sshd_config` 设置 ClientAliveInterval。如果仍然收到错误，请尝试减少间隔。

比如，可以在你本地的机器上 Linux：`/etc/ssh/ssh_config`  或 Mac： `~/.ssh/config` 设置， ：

    Host *
    ServerAliveInterval 120

这是设置多少秒钟内，它应该发送一个 keepalive 消息到服务器。

