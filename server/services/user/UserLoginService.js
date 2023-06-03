const CreateToken = require("../../utility/createToken")
const bcrypt = require('bcrypt')

const UserLoginService = async (Request, DataModel) => {

    const {email, password} = Request.body;

    try {
        let data = await DataModel.aggregate([{$match:{email: email}}, {$project:{_id:0,name:1,email:1, password: 1}}])
        if (data.length > 0) {

            bcrypt.compare(password, data[0].password, function (err, result) {
                if (result === true) {
                    let token = CreateToken(data[0]['email'])
                    return {status:"success",token:token,data:data[0]}
                }
                else{
                    return {status: "fail", data: err.message}
                }
            });       
        }else{
            return {status:"unauthorized"}
        }
    } catch (error) {
        return {status: "fail", data: error.toString()}
    }
}

module.exports = UserLoginService