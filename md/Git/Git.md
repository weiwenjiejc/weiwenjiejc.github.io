## git diff



git diff：是查看 workspace（工作区） 与 index（暂存区） 的差别的。
git diff --cached：是查看 index（暂存区） 与 local repositorty（本地仓库） 的差别的。
git diff HEAD：是查看 workspace 和 local repository 的差别的。（HEAD 指向的是 local repository 中最新提交的版本）

```shell script
# 统计哪些文件发生了改变，有多少行产生了改动，并不会给出改动的具体内容
git diff --stat

# 会将代码直接合并，造成冲突等无法知道
git pull


```


* git fetch

  > 相当于是从远程获取最新版本到本地，不会自动merge

  ```shell
  
  #
  git fetch origin master
  
  git log -p master ..origin/master
  ```

* git pull

  > 相当于是从远程获取最新版本并merge到本地，相当于git fetch和git merge

  ```shell
  git pull origin master
  ```

  

![img](images/1249006-20190629161859842-1533387643.png)





git diff，git log中文乱码

>Windows系统的Git默认是不支持中文显示的，需要进行一系列的设置才能避免乱码的出现

