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
    try {
        const allProjects = await projects.find()
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