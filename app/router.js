'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.home.index)

  // 验证码
  router.get('/captcha', controller.util.captcha)

  router.group({ name: 'user', prefix: '/user' }, router => {
    const { login, register, info, verify } = controller.user
    router.post('/login', login)
    router.get('/info', info)
    router.post('/verify', verify)
    router.post('/register', register)
  })
}
