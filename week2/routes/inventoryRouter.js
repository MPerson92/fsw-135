const express = require('express')
const inventory = require('./models/inventory')
const inventoryRouter = express.Router()
const Inventory = require('./models/inventory')

inventoryRouter.get("/", (req, res, next) => {
    Inventory.find((err, inventory) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(inventory)
    })
})

inventoryRouter.post("/", (req, res, next) => {
    const newItem = new Inventory(req.body)
    newItem.save((err, savedInventory) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedInventory)
    })
})

// get one
inventoryRouter.get("/:inventoryId", (req, res, next) => {
    const inventoryId = req.params.inventoryId
    Inventory.find({_id: inventoryId}, (err, docs) => {
        if(err) {
            const error = new Error(`The item with id ${inventoryId} was not found.`)
            res.status(500)
            return next(error)
        } else {
            res.status(200).send(docs);
        }
    })
})

inventoryRouter.put("/:inventoryId", (req, res, next) => {
    Inventory.findOneAndUpdate(
        {_id: req.params.inventoryId},
        req.body,
        {new: true},
        (err, updatedInventory) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedInventory)
        }
    )
})

inventoryRouter.delete("/:inventoryId", (req, res, next) => {
    Inventory.findOneAndDelete(
        {_id: req.params.inventoryId},
        (err, deletedInventory) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted inventory item ${deletedInventory.title} from the database`)
        }
    )
})

inventoryRouter.get("/search/genre", (req, res, next) => {
    const genre = req.query.genre
    if(!genre){
        const error = new Error("You must provide a genre")
        res.status(500)
        return next(error)
    }
})

module.exports = inventoryRouter