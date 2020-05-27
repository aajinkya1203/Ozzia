const express = require('express');
const router = express.Router();
const User = require('../models/user');
const crypto = require('crypto')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/keys');
const requiredLogin = require('../middleware/authorization');
const path = require('path');
const { SIGNUP_API,EMAIL,USER_API,RESET_API } = require('../config/keys')


router.post('/signup',(req,res)=>{
    const { fname, lname, email, password, picUrl } = req.body;
    console.log(req.body)
    if(!email || !fname || !lname || !password){
        return res.status(422)
                .send({error:"Kindly provide all details"});
    }
    User.findOne({email:email}).then((result)=>{
        if(result){
            return res.status(422)
                    .send({error:"An account with the same email already exist! Try Logging in!"})
        }

        bcrypt.hash(password,15).then(hashedpwd=>{
            const newUser = new User({
                fname,
                lname,
                email,
                password: hashedpwd,
                followers:[],
                following:[],
                photo: picUrl
            });
            newUser.save().then(response=>{
                res.send({
                    message:"User successfully created! Woohoo! Login to join the party!",
                    EMAIL:EMAIL,
                    USER_API:USER_API,
                    SIGNUP_API:SIGNUP_API
                })
            }).catch(err=>{
                return res.status(400)
                        .send({error:"Error creating an account!\n Please try again"})
            })
        }).catch(err=>{
            res.send({error:"This is embarrasing! We suggest you to try again!"})
        })

        
    }).catch(err=>{
        return res.status(400)
        .send({error:"Error creating an account!\n Please try again"})
    })
})

router.post('/login',(req,res)=>{
    const { email, password } = req.body;
    // checking if all information has been provided
    if( !email || !password ){
        return res.status(422)
                .send({error:"Kindly provide all the necessary credentials for logging in!"});
    }

    User.findOne({email:email}).then(savedUser=>{
        if(!savedUser){
            return res.status(422)
                    .send({error:"Invalid Email and Password combination!"})
        }
        bcrypt.compare(password,savedUser.password)
            .then(didMatch=>{
                if(didMatch){
                    // res.send({message:"Successfully logged in!"})
                    const token = jwt.sign({_id:savedUser._id},JWT_SECRET);
                    const { fname, lname, email, _id, followers, following, photo } = savedUser;
                
                res.send({token,message:"Login Successful! Off you go!",user:{fname, lname, email, _id, followers, following, photo}});
                }
                else{
                    return res.status(422)
                            .send({error:"Invalid Email and Password combination!"})
                }
            }).catch(err=>{
                console.log(err);
                return res.status(500)
                        .send({error:"This is embarrasing! We suggest you to try again!"});
            })
    }).catch(err=>{
        console.log(err);
    })
})


router.post('/reset-password',(req,res)=>{
    // console.log(EMAIL)
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex");
        User.findOne({email:req.body.email}).then(user=>{
            if(!user){
                return res.status(422).send({error:"User doesn't exists with that account! Oopsie!"})
            }
            user.resetToken = token;
            user.expiry = Date.now() + 3600000;
            user.save().then(result=>{
                res.send({
                    message:"A link has been sent to your registered email. Kindly reset your password using that link!",
                    token:token,
                    EMAIL:EMAIL,
                    USER_API:USER_API,
                    RESET_API:RESET_API
                })
            })
        })
    })
})


router.post('/new-password',(req,res)=>{
    const token = req.body.token;
    const newPassword = req.body.password;
    User.findOne({resetToken:token, expiry: {$gt:Date.now()}})
    .then(user=>{
        if(!user){
            return res.status(422).send({error:"Couldn't process your update request since the session expired or maybe the link in invalid!"})
        }
        bcrypt.hash(newPassword,15).then(hashPwd=>{
            user.password = hashPwd;
            user.resetToken = undefined;
            user.expiry = undefined;
            user.save().then(result=>{
                res.send({message:"Password Updated Successfully!"})
            })
        })
    }).catch(err=>{
        console.log(err)
    })
})

// exporting router
module.exports = router;