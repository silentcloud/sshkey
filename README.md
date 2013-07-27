# sshkey

将本机的ssh key传入远程服务器，避免以后输入服务器密码登录。

---

## 1. 安装

### 从 npm 安装

    $ npm install sshkey -g

### 从 Github 安装

    $ git clone git@github.com:silentcloud/sshkey.git
    $ cd sshkey
    $ npm install -g

## 2. 命令行配置项

#### -s , --server 必备参数

服务器名称

#### -u , --user  必备参数

登录服务器用户名

#### -a , --user  可选参数，默认为服务器名称

服务器别名

## 3. 实例

    $ sshkey -s 192.168.1.1 -u root -a s192
    root@192.168.1.1's password:****
    Authorized info uploads success!
    please use 'ssh s192' command to login in server!
    $ ssh s192


