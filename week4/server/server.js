const express = require("express")
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config()
const expressJwt = require('express-jwt')

app.use(express.json())
app.use(morgan('dev'))

mongoose.connect('mongodb://localhost:27017/rockTheVotedb',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false 
    },
    () => console.log("Connected to the DB")
)


app.use("/auth", require("./routes/authRouter"))
app.use('/api', expressJwt({ secret: process.env.SECRET, algorithms: ['HS256']}))

app.use("/comment", require("./routes/commentRouter"))
app.use("/issue", require("./routes/issueRouter"))
app.use("/user", require("./routes/userRouter"))

app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "Unauthorized Error"){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

app.listen(9000, () => {
    console.log("The server is running on Port 9000")
})