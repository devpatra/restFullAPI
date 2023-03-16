const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const ObjectId = mongoose.Schema.Types.ObjectId;

const blogModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    authorId: {
      type: ObjectId,
      ref: 'authorModel',
      required: true
    },
    tags: [String],
    category: {
      type: String,
      required: true
    },
    subcategory: [String],
    deletedAt: Date,
    isDeleted: {
      type: Boolean,
      default: false
    },
    publishedAt: Date,
    isPublished: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

blogModel.plugin(mongoosePaginate);

module.exports = mongoose.model('blogModel', blogModel);
