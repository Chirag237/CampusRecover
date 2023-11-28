const mongoose = require("mongoose");


const pictureSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String,
});

const CategorySchema = new mongoose.Schema(
  {
    
    description: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    image: {
      type: Array
    },
    question: {
      type: String,
      required: true,
    },
    createdBy: {
      type:String,
      required: true,
    },
    createdAt:{
        type:Number
    },
    updatedAt:{
        type:Number
    }
  },
  {
    timestamps: {
      currentTime: () => Date.now()
    },
  }
);

const postitem = mongoose.model("PostItem", CategorySchema);
// const requestitem=mongoose.model('RequestItem',CategorySchema)
module.exports = {
  postitem: postitem,
};
