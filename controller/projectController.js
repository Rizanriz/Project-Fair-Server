const projects = require('../models/projectModel')

//add project
exports.addProjectController = async(req, res) => {
    console.log("inside add project funtion");
    const { title, languages, github, website, overview } = req.body
    const userId = req.payload
    const projectImg = req.file.filename
    console.log(title, languages, github, website, overview, projectImg);
    
    try {
        const existingProject = await projects.findOne({github})
        if (existingProject) {
            res.status(406).json("project already in our database")
        }else{
            const newProject = new projects({
                title,languages,github,website,overview,projectImg,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    } catch (err) {
        res.status(401).json(err)
    }
}

// home projects
exports.gethomeProjects = async(req,res)=>{
    console.log("inside gethome projects");
    try {
        const homeProjects = await projects.find().limit(3)
        res.status(200).json(homeProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}

// All projects
exports.allProjectsController = async(req,res)=>{
    console.log("inside all projects");
    const searchKey = req.query.search
    const query = {
        languages : {
            $regex:searchKey,
            $options:"i"
        }
    }
    try {
        const allProjects = await projects.find(query)
        res.status(200).json(allProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}

//All projects
exports.getUserProjectsController = async(req,res)=>{
    console.log("inside getuser projects");
    const userId = req.payload
    try {
        const userProjects = await projects.find({userId})
        res.status(200).json(userProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}

//edit project
exports.editProjectController = async (req,res) =>{
    console.log("Inside edit project controller");
    const {pid} = req.params         //project id as per url
    const { title, languages, github, website, overview, projectImg } = req.body
    const uploadImg = req.file ? req.file.filename : projectImg 
    const userId = req.payload
    try {
        const updateProject = await projects.findByIdAndUpdate({_id:pid},{
            title,languages,github,website,overview,projectImg:uploadImg,userId
        },{new:true})                //to perform successfully updation 
        await updateProject.save()   //to save model to mongodb
        res.status(200).json(updateProject)
    } catch (err) {
        res.status(401).json(err)
    }
}

//Delete project
exports.removeProjectController = async (req,res) =>{
    console.log("Inside remove project controller");
    const {pid} = req.params
    try {
       const removeProject = await projects.findByIdAndDelete({_id:pid})
        res.status(200).json(removeProject) 
    } catch (err) {
        res.status(401).json(err)
    }
}