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

router.put('/follow',requiredLogin,(req,res)=>{
    UserModel.findByIdAndUpdate(req.body.followID,{
        $push:{ followers: req.user._id }
    },{
        new: true
    },(err,result)=>{
        if(err){
            return res.status(422).send({error:err})
        }
        UserModel.findByIdAndUpdate(req.user._id,{
            $push: { following: req.body.followID }
        },{
            new:true
        })
        .select('-password')
        .then(resultDoc=>{
            res.send({result:resultDoc})
        }).catch(err=>{
            res.status(422).send({error:err})
        })
    })
})
router.put('/unfollow',requiredLogin,(req,res)=>{
    UserModel.findByIdAndUpdate(req.body.unfollowID,{
        $pull:{ followers: req.user._id }
    },{
        new: true
    },(err,result)=>{
        if(err){
            return res.status(422).send({error:err})
        }
        UserModel.findByIdAndUpdate(req.user._id,{
            $pull: { following: req.body.unfollowID }
        },{
            new:true
        })
        .select('-password')
        .then(resultDoc=>{
            res.send({result:resultDoc})
        }).catch(err=>{
            res.status(422).send({error:err})
        })
    })
})

module.exports = router;