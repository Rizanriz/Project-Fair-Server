const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gtihub:{
        type:String,
    },
    linkedin:{
        type:String,
    },
    profilePic:{
        type:String,
    },
})

const users = mongoose.model("users",userSchema)

module.exports = users