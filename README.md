# sshkey

将本机的ssh key传入远程服务器，并写入config，避免以后输入服务器密码登录。

---

## 1. 安装

### 从 npm 安装

    $ npm install sshkey -g

### 从 Github 安装

    $ git clone git@github.com:silentcloud/sshkey.git
    $ cd sshkey
    $ npm install -g

## 2. 输入项说明

#### `hostname` 服务器名称

#### `user`  登录服务器用户名

#### `port`  端口

#### `alias`  ssh 别名

## 3. 实例

    $ sshkey
      prompt: hostname:  192.168.1.1
      prompt: user:  root
      prompt: port:  22
      prompt: alias:  local
    root@192.168.1.1's password:****
    Authorized info uploads success!
    please use 'ssh local' command to login in server!
    $ ssh local


