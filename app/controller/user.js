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
    console.log('dsajkhjkdsa,...........')

    const { ctx } = this
    try {
      ctx.validate(createRule)
    } catch (err) {
      return this.error('参数校验失败', 400, err.errors)
    }
    const { email, nickname, passwd, captcha } = ctx.request.body
    console.log('ctx.request.body', ctx.request.body)
    this.success({ name: 'kaixin' })

  }
  async verify() {

  }
  async info() {

  }
}

module.exports = UserController
