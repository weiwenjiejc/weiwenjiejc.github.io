![image-20200727091315303](images/image-20200727091315303.png)



图片2
![image-20200727095018582](images/image-20200727095018582.png)


### node usage

```shell script
# 查看版本信息
node -v
```


# npm管理器

> 默认全局安装位置C:\Users\wei\AppData\Roaming\npm\node_modules，C:\Users\wei\AppData\Roaming\npm

* npm install -g，全局安装
* npm install，默认下载到当前命令行所在的目录

```shell
# 安装bootstrap
npm install -g bootstrap

npm install -g jquery
```



```shell
[C:\~]$ npm config ls
; cli configs
metrics-registry = "https://registry.npmjs.org/"
scope = ""
user-agent = "npm/6.14.5 node/v12.18.2 win32 x64"

; builtin config undefined
prefix = "C:\\Users\\wei\\AppData\\Roaming\\npm"

; node bin location = D:\Program Files\nodejs\node.exe
; cwd = C:\Users\wei\Documents\NetSarang Computer\6\Xshell\Sessions
; HOME = C:\Users\wei
; "npm config ls -l" to show all defaults.


[C:\~]$ npm config get prefix
C:\Users\wei\AppData\Roaming\npm

```
### nmp命令
>npm（Node Package Manager）意思是 node 的包管理器

```shell script
# 配置命令
# Usage:
npm config set <key> <value>
npm config get [<key>]
npm config delete <key>
npm config list [--json]
npm config edit
npm set <key> <value>
npm get [<key>]
npm config ls -l
npm config ls

```

```shell script
# 安装到当前命令行所在的目录
npm install module(要安装的模块名)

# 安装到全局目录
npm install -g module(要安装的模块名)

# 查看全局安装目录
[C:\~]$ npm config get prefix
C:\Users\wei\AppData\Roaming\npm

# 查看版本信息
npm -v
```



```shell script
# 常用安装
npm install -g jquery

npm install marked
```