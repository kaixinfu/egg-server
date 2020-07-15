const Service = require("egg").Service
const nodemailer = require("nodemailer");
const path = require("path")
const fse = require("fs-extra")

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
    /**
     * 
     * @param {文件要存储的路径} filePath 
     * @param {文件hash} hash 
     * @param {文件大小} size 
     */
    async mergeFile(filePath, filehash, size) {
        // 切片所在的文件夹
        let chunkdDir = path.resolve(this.config.UPLOAD_DIR, filehash)
        // 给所有切片排序 
        try {
            let chunks = await fse.readdir(chunkdDir)                
            chunks.sort((a, b) => a.split('-')[1] - b.split('-')[1])
            chunks = chunks.map(cp => path.resolve(chunkdDir, cp))
            await this.mergeChunks(chunks, filePath, size)
        } catch(err) {
            console.log("err", err);
        }
    }
    async mergeChunks(files, dest, size) {        
        const pipStream = (filePath, writeStream) => new Promise(resolve => {
            const readStream = fse.createReadStream(filePath)
            readStream.on('end', () => {
                fse.unlinkSync(filePath)
                resolve()
            })
            readStream.pipe(writeStream)
        })
        // 创建一个写的流，依次将读到的流导进去
        await Promise.all(
            files.map((file, index) => {
                // size 必须是整数
                let option = {
                    start: index * size,
                    end: (index + 1) * size
                }                
                pipStream(file, fse.createWriteStream(dest, option))
            })
        )
    }
}

module.exports = ToolsService