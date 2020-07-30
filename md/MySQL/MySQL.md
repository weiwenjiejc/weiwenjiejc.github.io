# 安装

## centos安装

下载地址

[centos下载地址](https://dev.mysql.com/downloads/ "下载")

[yum 安装](https://dev.mysql.com/downloads/repo/yum/)

https://repo.mysql.com//mysql80-community-release-el7-3.noarch.rpm

查看系统版本

```shell
# cat /etc/redhat-release
CentOS Linux release 7.6.1810 (Core)

# ls -l /etc/redhat-release
lrwxrwxrwx. 1 root root 14 Mar  7  2019 /etc/redhat-release -> centos-release

# ls -l /etc/*-release
-rw-r--r--. 1 root root  38 Nov 23  2018 /etc/centos-release
-rw-r--r--. 1 root root 393 Nov 23  2018 /etc/os-release
lrwxrwxrwx. 1 root root  14 Mar  7  2019 /etc/redhat-release -> centos-release
lrwxrwxrwx. 1 root root  14 Mar  7  2019 /etc/system-release -> centos-release

# rpm -q centos-release
centos-release-7-6.1810.2.el7.centos.x86_64

```



```shell
rpm -Uvh mysql80-community-release-el7-3.noarch.rpm

[root@VM-0-3-centos ~]# yum repolist all | grep mysql
mysql-cluster-7.5-community/x86_64 MySQL Cluster 7.5 Community   disabled
mysql-cluster-7.5-community-source MySQL Cluster 7.5 Community - disabled
mysql-cluster-7.6-community/x86_64 MySQL Cluster 7.6 Community   disabled
mysql-cluster-7.6-community-source MySQL Cluster 7.6 Community - disabled
mysql-cluster-8.0-community/x86_64 MySQL Cluster 8.0 Community   disabled
mysql-cluster-8.0-community-source MySQL Cluster 8.0 Community - disabled
mysql-connectors-community/x86_64  MySQL Connectors Community    enabled:    165
mysql-connectors-community-source  MySQL Connectors Community -  disabled
mysql-tools-community/x86_64       MySQL Tools Community         enabled:    115
mysql-tools-community-source       MySQL Tools Community - Sourc disabled
mysql-tools-preview/x86_64         MySQL Tools Preview           disabled
mysql-tools-preview-source         MySQL Tools Preview - Source  disabled
mysql55-community/x86_64           MySQL 5.5 Community Server    disabled
mysql55-community-source           MySQL 5.5 Community Server -  disabled
mysql56-community/x86_64           MySQL 5.6 Community Server    disabled
mysql56-community-source           MySQL 5.6 Community Server -  disabled
mysql57-community/x86_64           MySQL 5.7 Community Server    disabled
mysql57-community-source           MySQL 5.7 Community Server -  disabled
mysql80-community/x86_64           MySQL 8.0 Community Server    enabled:    193
mysql80-community-source           MySQL 8.0 Community Server -  disabled


# 修改为mysql57
# 可以使用命令修改，也可以直接修改文件

# 命令修改
yum-config-manager --disable mysql80-community
yum-config-manager --enable mysql57-community
# 确认是否是要安装的版本
yum repolist enabled | grep mysql
mysql-connectors-community/x86_64    MySQL Connectors Community              165
mysql-tools-community/x86_64         MySQL Tools Community                   115
mysql57-community/x86_64             MySQL 5.7 Community Server              444


# 文件修改
cd /etc/yum.repos.d


# 开始安装
yum install mysql-community-server
```

