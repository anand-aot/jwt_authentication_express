const router = require('express').Router()
const { getallRoles,getRole,userRegister,userLogin } = require('../taskHandler/handleTask')
const { verifyReg,validateToken,loginVerify } = require('../middleWare/userReg')

//routes
router.get("/", getallRoles)
router.get("/task",validateToken,getRole)
router.post("/register",verifyReg,userRegister)
router.post("/login",loginVerify,userLogin)

module.exports = router