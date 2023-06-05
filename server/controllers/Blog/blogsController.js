const DataModel = require("../../models/Blog/blogsModel")
const CreateService = require("../../services/common/CreateService")
const DeleteService = require("../../services/common/DeleteService")
const DetailsByIDService = require("../../services/common/DetailsByIDService")
const ListOneJoinService = require("../../services/common/ListOneJoinService")
// const ListService = require("../../services/common/ListService")
const UpdateService = require("../../services/common/UpdateService")


exports.CreateBlog = async (req, res) => {
    let Result = await CreateService(req, DataModel)
    res.status(200).json(Result)
}

exports.UpdateBlog = async (req,res ) => {
    let Result = await UpdateService(req, DataModel)
    res.status(200).json(Result)
}


exports.BlogList=async (req, res) => {
    let SearchRgx = {"$regex": req.params.searchKeyword, "$options": "i"}
    let JoinStage={$lookup: {from: "users", localField: "AuthorEmail", foreignField: "email", as: "Author"}}
    let projection = {$project: { _id: 1,Title: 1,Description: 1,AuthorEmail: 1 ,CreatedDate: 1 ,Author: { $arrayElemAt: ['$Author.name', 0] }}}
    let SearchArray=[{Note: SearchRgx},{'Author': SearchRgx},{"Title": SearchRgx}, {"Description": SearchRgx}]
    let Result=await ListOneJoinService(req,DataModel,SearchArray,JoinStage, projection);
    res.status(200).json(Result)
}


exports.DeleteBlog = async (req, res) => {
    let Result = await DeleteService(req, DataModel)
    res.status(200).json(Result)
}

exports.BlogDetailsByID = async (req, res) => {
    let JoinStage={$lookup: {from: "users", localField: "AuthorEmail", foreignField: "email", as: "Author"}}
    let projection = {$project: { _id: 1,Title: 1,Description: 1,AuthorEmail: 1 ,CreatedDate: 1 ,Author: { $arrayElemAt: ['$Author.name', 0] }}}
    let Result = await DetailsByIDService(req, DataModel, JoinStage, projection)
    res.status(200).json(Result)
}