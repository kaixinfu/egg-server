# egg-server

## 包含

- [x] [egg](https://eggjs.org/zh-cn/intro/quickstart.html)
- [x] [egg-router-group](https://github.com/zzzs/egg-router-group)
- [x] [express](http://www.expressjs.com.cn/)
- [x] [mongodb](http://www.runoob.com/mongodb/mongodb-tutorial.html)
- [x] [nodemailer](http://nodemailer.com/smtp/well-known/)
- [x] [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

## 功能预览
- [√] 生成校验码
- [√] 校验信息、用户注册入库
- [√] 使用jwt生成token、解析token
- [√] 给传过来的邮箱发送验证码
- [√] 普通文件上传方式

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
│   ├── middleware               // 中间件
│   │    └── jwt.js              // 解析token，由解析结果返回不同状态码
│   ├── model               
│   │    └── user.js             // 用户的数据库模型
│   ├── public                   // 存放静态资源
│   ├── router.js                // 路由、路由群组
├── config
│   ├── config.default.js        // 默认配置，比如mongosse地址、jwt.secret，可直接在app.cinfig访问
│   ├── plugin.js                // 第三方插件配置文件，比如egg-router-group，添加后可以直接使用router.group
│   ├── service               
│   │    └── tools.js            // 给邮箱发送验证码
├── package.json                 // 项目依赖文件
</pre>
### 遇到的问题
- [√] invalid csrf token：post请求，egg默认会有校验，config.default.js可以先关掉
- [√] 没有收到传过来的文件：config.default.js里multipart设置接收所有


