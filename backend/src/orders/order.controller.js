const Order = require("./order.model")

const createAOrder = async (req, res) => {
    try {
        const newOrder = await Order(req.body)
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    } catch (error) {
        console.error("Error: Creating Order")
        res.status(500).json({message: "Failed creating order"})
    }
}

const getOrderByEmail = async (req, res) => {
    try {
        const {email} = req.params
        const orders = await Order.find({email}).sort({createAt: -1})
        if(!orders) {
            return res.status(500).json({message: "Order not found"})
        }
        res.status(200).json(orders)
    } catch (error) {
        console.error("Error: Fetching Order")
        res.status(500).json({message: "Failed fetching orders"})
    }
}

module.exports = {
    createAOrder,
    getOrderByEmail
}