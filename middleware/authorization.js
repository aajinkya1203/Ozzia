const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/keys');
const User = require('../models/user');

module.exports = (req, res, next)=>{
    // console.log("reqheader:",req.headers);
    const { authorization } = req.headers;
    if(!authorization){
        return res.status(401)
                .send({error:"You must be authenticated!"});
    }
    // console.log("Auth:",authorization)
    const token = authorization.replace("Bearer ","");
    // console.log("Token:",token);
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            return res.status(401)
                    .send({error:"You must be authenticated!"})
        }
        const { _id } = payload;
        // console.log("Payload:",payload);
        User.findById({_id:_id}).then(userData=>{
            req.user = userData;
            next();
        });
    })
}