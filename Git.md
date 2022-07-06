


# 配置

## 设置
```
git config --global user.name "weiwenjiejc"
git config --global user.email "1941796841@qq.com"
```

## 查看

```
git config --global -l
```


登陆方式

1. https，需要输入账号密码
2. git，不需要输入用账号密码


git 

```
ssh-keygen -t rsa -C "1941796841@qq.com"
```
结果
```
Generating public/private rsa key pair.
Enter file in which to save the key (/home/wwj/.ssh/id_rsa):
Created directory '/home/wwj/.ssh'.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/wwj/.ssh/id_rsa.
Your public key has been saved in /home/wwj/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:Ct+q7wMtkMHf1nY+S82PouuMzASfSnprP6WYGbNyzyk 1941796841@qq.com
The key's randomart image is:
+---[RSA 2048]----+
| .               |
|  o              |
|   + . .         |
|  o . o o .      |
|   .oo .So o     |
|    ==.+. + o    |
|    .X*o.. o o   |
|  .oE*+=  o . .  |
|  .=+O%+=o .     |
+----[SHA256]-----+
```

把生成公钥添加GitHub中

验证
```
ssh -T git@github.com
```


git --version



```

git init


git remote add origin https://github.com/weiwenjiejc/weiwenjiejc.github.io.git
```


## git remote

```
git remote -v
```
结果
```
origin	https://github.com/weiwenjiejc/weiwenjiejc.github.io.git (fetch)
origin	https://github.com/weiwenjiejc/weiwenjiejc.github.io.git (push)
```

修改url
```
git remote set-url origin git@github.com:weiwenjiejc/weiwenjiejc.github.io.git
```


## git pull

```
git pull <remote> <branch>
```

## git branch

```
git branch --set-upstream-to=origin/<branch> master
```


GIT_USER

USE_SSH

