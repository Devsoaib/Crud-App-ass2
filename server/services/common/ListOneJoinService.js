
const ListOneJoinService = async(Request, DataModel, SearchArray, JoinStage, projection ) => {
    try {
        let pageNo = Number(Request.params.pageNo);
        let perPage = Number(Request.params.perPage);
        let searchValue = Request.params.searchKeyword;
        let AuthorEmail=Request.headers['email'];
        let skipRow = (pageNo - 1) * perPage;
    
        let data;
    
        if (searchValue !== "0") {
            data = await DataModel.aggregate([
                {$match: {AuthorEmail: AuthorEmail}},
                JoinStage,
                projection,
                {$match: {$or: SearchArray}},
                {
                    $facet: {
                        Total: [{$count: "count"}],
                        Rows: [{$skip: skipRow},{$limit: perPage}]
                    }
                },
                
            ], )
        }
        
        else{
            data = await DataModel.aggregate([
                {$sort: {_id: -1, password: -1}},
                {$match: {AuthorEmail: AuthorEmail}},
                JoinStage,
                projection,
                {
                    $facet: {
                        Total: [{$count: "count"}],
                        Rows:[{$skip: skipRow}, {$limit: perPage}]
                    }
                }
            ])
        }
        return {status: "success", data: data}
    } catch (error) {
        return {status: "fail", data: error}
    }
}

module.exports=ListOneJoinService