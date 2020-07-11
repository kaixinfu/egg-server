'use strict'

const BaseController = require('./base')
const md5 = require("md5")
const hashSalt = "kaixin@"
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
      // 校验邮箱是否重复
      let isEmailRepeat = await this.checkEmail(email)
      if (isEmailRepeat) {
        this.error('邮箱重复了')
      } else {
        // 用户入库        
        let user = await ctx.model.User.create({
          email, nickname, passwd: md5(passwd + hashSalt)
        })
        if (user._id) {
          this.message({message: "注册成功"})
        }
      }
      // this.success({ name: 'kaixin' })
    } else {
      this.error('验证码错误')
    }
  }
  async verify() {

  }
  async checkEmail(email) {
    const user = await this.ctx.model.User.findOne({email})
    return user
  }
  async info() {

  }
}

module.exports = UserController
