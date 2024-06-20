const express = require ("express")
const userController = require("../controller/useController")
const projectController = require("../controller/projectController")
const jwtMiddleware = require("../middleware/jwtMiddleware")
const multerMiddleware = require("../middleware/multerMiddleware")

const router = new express.Router()

//register
router.post("/register",userController.registorController)

//Login
router.post("/login",userController.loginController)

//add projects
router.post("/project/add",jwtMiddleware,multerMiddleware.single('projectImg'),projectController.addProjectController)

//home projects
router.get('/get-home-projects',projectController.gethomeProjects)

// all projects
router.get('/all-projects',jwtMiddleware,projectController.allProjectsController)

// user Projects
router.get('/user-projects',jwtMiddleware,projectController.getUserProjectsController)

//update project
router.put('/project/:pid/edit',jwtMiddleware,multerMiddleware.single('projectImg'),projectController.editProjectController)

//Delete project
router.delete('/project/:pid/remove',jwtMiddleware,projectController.removeProjectController)

// edit profile
router.put('/user/edit',jwtMiddleware,multerMiddleware.single('profilePic'),userController.editProfileController)


module.exports = router