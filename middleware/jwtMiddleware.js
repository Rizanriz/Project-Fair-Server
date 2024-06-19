const jwt = require("jsonwebtoken");

//define logig to verfiy token
const jwtMiddleware = (req, res, next) => {
    console.log("inside JWTmiddleware");

    const token = req.headers['authorization'].split(" ")[1]
    console.log("TOKEN: ",token); 

    if (token) {
        try {
            const jwtResponce = jwt.verify(token,process.env.JWT_PASSWORD)
            console.log(jwtResponce);
            req.payload = jwtResponce.userId
            next()
        } catch (error) {
            res.status(401).json("Invalid token")
        }

    } else {
        res.status(404).json("Messing token")
    }
}

module.exports = jwtMiddleware

