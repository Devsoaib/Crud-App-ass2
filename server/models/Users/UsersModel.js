const  mongoose=require('mongoose');
const DataSchema=mongoose.Schema({
    name:{type:String},
    email:{type:String,unique:true},
    password:{type:String},
    createdDate:{type:Date,default:Date.now()}
},{versionKey:false});
const UsersModel=mongoose.model('users',DataSchema);
module.exports=UsersModel
