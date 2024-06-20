const users = require('../models/userModel')   
const jwt =require ("jsonwebtoken")

exports.registorController = async (req,res)=>{
    console.log("inside register function");
    const {username,email,password} = req.body
    console.log(username,email,password);
    try {
        const existingUser = await users.findOne({email})
        if (existingUser) {
            res.status(406).json("Account already exist..!! please login...")
        }else{
            const newUser = new users({
                username,email,password,github:"",linkedin:"",profilePic:""
            })
            await newUser.save()
            res.status(200).json("newUser")
        }
    } catch (error) {
        res.status(401).json(error)
    }
} 

exports.loginController = async (req,res) =>{
    console.log("inside register function");
    const {email,password} = req.body
    console.log(email,password);
    try {
        const existingUser = await users.findOne({email,password})
        if (existingUser) {
            //generate token on successfull login
            const token = jwt.sign({userId:existingUser._id},process.env.JWT_PASSWORD)
            res.status(200).json({
                user:existingUser,
                token
            })
        }else{
            res.status(404).json("Invalid cridentials")
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

//edit profile
exports.editProfileController = async (req,res) =>{
    console.log("inside edit profile function");
    const {username,email,password,github,linkedin,profilePic} = req.body
    const uploadImg = req.file ? req.file.filename : profilePic
    const userId = req.payload

    try {
        const updateUser = await users.findByIdAndUpdate({_id:userId},{
            username:"",email:"",password:"",github:"",linkedin:"",profilePic:""
        },{new:true})
        await updateUser.save()
        res.status(200).json(updateUser)
    } catch (err) {
        res.status(401).json(err)
    }
}