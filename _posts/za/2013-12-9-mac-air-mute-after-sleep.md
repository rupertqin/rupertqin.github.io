---
layout: post
title:  "mac air sound is mute after sleep"
categories: za
tags: mac air sound
---

## mac air mute after sleep
[2013款MBA发现在升级安装Maverick后，休眠->唤醒，系统会没有声音](http://v2ex.com/t/87156)

__ways 1:__

```bash
sudo kextunload /System/Library/Extensions/AppleHDA.kext
sudo kextload /System/Library/Extensions/AppleHDA.kext
```

__ways 2:__

1. open up activity monitor
2. search for coreaudio
3. kill!
