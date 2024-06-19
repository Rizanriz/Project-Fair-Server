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

module.exports = router