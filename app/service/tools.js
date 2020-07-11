const Service = require("egg").Service
const nodemailer = require("nodemailer");

const userEmail = "15713857919@163.com"
const transporter = nodemailer.createTransport({
    service: "163",
    secureConnection: true,
    auth: {
        user: userEmail,
        pass: "liukaixin123"
    }
})
class ToolsService extends Service {
    async sendEmailCode(email, subject, text, html) {
        var message = {
            from: userEmail,
            cc: userEmail, // 抄送
            to: email,
            subject,
            text,
            html
          };
        try {
            await transporter.sendMail(message)
            return true
        } catch(err) {
            console.log("email.error: ", err);
            return false
        }
    }
}

module.exports = ToolsService