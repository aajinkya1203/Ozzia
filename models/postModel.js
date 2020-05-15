const mongoose= require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    photo:{
        type: String,
        default:"None"
    },
    tag:{
        type: String,
        default:"Funny"
    },
    PostedBy:{
        type: ObjectId,
        ref:"User"
    }
})

module.exports = mongoose.model("Post",postSchema);