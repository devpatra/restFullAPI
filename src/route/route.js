const express = require('express')
const router = express.Router()
const authorController = require('../controller/authorController')
const blogController = require('../controller/blogController')
const middleware= require('../middleware/middleware')

router.post("/authors", authorController.createAuthor)

router.post("/blogs",middleware.authentication, blogController.createBlog)

router.post("/login",authorController.loginAuthor)

router.get("/blogs",middleware.authentication, blogController.getBlog)

router.put("/blogs/:blogId",middleware.authentication,middleware.authorisationById,blogController.updateBlog)

router.delete("/blogs/:blogId",middleware.authentication,middleware.authorisationById,blogController.deleteById)

router.delete("/blogs",middleware.authentication,middleware.authorisationToQuery, blogController.deleteByQuery)

module.exports = router