const mongoose = require('mongoose');

const url ="mongodb+srv://harshit2703:harshit2703@cluster0.fe8jpcl.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(url)
.then((result)=>{
    console.log('database connected successfully');
}).catch((err)=>{
    console.log(err);
});

module.exports = mongoose;