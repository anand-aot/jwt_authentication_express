const express = require("express")
const app = express();
const route = require('./Routes/allRoutes')

app.use(express.json())
// routes
app.use('/',route)

app.listen(6000, () => {
    console.log("Server start: http://localhost:6000/")
})

