Linux httpd命令是Apache HTTP服务器程序。

httpd为Apache HTTP服务器程序。直接执行程序可启动服务器的服务。



/var/www目录只有安装了apache服务器才会有。



```shell
[root@VM-0-3-centos html]# systemctl status httpd
● httpd.service - The Apache HTTP Server
   Loaded: loaded (/usr/lib/systemd/system/httpd.service; disabled; vendor preset: disabled)
   Active: inactive (dead)
     Docs: man:httpd(8)
           man:apachectl(8)
[root@VM-0-3-centos html]# systemctl enable httpd
Created symlink from /etc/systemd/system/multi-user.target.wants/httpd.service to /usr/lib/systemd/system/httpd.service.
```



```shell
[root@VM-0-3-centos html]# systemctl start httpd
[root@VM-0-3-centos html]# systemctl status httpd
● httpd.service - The Apache HTTP Server
   Loaded: loaded (/usr/lib/systemd/system/httpd.service; enabled; vendor preset: disabled)
   Active: active (running) since Sun 2020-07-26 19:51:56 CST; 6s ago
     Docs: man:httpd(8)
           man:apachectl(8)
 Main PID: 9829 (httpd)
   Status: "Processing requests..."
   CGroup: /system.slice/httpd.service
           ├─9829 /usr/sbin/httpd -DFOREGROUND
           ├─9830 /usr/sbin/httpd -DFOREGROUND
           ├─9831 /usr/sbin/httpd -DFOREGROUND
           ├─9832 /usr/sbin/httpd -DFOREGROUND
           ├─9833 /usr/sbin/httpd -DFOREGROUND
           └─9834 /usr/sbin/httpd -DFOREGROUND

Jul 26 19:51:56 VM-0-3-centos systemd[1]: Starting The Apache HTTP Server...
Jul 26 19:51:56 VM-0-3-centos httpd[9829]: AH00558: httpd: Could not reliably determine the server's fully qualified domai...essage
Jul 26 19:51:56 VM-0-3-centos systemd[1]: Started The Apache HTTP Server.
Hint: Some lines were ellipsized, use -l to show in full.

```

