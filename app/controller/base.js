'use strict'

const Controller = require('egg').Controller

class BaseController extends Controller {
  success(data, message) {
    this.ctx.body = {
      code: 200,
      success: true,
      message,
      result: {...data}
    }
  }
  message({message, code = 200, errors = {}, success = true}) {
    this.ctx.body = {
      code,
      message,
      success
    }
  }
  error(message, code = 200, errors = {}) {
    this.ctx.body = {
      code,
      message,
      errors,
    }
  }
}

module.exports = BaseController
