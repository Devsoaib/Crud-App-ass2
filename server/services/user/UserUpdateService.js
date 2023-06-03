const UserUpdateService = async (Request, DataModel) => {

    try {
        let data = await DataModel.updateOne({email: Request.headers["email"]}, Request.body)
        return {status: "success", data: data}
    } catch (error) {
        console.log(error.message);
        return {status: "fail", data: error.toString()}
    }
}

module.exports = UserUpdateService;