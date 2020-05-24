const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../keys');
const requiredLogin = require('../middleware/authorization');

// router.get('/protected',requiredLogin,(req,res)=>{
//     console.log("Req user:",req.user);
//     res.send("hello authenticated user!")
// })

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
                res.send({message:"User successfully created! Woohoo! Login to join the party!"})
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
    // console.log(req.body)
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
                    console.log(following)
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


// exporting router
module.exports = router;