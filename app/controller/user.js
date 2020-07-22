'use strict'

const BaseController = require('./base')
const md5 = require("md5")
const jwt = require("jsonwebtoken")
const hashSalt = "kaixin@"
const createRule = {
  email: { type: 'email' },
  nickname: { type: 'string' },
  passwd: { type: 'string' },
  captcha: { type: 'string' },
}
class UserController extends BaseController {
  async login() {
    const { ctx, app } = this
    const { email, passwd, captcha, emailCode } = ctx.request.body
    if (captcha.toUpperCase() !== ctx.session.captcha.toUpperCase()) {
      return this.error('验证码错误', 400)
    }
    if (emailCode !== ctx.session.emailCode) {
      return this.error('邮箱验证码错误', 400)
    }
    const user = await ctx.model.User.findOne({email, passwd: md5(passwd + hashSalt)})
    if (!user) {
      return this.error('用户名密码不存在', 400)
    }
    // 将用户的信息加密成token,返回
    let token = jwt.sign({_id: user._id, email}, app.config.jwt.secret, {
      expiresIn: "1h", // 过期时间
    })    
    this.success({token, nickname: user.nickname, email})
  }
  async register() {
    const { ctx } = this
    try {
      ctx.validate(createRule)
    } catch (err) {
      return this.error('参数校验失败', 400, err.errors)
    }
    const { email, nickname, passwd, captcha } = ctx.request.body
    if (captcha.toUpperCase() !== ctx.session.captcha.toUpperCase()) {
      this.error('验证码错误', 400)
    }
    // 校验邮箱是否重复
    let isEmailRepeat = await this.checkEmail(email)
    if (isEmailRepeat) {
      this.error('邮箱重复了', 400)
    } else {
      // 用户入库        
      let user = await ctx.model.User.create({
        email, nickname, passwd: md5(passwd + hashSalt)
      })
      if (user._id) {
        this.message({message: "注册成功"})
      }
    }
  }
  async verify() {

  }
  async checkEmail(email) {
    const user = await this.ctx.model.User.findOne({email})
    return user
  }
  async info() {
    const { ctx } = this
    const {email} = ctx.state;
    let user = await this.checkEmail(email)
    this.success({...user._doc})
  }
  async detail() {
    const { ctx } = this
    const {email} = ctx.state;
    let user = await this.checkEmail(email)
    this.success({...user._doc})
  }
}

module.exports = UserController
