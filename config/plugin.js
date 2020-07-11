/**
 * 该文件是安装的插件进行配置
 */
'use strict'

/** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// }

exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
}
// 路由群组
exports.routerGroup = {
  enable: true,
  package: 'egg-router-group',
}

exports.validate = {
  enable: true,
  package: 'egg-validate',
}
