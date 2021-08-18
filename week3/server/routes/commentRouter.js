const express = require('express')
const commentRouter = express.Router()
const Comment = require('../models/comment')

commentRouter.get("/", (req, res, next) => {
    Comment.find((err, comment) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comment)
    })
})

commentRouter.post("/", (req, res, next) => {
    req.body.user = req.user._id
    req.username = req.user.username
    const newComment = new Comment(req.body)
    newComment.save((err, savedComment) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedComment)
    })
})

commentRouter.get("/:userId", (req, res, next) => {
    Comment.find({user: req.params.userId}, (err, docs) =>{
        if(err) {
            res.status(500)
            return next(error)
        } else {
            res.status(200).send(docs)
        }
    })
})

commentRouter.get("/:commentId", (req, res, next) => {
    const commentId = req.params.commentId
    Comment.find({_id: commentId}, (err, docs) =>{
        if(err) {
            const error = new Error(`The Comment with ID ${commentId} was not found.`)
            res.status(500)
            return next(error)
        } else {
            res.status(200).send(docs)
        }
    })
})

commentRouter.put("/:commentId", (req, res, next) =>{
    Comment.findOneAndUpdate(
        {_id: req.params.commentId},
        req.body,
        {new: true},
        (err, updatedComment) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedComment)
        }
    )
})

commentRouter.delete("/:commentId", (req, res, next) => {
    Comment.findOneAndDelete(
        {_id: req.params.commentId},
        (err, deletedComment) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted comment ${deletedComment.parent_comment} from the database`)
        }
    )
})

commentRouter.get("/search/issue", (req, res, next) => {
    const issue = req.query.issue
    if(!issue){
        const error = new Error("You must provide a issue")
        res.status(500)
        return next(error)
    }
})

module.exports = commentRouter