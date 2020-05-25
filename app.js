const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const uri = require('./config/keys').MONGODB_URI;

// creating app using express
const app = express();

// all middlewares
app.use(bodyParser.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));
// app.use(express.static(__dirname+'/ozzia/src/style.css'))

if(process.env.NODE_ENV=="production"){
    app.use(express.static('ozzia/build'));
    const path = require('path');
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'ozzia','build','index.html'))
    })
}


// connecting to mongodb atlas
var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
}

mongoose.connect(uri,options,()=>{
    console.log("We are connected bois")
}).catch(err=>{
    console.log(err)
})

mongoose.connection.on('connected',function(){
    console.log("Connection went through!")
});
mongoose.connection.on('error',(err)=>{
    console.log("Uh-oh!")
    console.log(err)
})



// listening on port
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("Listening on port",PORT);
});