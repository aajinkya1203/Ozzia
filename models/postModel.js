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
        required:true
    },
    tag:{
        type: String,
        default:"Funny"
    },
    likes:[{
        type: ObjectId,
        ref:"User"
    }],
    comments:[{
        text:String,
        postedBy:{
            type:ObjectId,
            ref:"User"
        }
    }],
    PostedBy:{
        type: ObjectId,
        ref:"User"
    }
})

module.exports = mongoose.model("Post",postSchema);