---
layout: post
title:  "install node in ubuntu"
date:   2013-08-22 16:00:40
categories: ubuntu
---

## Install nodejs
[stackoverflow](http://stackoverflow.com/questions/2424346/getting-error-while-running-simple-javascript-using-node-framework)  
If Node.js installation as suggested by ninja works for you (like on AWS Ubuntu):

```bash
sudo apt-get update  
sudo apt-get install python-software-properties    
sudo add-apt-repository ppa:chris-lea/node.js    
sudo apt-get update  
sudo apt-get install nodejs
``` 

you might still want to add node to your system path like this:

`export PATH=/usr/bin/:$PATH`  

so you can type

`node webapp.js`  

instead of

`/usr/bin/node webapp.js`  
Find your node installation path simply by typing

`which node`