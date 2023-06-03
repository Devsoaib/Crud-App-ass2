const CreateService = async (Request,DataModel) => {
    try {
        const PostBody = Request.body
        PostBody.AuthorEmail = Request.headers["email"]

        const data = await DataModel.create(PostBody)
        return {status: "success", data: data}
    } catch (error) {
        return {status: "fail", data: error}
    }
}

module.exports = CreateService