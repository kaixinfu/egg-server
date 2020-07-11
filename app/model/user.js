module.exports = app => {
    /**
     * 用户的数据库模型
     */
    const mongoose = app.mongoose
    const Schema = mongoose.Schema
    
    // select: false, 普通查询查不出来
    const UserSchema = new Schema({
        __v: {type: Number, select: false},
        email: { type: String, required: true },
        nickname: { type: String, required: true },
        passwd: { type: String, required: true, select: false },
        captcha: { type: String, required: false },
        avatar: { type: String, required: false, default: "/user.png" },
    }, {
        timestamps: true, // 会自动添加createTime、updateTime
    })

    return mongoose.model("User", UserSchema)
}