---
layout: post
title:  how to change the value of process.env.PORT
tags: node
---

### For just one run (from the unix shell prompt):
    PORT=1234 node app.js

### More permanently:
    export PORT=1234
    node app.js

### In Windows:
    set PORT=1234

### In Windows PowerShell:
    env:PORT = 1234
