const jwt = require('jsonwebtoken');
const { data } = require('../taskHandler/handleTask')

const verifyReg = (req, res, next) => {
    const {username, password} = req.body
    if(!username && !password){
        return res.status(400).json({message : "username and password cannot be empty"})
    }
    const array_index = data.findIndex(user => user.username === username)
    if(array_index == -1){
        next()
    }
    else{
        res.json({message : "user already exists"})
    }
};

const validateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    if (!authHeader) {
        return res.status(401).json({ error: "No token provided, please verify..." });
    }
    jwt.verify(authHeader, "secret", (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ error: "Invalid token" });
        }
        req.decodedToken = decodedToken;
        next();
    });
};

const loginVerify = (req, res, next) => {
    const { username, password } = req.body;
    if(!username && !password){
        return res.status(400).json({message : "username and password cannot be empty"})
    }
    const user = data.find(user => user.username === username && user.password === password);
    if (user) {
        req.user = user;
        next();
    } else {
        res.status(401).json({ error: "Invalid credentials" });
    }
};


module.exports = { verifyReg,validateToken,loginVerify }