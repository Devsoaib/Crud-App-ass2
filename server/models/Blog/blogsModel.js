const  mongoose=require('mongoose');
const DataSchema=mongoose.Schema({
    AuthorEmail:{type:String},
    Title:{type:String},
    Description: {type:String},
    CreatedDate:{type:Date,default:Date.now()}
},{versionKey:false});
const blogsModel=mongoose.model('blogs',DataSchema);
module.exports=blogsModel