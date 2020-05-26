const express = require('express');
const router = express.Router();
const PostModel = require('../models/postModel');
const requiredLogin = require('../middleware/authorization');

router.get('/home',(req,res)=>{
    PostModel.find()
        .populate("PostedBy","_id fname lname photo")
        .populate("comments.postedBy","_id fname lname photo")
        .sort('-createdAt')
        .then(posts=>{
            res.send({posts})
        }).catch(err=>{
            console.log(err);
        })
})
router.get('/subbedPost',requiredLogin,(req,res)=>{
    PostModel.find({PostedBy:{$in:req.user.following}})
        .populate("PostedBy","_id fname lname photo")
        .populate("comments.postedBy","_id fname lname photo")
        .sort('-createdAt')
        .then(posts=>{
            res.send({posts})
        }).catch(err=>{
            console.log(err);
        })
})

router.get('/post/:id',requiredLogin,(req,res)=>{
    PostModel.find({_id:req.params.id})
    .populate("PostedBy","_id fname lname photo")
    .populate("comments.postedBy","_id fname lname photo")
    .sort('-createdAt')
    .then(result=>{
        res.send({result})
    }).catch(err=>{
        console.log(err);
        res.status(422).send({error:err})
    })
})

router.post('/create',requiredLogin,(req,res)=>{
    const { title, description, tag, picUrl } = req.body;
    const newPost = new PostModel({
        title,
        description,
        PostedBy:req.user,
        tag,
        photo:picUrl
    });
    newPost.save()
    .then(resultRecord=>{
        res.send({post:resultRecord});
    }).catch(err=>{
        console.log(err);
        res.status(400).send({error:"This is embarasing! Try again later!"})
    })

})

router.get('/myposts',requiredLogin,(req,res)=>{
    PostModel.find({PostedBy:req.user._id})
        .populate("PostedBy","_id fname lname photo")
        .populate("comments.postedBy","lname fname _id photo")
        .sort('-createdAt')
        .then(posted=>{
            res.send({myposts:posted})
        }).catch(err=>{
            console.log(err);
        });
})

router.get('/home/:tag',requiredLogin,(req,res)=>{
    console.log(req.params.tag)
    PostModel.find({tag:req.params.tag})
        .populate("PostedBy","_id fname lname photo")
        .populate("comments.postedBy","lname fname _id photo")
        .sort('-createdAt')
        .then(posts=>{
            console.log(posts)
            res.send({group:posts})
        }).catch(err=>{
            console.log(err)
        })
})

router.put('/like',requiredLogin,(req,res)=>{
    PostModel.findByIdAndUpdate(req.body.PostID,{
        $push:{ likes: req.user._id }
    },{
        new:true
    }).populate("PostedBy","_id fname lname photo")
    .populate("comments.postedBy","lname fname _id photo")
    .exec((err,result)=>{
        if(err){
            return res.status(422)
                    .send({error:err})
        }else{
            return res.send({message:result})
        }
    })
});

router.put('/comment',requiredLogin,(req,res)=>{
    const comment = {
        text: req.body.text,
        postedBy:req.user._id
    }
    console.log(comment)
    PostModel.findByIdAndUpdate(req.body.PostID,{        
        $push:{ comments: comment }
    },{
        new:true
    }).populate("comments.postedBy","lname fname _id photo")
    .populate("PostedBy","_id fname lname photo")
    .exec((err,result)=>{
        if(err){
            return res.status(422)
                    .send({error:err})
        }else{
            return res.send({message:result})
        }
    })
});

router.delete('/delete/:postID',requiredLogin,(req,res)=>{
    PostModel.findByIdAndRemove(req.params.postID)
    .populate("PostedBy","_id fname lname photo")
    .populate("comments.postedBy","lname fname _id photo")
    .then(result=>{
        res.send({result});
    }).catch(err=>{
        res.status(422).send({error:"Oops! Something didn't go right!"})
    })
})

router.put('/delete/comment/:postID',requiredLogin,(req,res)=>{
    PostModel.updateOne({ _id:req.params.postID },{
        $pull: { "comments": { "_id" : req.body.commentID } }
    },{
        multi: true
    })
    .populate("PostedBy","_id fname lname photo")
    .populate("comments.postedBy","lname fname _id photo")
    .then(result=>{
        PostModel.findById(req.params.postID)
        .populate("PostedBy","_id fname lname photo")
        .populate("comments.postedBy","lname fname _id photo")
        .then(resultDoc=>{
            res.send({title:"Comment Deleted!",message:resultDoc});
        }).catch(err=>{
            console.log(err);
            res.status(422).send({error:"Something didn't go right! Oops!"})
        })
    }).catch(err=>{
        console.log(err)
        res.status(422).send({error:"Something didn't go right! Oops!"})
    })

})

router.put('/unlike',requiredLogin,(req,res)=>{
    PostModel.findByIdAndUpdate(req.body.PostID,{
        $pull:{ likes: req.user._id }
    },{
        new:true
    }).populate("PostedBy","_id fname lname photo")
    .populate("comments.postedBy","lname fname _id photo")
    .exec((err,result)=>{
        if(err){
            return res.status(422)
                    .send({error:err})
        }else{
            return res.send({message:result})
        }
    })
})


module.exports = router;