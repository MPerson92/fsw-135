const express = require('express')
const inventoryRouter = express.Router()
const {uuid} = require("uuidv4")

const inventory = [
    {title: "Hammer", genre: "tools", _id: uuid()},
    {title: "Nails", genre: "tools", _id: uuid()},
    {title: "T-shirts", genre: "clothing", _id: uuid()},
    {title: "Matchbox Car", genre: "toys", _id: uuid()}
]

inventoryRouter.get("/", (req, res) => {
    res.send(inventory)
})

inventoryRouter.get("/:inventoryId", (req, res) => {
    const inventoryId = req.params.inventoryId
    const foundInventory = inventory.find(items => items._id === inventoryId)
    res.send(foundInventory)
})

inventoryRouter.post("/", (req, res) => {
    const newItem = req.body
    newItem._id = uuid()
    inventory.push(newItem)
    res.send(`Successfully added ${newItem.title} to the database`)
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