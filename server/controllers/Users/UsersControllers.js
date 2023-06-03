const OTPSModel = require("../../models/Users/OTPSModel")
const UsersModel = require("../../models/Users/UsersModel")
const DataModel = require("../../models/Users/UsersModel")
const UserCreateService = require("../../services/user/UserCreateService")
const UserDetailsService = require("../../services/user/UserDetailsService")
const UserLoginService = require("../../services/user/UserLoginService")
const UserResetPassService = require("../../services/user/UserResetPassService")
const UserUpdateService = require("../../services/user/UserUpdateService")
const UserVerifyEmailService = require("../../services/user/UserVerifyEmailService")
const UserVerifyOtpService = require("../../services/user/UserVerifyOtpService")
const bcrypt = require('bcrypt')
const saltRounds = 10;


exports.Registration = async (req,res) => {
    //destructure name, email and password from req.body
    const {name, email, password} = req.body;
   try {

   //required validation
   if (!name.trim()) {
       return res.json({error: "name is required"})
   }
   if (!email) {
       return res.json({error: "email is required"})
   }
   if (!password || password.length < 6) {
       return res.json({error: "password should be at least 6 characters"})
   }

   //check if email is taken
   const existingEmail = await UsersModel.findOne({email});
   if (email === existingEmail) {
       return res.json({error: "email is already taken"})
   }
   //hashed password
   const hashedPass = await bcrypt.hash(password, saltRounds);

   //insert user
   const insertUser = new UsersModel({
       name: name,
       email: email,
       password: hashedPass
   })
   //save user
   const userInserted = await insertUser.save();

   res.status(201).json({status: "success", data: userInserted})

   } catch (error) {
       res.status(500).send({error: error.message})
   }

}

exports.Login = async(req, res) => {
    let Result = await UserLoginService(req, DataModel)
    res.status(200).json(Result)
}
exports.ProfileUpdate = async (req, res) => {
    let Result = await UserUpdateService(req, DataModel)
    res.status(200).json(Result)
}
exports.ProfileDetails = async (req, res) => {
    let Result = await UserDetailsService(req, DataModel)
    res.status(200).json(Result)
}

//Password Recovery
exports.RecoverVerifyEmail = async (req, res) => {
    let Result = await UserVerifyEmailService(req, DataModel)
    res.status(200).json(Result)
}
exports.RecoverVerifyOTP = async (req, res) => {
    let Result = await UserVerifyOtpService(req, OTPSModel)
    res.status(200).json(Result)
}
exports.RecoverResetPass = async (req, res) => {
    let Result = await UserResetPassService(req, DataModel)
    res.status(200).json(Result)
}

