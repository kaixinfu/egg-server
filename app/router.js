'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app  
  const jwt = middleware.jwt({app})
  router.get('/', controller.home.index)

  // 验证码
  router.get('/captcha', controller.util.captcha)
  // 邮箱验证码
  router.get('/sendCode', controller.util.sendCode)
  // 文件上传
  router.post('/uploadFile', controller.util.uploadFile)
  // 删除文件目录
  router.get('/clearPublic', controller.util.clearPublic)
  // 切片文件上传
  router.post('/uploadSliceFile', controller.util.uploadSliceFile)
  // 合并已上传的切片文件
  router.post('/mergeUploadedSliceFile', controller.util.mergeUploadedSliceFile)
  // 检验图片是否已经上传过，或者存在已上传过的切片
  router.post('/checkFile', controller.util.checkFile)
  
  
  router.group({ name: 'user', prefix: '/user' }, router => {
    const { login, register, info, verify } = controller.user
    router.post('/login', login)
    router.get('/info', jwt, info)
    router.post('/verify', verify)
    router.post('/register', register)
  })
}
