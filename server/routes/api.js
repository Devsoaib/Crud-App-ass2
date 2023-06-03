const express = require('express');
const { Registration, Login, ProfileUpdate, ProfileDetails, RecoverVerifyEmail, RecoverVerifyOTP, RecoverResetPass } = require('../controllers/Users/UsersControllers');
const AuthVerifyMiddleware = require('../middlewares/AuthVerifyMiddleware');
const { CreateBlog, UpdateBlog, BlogList, BlogDetailsByID, DeleteBlog } = require('../controllers/Blog/blogsController');


const router = express.Router();

//user profile 
router.post("/Registration", Registration)
router.post("/Login", Login)
router.post("/ProfileUpdate", AuthVerifyMiddleware, ProfileUpdate)
router.get("/ProfileDetails", AuthVerifyMiddleware, ProfileDetails)
router.get("/RecoverVerifyEmail/:email", RecoverVerifyEmail)
router.get("/RecoverVerifyOTP/:email/:otp", RecoverVerifyOTP)
router.post("/RecoverResetPass", RecoverResetPass)

//Brands
router.post("/CreateBlog", AuthVerifyMiddleware, CreateBlog)
router.post("/UpdateBlog/:id", AuthVerifyMiddleware, UpdateBlog)
router.get("/BlogList/:pageNo/:perPage/:searchKeyword", AuthVerifyMiddleware, BlogList)
router.get("/DeleteBlog/:id", AuthVerifyMiddleware, DeleteBlog)
router.get("/BlogDetailsByID/:id", AuthVerifyMiddleware, BlogDetailsByID)

module.exports = router;
