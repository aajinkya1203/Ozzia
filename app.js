const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const uri = require('./keys').MONGODB_URI;

// creating app using express
const app = express();

// all middlewares
app.use(bodyParser.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));

// connecting to mongodb atlas
var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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
const PORT = 5000;
app.listen(PORT,()=>{
    console.log("Listening on port",PORT);
});