const authorModel = require("../model/authorModel");
const blogModel = require("../model/blogModel");
const mongoose= require('mongoose')
const validator= require('../validator/validator')
let date = new Date();


const createBlog = async function (req, res) {
  try {
    let data = req.body;
    if (Object.keys(data).length == 0) return res.status(400).send({ status: false, error: "Please enter details" });
    let id = data.authorId;
    let authId = await authorModel.findById(id);
    if (!authId) { return res.status(400).send({status: false, error: "Author does not exist"}) }
    if(req.decode._id != id) return res.status(400).send({status:false, error:"You are not autherised"})
    if (data.isPublished) {
      data["publishedAt"] = date; }

      let savedData = await blogModel.create(data);
      return res.status(201).send({ status: true, data: savedData });
  } 
  catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};

const getBlog = async function (req, res) {
  try {
    let data = req.query
    let { authorId, tags, subcategory, category, ...rest } = data
    if(validator.checkInput(rest)) return res.status(400).send({status: false, error:"Only acceptable authorId, tags, subcategory, category "})
    let obj = { isDeleted: false, isPublished: true }
    if (authorId) {
      if (!mongoose.isValidObjectId(authorId)) return res.status(400).send({ status: false, error: 'Invalid Author ID' })
      let checkAuthor = await authorModel.findById(authorId)
      if (!checkAuthor) return res.status(404).send({status: false, error: "no author exist" })
      obj.authorId = authorId
    }
    if (category) {
      obj.category = category
    }
    if (tags) {
      obj.tags = tags
    }
    if (subcategory) {
      obj.subcategory = subcategory
    }

    let findData = await blogModel.find(obj)
    
    if (findData.length==0) {
      return res.status(404).send({status:false, error: "no data found" })
    }
    return res.status(200).send({status:true, msg: findData })
  } catch (error) {
    res.status(500).send({ status: false, error: error.message })
  }
}

const updateBlog = async function (req, res) {
  try {
    let data= req.body
    let { title,body, tags,subcategory, ...rest } = data
    let id = req.params.blogId
      if(validator.checkInput(rest)) return res.status(400).send({status: false, error:"Only acceptable title,body,tags,subcategory"})
      
      let obj = { }
      if(title){
        obj.title = title
      }
      if(body){
        obj.body = body
      }
      obj["publishedAt"] = date;
      obj.isPublished = true
      let update = await blogModel.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { $set: obj, $push: { subcategory: subcategory, tags: tags } },
        { new: true }
      )
      res.status(201).send({ status: true, msg: update })
    }
  catch (error) {
    res.status(500).send({ status: false, error: error.message })
  }
}

let deleteById = async function (req, res) {
  try {
    let blogId = req.params.blogId;
    let deleteBlog = await blogModel.findByIdAndUpdate(
      blogId,
      { $set: { isDeleted: true, deletedAt: date } },
      { new: true }
    );
    res.status(200).send({status: true, msg: deleteBlog})
} 
  catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};


const deleteByQuery = async function (req, res) {
  try {
    let data = req.query
    let deleteBlog = await blogModel.findOneAndUpdate(data, { isDeleted: true, deletedAt: date }, { new: true })
  
    res.status(200).send({ status: false, msg: deleteBlog })
  } 
  catch (error) {
    res.status(500).send({ status: true, error: error.message })
  }
}


module.exports.getBlog = getBlog
module.exports.createBlog = createBlog
module.exports.updateBlog = updateBlog
module.exports.deleteById = deleteById
module.exports.deleteByQuery = deleteByQuery