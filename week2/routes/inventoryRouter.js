const express = require('express')
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

inventoryRouter.get("/:inventoryId", (req, res, next) => {
    const inventoryId = req.params.inventoryId
    const foundInventory = inventory.find(items => items._id === inventoryId)
    if(!foundInventory){
        const error = new Error(`The item with id ${inventoryId} was not found.`)
        res.status(500)
        return next(error)
    }
    return res.status(200).send(foundInventory)
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