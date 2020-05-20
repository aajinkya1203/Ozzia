const express = require('express');
const router = express.Router();
const PostModel = require('../models/postModel');
const requiredLogin = require('../middleware/authorization');

router.get('/home',(req,res)=>{
    PostModel.find()
        .populate("PostedBy","_id fname lname")
        .then(posts=>{
            res.send({posts})
        }).catch(err=>{
            console.log(err);
        })
})


router.post('/create',requiredLogin,(req,res)=>{
    const { title, description, tag, picUrl } = req.body;
    console.log(req.body)
    const newPost = new PostModel({
        title,
        description,
        PostedBy:req.user,
        tag,
        photo:picUrl
    });
    newPost.save().then(resultRecord=>{
        res.send({post:resultRecord});
    }).catch(err=>{
        console.log(err);
        res.status(400).send({error:"This is embarasing! Try again later!"})
    })

})

router.get('/myposts',requiredLogin,(req,res)=>{
    console.log(req.user)
    PostModel.find({PostedBy:req.user._id})
        .populate("PostedBy","_id fname lname")
        .then(posted=>{
            console.log(posted)
            res.send({myposts:posted})
        }).catch(err=>{
            console.log(err);
        });
})

router.get('/home/:tag',requiredLogin,(req,res)=>{
    PostModel.find({tag:req.params.tag})
        .populate("PostedBy","_id fname lname")
        .then(posts=>{
            res.send({group:posts})
        }).catch(err=>{
            console.log(err)
        })
})
module.exports = router;