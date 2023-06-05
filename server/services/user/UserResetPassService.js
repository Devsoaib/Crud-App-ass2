const OTPSModel = require("../../models/Users/OTPSModel");
const bcrypt = require('bcrypt')



const UserResetPassService = async (Request, DataModel) => {
    let email = Request.body['email'];
    let OTPCode = Request.body['OTP'];
    let NewPass =  Request.body['password'];
    let statusUpdate=1;

    try {

        const OTPUsedCount = await OTPSModel.aggregate([{$match: {email: email, otp: OTPCode, status:statusUpdate }}, {$count : "total"}])

        if (OTPUsedCount.length>0) {
            // Database Second Process
            //hashed password
            const hashedPass = await bcrypt.hash(NewPass, 10);
            let PassUpdate = await DataModel.updateOne({email: email},{password: hashedPass})
            return {status: "success", data: PassUpdate}
        }

        else {
            return {status: "fail", data: "Invalid Request"}
        }

    } catch (error) {
         return {status: "fail", data: error.toString()}
    }
}

module.exports = UserResetPassService