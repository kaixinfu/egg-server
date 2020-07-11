'use strict'

const BaseController = require('./base')
const createRule = {
  email: { type: 'email' },
  nickname: { type: 'string' },
  passwd: { type: 'string' },
  captcha: { type: 'string' },
}
class UserController extends BaseController {
  async login() {

  }
  async register() {
    const { ctx } = this
    try {
      ctx.validate(createRule)
    } catch (err) {
      return this.error('参数校验失败', 400, err.errors)
    }
    const { email, nickname, passwd, captcha } = ctx.request.body
    if (captcha.toUpperCase() === ctx.session.captcha.toUpperCase()) {
      this.success({ name: 'kaixin' })
    } else {
      this.error('验证码错误')
    }
  }
  async verify() {

  }
  async info() {

  }
}

module.exports = UserController
