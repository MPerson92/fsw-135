const express = require('express')
const userRouter = express.Router()
const User = require('../models/user')

userRouter.get("/", (req, res, next) => {
    User.find((err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(user)
    })
})

userRouter.post("/", (req, res, next) => {
    const newUser = new User(req.body)
    newUser.save((err, savedUser) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedUser)
    })
})

userRouter.get("/:userId", (req, res, next) => {
    const userId = req.params.userId
    User.find({_id: userId}, (err, docs) =>{
        if(err) {
            const error = new Error(`The User with ID ${userId} was not found.`)
            res.status(500)
            return next(error)
        } else {
            res.status(200).send(docs)
        }
    })
})

userRouter.put("/:userId", (req, res, next) =>{
    User.findOneAndUpdate(
        {_id: req.params.userId},
        req.body,
        {new: true},
        (err, updatedUser) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedUser)
        }
    )
})

userRouter.delete("/:userId", (req, res, next) => {
    User.findOneAndDelete(
        {_id: req.params.userId},
        (err, deletedUser) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted user ${deletedUser.username} from the database`)
        }
    )
})

userRouter.get("/search/username", (req, res, next) => {
    const username = req.query.username
    if(!username){
        const error = new Error("You must provide a Username")
        res.status(500)
        return next(error)
    }
})

module.exports = userRouter