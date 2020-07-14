'use strict'

const svgCaptcha = require('svg-captcha')
const path = require("path")

const BaseController = require('./base')
// 文件扩展的几个命令：移动等
const fse = require("fs-extra")

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
    console.log("captcha ==========: ", captcha.text);
    this.ctx.response.type = 'image/svg+xml'
    this.ctx.body = captcha.data
  }
  async sendCode() {
    const {ctx} = this
    const email = ctx.query.email
    let code = Math.random().toString().slice(2, 6)
    console.log("emailCode ==========: ", code);
    
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
  async uploadFile() {
    const {ctx} = this
    const file = ctx.request.files[0]
    const {name} = ctx.request.body
    // 将文件移动到指定目录
    await fse.move(file.filepath, this.config.UPLOAD_DIR + '/' + file.filename)
    this.success({url: `/public/${file.filename}`})
  }
  async uploadSliceFile() {
    const {ctx} = this
    const file = ctx.request.files[0]
    const {name, hash, chunk} = ctx.request.body

    const chunkPath = path.resolve(this.config.UPLOAD_DIR, hash)
    // 先判断文件是否已经存在
    if (!fse.existsSync(chunkPath)) {
      await fse.mkdir(chunkPath)
    }
    // 将文件移动到指定目录
    await fse.move(file.filepath, `${chunkPath}/${name}`)
    this.message({message: name + "切片上传成功"})
  }
}

module.exports = UtilController
