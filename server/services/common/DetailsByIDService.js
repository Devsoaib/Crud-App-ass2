const { default: mongoose } = require("mongoose");

const DetailsByIDService = async (Request, DataModel, JoinStage, projection) => {
    try {
        const DetailsID = Request.params.id
        const AuthorEmail = Request.headers['email']

        const ObjectId = mongoose.Types.ObjectId;
        let QueryObject = {}
        QueryObject['_id'] = new ObjectId(DetailsID)
        QueryObject['AuthorEmail']=AuthorEmail;

        
        let data = await DataModel.aggregate([
            {$match: QueryObject},
            JoinStage, 
            projection
        ])

        return {status: "success", data: data}
    } catch (error) {
        return {status: "fail", data: error.message}
    }
}

module.exports=DetailsByIDService