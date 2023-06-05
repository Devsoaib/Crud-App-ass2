const OTPSModel = require("../../models/Users/OTPSModel")
const DataModel = require("../../models/Users/UsersModel")
const UserDetailsService = require("../../services/user/UserDetailsService")
const UserResetPassService = require("../../services/user/UserResetPassService")
const UserUpdateService = require("../../services/user/UserUpdateService")
const UserVerifyEmailService = require("../../services/user/UserVerifyEmailService")
const UserVerifyOtpService = require("../../services/user/UserVerifyOtpService")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const CreateToken = require("../../utility/createToken")
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
    const {email, password} = req.body;

    try {
        if (!email) {
            return res.json({ error: "Email is required" });
          }
        const user = await DataModel.findOne({email: email});

        if (!user) {
            res.status(404).json({error: "User not found"});
        }
        if (user) {
            let token = await CreateToken(user.email)
            bcrypt.compare(password, user.password, function(err, result) {
                if (result === true) {
                      res.status(200).json({
                        status: "success",
                        token: token,
                        data: user
                      })
                }
                else{
                    res.status(401).json({
                        message: "invalid email or password"
                    })
                }
            });
        }
    } catch (error) {
        res.status(500).send({error: error.message})
    }
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

