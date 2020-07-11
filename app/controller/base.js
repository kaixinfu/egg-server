'use strict'

const Controller = require('egg').Controller

class BaseController extends Controller {
  success(data) {
    this.ctx.body = {
      code: 200,
      success: true,
      data,
    }
  }
  message(message) {
    this.ctx.body = {
      code: 200,
      message,
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
