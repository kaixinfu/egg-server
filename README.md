# egg-server

## 包含

- [x] [egg](https://eggjs.org/zh-cn/intro/quickstart.html)
- [x] [egg-router-group](https://github.com/zzzs/egg-router-group)
- [x] [express](http://www.expressjs.com.cn/)
- [x] [mongodb](http://www.runoob.com/mongodb/mongodb-tutorial.html)

## 功能预览
- [√] 生成校验码
- [√] 用户注册入库
- [√] 使用jwt生成token

## 下载项目

```sh
$ git clone https://github.com/timer2/egg-server.git
```
```sh
$ npm install
```
```sh
$ npm run dev
```
## 启动mongo

```sh
$ mongo，use **，show **，db.**，db.**.find() 
```
## 项目结构
<pre>
|── app                          
│   ├── controller               
│   │    └── base.js             // 基类
│   │    └── user.js             // 登录、注册、使用jwt生成token
│   │    └── util.js             // 生成、返回校验码、并存储
│   ├── model               
│   │    └── user.js             // 用户的数据库模型
│   ├── router.js                // 路由、路由群组
├── config
│   ├── config.default.js        // 默认配置，比如mongosse地址、jwt.secret，可直接在app.cinfig访问
│   ├── plugin.js                // 第三方插件配置文件，比如egg-router-group，添加后可以直接使用router.group
├── package.json                 // 项目配置文件
</pre>
### 遇到的问题
- [√] router.group不生效：没有注释掉 module.exports
- [√] invalid csrf token：post请求，egg默认会有校验，config.default.js可以先关掉


