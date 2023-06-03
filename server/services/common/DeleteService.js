

const DeleteService = async (Request, DataModel) => {
    try {
        const DeleteID = Request.params.id
        const AuthorEmail=Request.headers['email'];

        let QueryObject={};

        QueryObject['_id']=DeleteID;
        QueryObject[AuthorEmail]=AuthorEmail;

        const Delete = await DataModel.deleteMany(QueryObject)
        return {status: "success",Delete:Delete}

        
    } catch (error) {
        return {status: "fail", data: error}
    }
}

module.exports=DeleteService