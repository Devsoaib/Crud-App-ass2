const OTPSModel = require("../../models/Users/OTPSModel")
const SendEmailUtility = require("../../utility/sendEmailUtility")


const UserVerifyEmailService = async(Request, DataModel) => {
    try {
        let email = Request.params.email
        let OTPCode = Math.floor(100000 + Math.random() * 900000)

        let UserCount = await DataModel.aggregate([{$match: {email: email}}, {$count: "total"}])

        if (UserCount.length > 0) {
            //OTP insert
            await OTPSModel.create({email: email, otp: OTPCode})

            //send Email
            const SendEmail = await SendEmailUtility(email, `your OTP code is ${OTPCode}`, "Soaib's blog PIN Verification")

            return {status: "success", data: SendEmail}
        }
        else{
            return {status: "fail", data: "No User Found"}
        }
    } catch (error) {
        return {status: "fail", data: error.toString()}
    }
}

module.exports = UserVerifyEmailService