const express = require('express');
const router = express.Router();
const PostModel = require('../models/postModel');
const UserModel = require('../models/user');
const requiredLogin = require('../middleware/authorization');

router.get('/user/:id',requiredLogin,(req,res)=>{
    console.log(req.params.id)
    UserModel.findOne({_id:req.params.id})
    .select('-password')
    .then(user=>{
        PostModel.find({PostedBy:req.params.id})
        .populate("PostedBy","_id fname lname")
        .populate("comments.postedBy","lname fname _id")
        .exec((err,posts)=>{
            console.log(posts)
            if(err){
                return res.status(422).send({error:err})
            }
            res.send({posts,user})
        })
    }).catch(err=>{
        return res.status(400).send({error:"User not found"})
    })
})



module.exports = router;