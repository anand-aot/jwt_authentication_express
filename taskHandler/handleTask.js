const jwt = require("jsonwebtoken")
const { v4: uuidv4 } = require('uuid');

const data = [];

const users = [
    {username: "admin", tasks: ["employee add", "show all employees"]},
    {username: "manager", tasks: ["verify employees details", "employee manage"]},
    {username: "employee", tasks: ["Do day to day work","Build product"]},
    {username: "HR", tasks: ["Track employee work","Hire new employees"]}
]

const uuidToNumber = () => {
    const uuid = uuidv4();
    const numericValue = parseInt(uuid.replace(/-/g, ''), 16);
    return (numericValue % 80000) + 1;
};

const getallRoles =(req,res) =>{
    return res.json(users)
}
const getUserRole = (username) => {
    const user = users.find(user => user.username === username)
    return user ? {username, tasks: user.tasks} : {"message":"User is not assigned with any role"}
}

const userRegister = (req, res) => {
    const { username,fullname,email,phoneno,password } = req.body
    const id = uuidToNumber();

    data.push({id,username,fullname,email,phoneno,password})
    return res.json(data)
} 

const userLogin = (req, res) => {
    const { fullname, email, phoneno, username, id } = req.user;
    const token = jwt.sign({ fullname, email, phoneno, username, id }, "secret");
    res.json({ token, message: "Login successful" });
};

const getRole = (req, res) => {
    const userRole = getUserRole(req.decodedToken.username);
    res.json(userRole);
};

module.exports ={
    userRegister,
    userLogin,
    getallRoles,
    getRole,
    data
}