'use strict'

const svgCaptcha = require('svg-captcha')

const BaseController = require('./base')

class UtilController extends BaseController {
  async captcha() {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      hegiht: 50,
      noise: 3,
    })
    // 将验证码存起来，校验
    this.ctx.session.captcha = captcha.text
    this.ctx.response.type = 'image/svg+xml'
    this.ctx.body = captcha.data
  }
  async sendCode() {
    const {ctx} = this
    const email = ctx.query.email
    let code = Math.random().toString().slice(2, 6)
    this.ctx.session.emailCode = code
    const title = "kaixin发给你的验证码"
    const text = ""
    const html = `
    <h1>
      <span>服务器：<a href="http://106.54.179.243:8080/">jenkins</a></span>
      <span>验证码：${code}</span>
    </h1>`
    const res = await this.service.tools.sendEmailCode(email, title, text, html)
    if (res) {
      this.message("发送成功")
    } else {
      this.error("发送失败")
    }
  }
}

module.exports = UtilController
