// 解析token的中间件，也可以用egg-jwt，自己封装能更好的的理解其原理
const jwt = require("jsonwebtoken")
module.exports = ({app}) => {
    return async function verity(ctx, next) {
        if (!ctx.request.headers.authorization) {
            ctx.body = {
                code: 401,
                message: "用户没有登录"
            }
            return
        }
        const token = ctx.request.headers.authorization.replace("Bearer ", "")
        try {
            let res = await jwt.verify(token, app.config.jwt.secret)
            ctx.state.email = res.email
            ctx.state.userId = res._id
            await next()
        } catch(err) {            
            if (err.name === "TokenExpiredError") {
                ctx.body = {
                    code: 401,
                    message: "登录失效"
                }
            } else {
                ctx.body = {
                    code: 401,
                    message: "用户信息解析出错"
                }
            }
        }
    }
}