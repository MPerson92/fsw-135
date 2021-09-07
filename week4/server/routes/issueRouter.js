const express = require('express')
const issue = require('../models/issue')
const issueRouter = express.Router()
const Issue = require('../models/issue')

issueRouter.get("/", (req, res, next) => {
    Issue.find((err, issue) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issue)
    })
})

issueRouter.get("/user", (req, res, next) =>{
    Issue.find(
        {user: req.user._id},
        (err, issues) =>{
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(issues)
        }
    )
})

issueRouter.get("/user", (req, res, next) => {
    Issue.findOne(
        {'user': req.user._id}, (err, docs) =>{
        if(err) {
            res.status(500)
            return next(error)
        } else {
            res.status(200).send(docs)
        }
    })
})

issueRouter.post("/", (req, res, next) => {
    const newIssue = new Issue(req.body)
    newIssue.save((err, savedIssue) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedIssue)
    })
})



issueRouter.put("/:issueId", (req, res, next) =>{
    Issue.findOneAndUpdate(
        {_id: req.params.issueId},
        req.body,
        {new: true},
        (err, updatedIssue) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedIssue)
        }
    )
})

issueRouter.delete("/:issueId", (req, res, next) => {
    Issue.findOneAndDelete(
        {_id: req.params.issueId},
        (err, deletedIssue) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted Issue ${deletedIssue.description} from the database`)
        }
    )
})

issueRouter.get("/search/description", (req, res, next) => {
    const description = req.query.description
    if(!description){
        const error = new Error("You must provide a description")
        res.status(500)
        return next(error)
    }
})

module.exports = issueRouter