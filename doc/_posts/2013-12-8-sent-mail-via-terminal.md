---
layout: post
title:  "sent mail via terminal"
tags: za
---

[using macosx lion command line mail with gmail as smtp](http://www.anujgakhar.com/2011/12/09/using-macosx-lion-command-line-mail-with-gmail-as-smtp/)

## via postfix & gmail
`man mail` to see the help

then you could sent email by

`tree /var/www/somefolder | mail -s "contents" your@yourdomain.com`

or

`mail -s "we got a baby" conveyr@qq.com -f alige.bu@163.com` 

then write the content, in the end, leave a singer '.' in a line to sent the mail

