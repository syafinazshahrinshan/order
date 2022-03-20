const express = require('express');
const app = express();


//run queries on the pool
const pool = require("./db")

app.use(express.json()) // -> req.body


// ROUTES 

//GET
app.get("/order", async(req,res)=>{
    try {
        const orderDetails = await pool.query("SELECT * FROM order_data")
        res.json(orderDetails.rows)
        console.log('success')

    } catch (error) {
        console.error(error.message)
    }
})

// // CREATE
app.post('/order', async(req,res)=>{
    try {
        const {orderID, itemID, quantity, PricePerItem, CreatedAt, OrderStatus} = req.body
        const newOrder = await pool.query("INSERT INTO order_data(orderID, itemID, quantity, PricePerItem, CreatedAt, OrderStatus) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",[orderID, itemID, quantity, PricePerItem, CreatedAt, OrderStatus])
        
        res.json(newOrder)
        console.log('Order created')
    } catch (error) {
        console.error(error.message)
    }
})

//UPDATE
app.put("/order/:orderID",async(req,res)=>{
    try {
        const{orderID}=req.params //WHERE
        const{OrderStatus} = req.body // SET

        const updateOrder= await pool.query("UPDATE order_data SET OrderStatus = $1 WHERE orderID=$2", [OrderStatus,orderID])
        
        console.log("Update Successful!")
        res.json("Update Successful!")

    } catch (error) {
        console.error(error.message)
    }
})

// //DELETE
app.delete("/order/:orderID", async(req,res)=>{
    try {
        const{orderID}=req.params
        const deleteOrder = await pool.query("DELETE FROM order_data WHERE orderID=$1",[orderID])

        res.json("Product was deleted!")

    } catch (error) {
        console.error(error.message)
    }
})

app.get('/', function(req, res) {
    res.send('Hello world!')
}); 

app.listen(3000, () => {
    console.log('Server Started');
});
