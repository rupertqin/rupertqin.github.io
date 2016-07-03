---
layout: post
title: 在 Mac 上 安装 PHP 开发环境
tags:  php Mac
---

**最近做一个 wordpress 的项目，所有要在 Mac 上安装 PHP 环境，由于我的 Mac 大半年前重新安装过系统，且升到最新的 10.10 系统，安装环境和之前有些差别，也可是过一些坑，记录下来分享一下 ：）**

**本地安装 PHP 开发环境，就是 Apache ＋ PHP ＋ MySQL**

## 开启 PHP 功能和模块

打开 `httpd.conf` 文件

    vi /etc/apache2/httpd.conf

开启 PHP 模块 (取消注释)

    LoadModule php5_module libexec/apache2/libphp5.so

开启 rewrite 模块， 就是和 `.htaccess` 相关的，新版系统默认把此模块关闭 (取消注释)

    LoadModule rewrite_module libexec/apache2/mod_rewrite.so

把 `/extra/httpd-vhosts.conf` 配置虚拟主机的文件包含进来 (取消注释)

    Include /private/etc/apache2/extra/httpd-vhosts.conf

每次修改 apache 文件重启下

    sudo apachectl restart

## 安装 MySql

用 brew 安装 5.6 版本的 mysql

    brew install mysql

安装好之后启动，我电脑平时都不关，不用设置开机启动，直接启动好了

    mysql.server start

最好执行下这个命令，设置安全，密码等等

    mysql_secure_installation

## 数据库图形化操作工具
MySql 的图形化操作工具我用的是 [adminer](http://www.adminer.org/#download), 单个 php, 没有 phpmyadmin 那么大，而且功能还要强大，还支持 pgsql 等等。 这里要注意的是， 登录 MySql 时， host 要填 `127.0.0.1`, 不要填 `localhost`, 至于为什么，我也不知。

## 配置 `VirtualHost`

打开 `/private/etc/apache2/extra/httpd-vhosts.conf`, 以下是配置虚拟主机的例子

    <VirtualHost *:80>
    DocumentRoot "/Library/WebServer/Documents"
    </VirtualHost>

    <VirtualHost *:80>
        DocumentRoot "/Users/rupert/Code"
        ServerName jason.local

        <Directory "/Users/rupert/Code">
                AllowOverride All
                Options Indexes MultiViews FollowSymLinks
                Require all granted
        </Directory>
    </VirtualHost>

当然还要把下面这句加到 `hosts`

    127.0.0.1     jason.local

然后清除 DNS 缓存

    dscacheutil -flushcache

    
## 上传文件限制

PHP 上传文件限制在 `/private/etc/php.in` 配置， 如果没有这个文件， 应该找到 `/private/etc/php.in.default`, 复制过去， 然后在文件中找到 `upload_max_filesize` 和 `post_max_size`， 在此修改

## 附上 `.htaccess` 文件， `ebest-wordpress` 是我的 wordpress 的地址前缀，可以替换也可以删掉

    <IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /ebest-wordpress/
    RewriteRule ^index\.php$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /ebest-wordpress/index.php [L]
    </IfModule>

## 升级MacOS 至 EI CAPITAN 执行 `sudo apachectl configtest` 后遇到提示这个问题：  

    AH00526: Syntax error on line 20 of /private/etc/apache2/extra/httpd-mpm.conf: Invalid command 'LockFile', perhaps misspelled or defined by a module not included in the server configuration.
    
    
    需要把这一段注释掉：
    
    #
    # The accept serialization lock file MUST BE STORED ON A LOCAL DISK.
    #
    <IfModule !mpm_winnt_module>
    <IfModule !mpm_netware_module>
      LockFile "/private/var/log/apache2/accept.lock"
    </IfModule>
    </IfModule>
    
    [el-capitan-apache-error-message-ah00526](http://apple.stackexchange.com/questions/211015/el-capitan-apache-error-message-ah00526)
    
    
    
