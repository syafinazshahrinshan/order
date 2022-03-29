const express = require('express');
const app = express();


//run queries on the pool
const pool = require("./db")

app.use(express.json()) // -> req.body


// ROUTES 

//GET
app.get("/order/getAll", async(req,res)=>{
    try {
        let fullOrderDetails = [];
        const orders = await pool.query(`SELECT * FROM user_order_data`)
        for (order of orders.rows) {
            let temp = order;
            let result =  await pool.query(`SELECT * FROM order_data 
                Where orderID = $1`, [temp.orderid]);
            temp.details = result.rows
            fullOrderDetails.push(temp);
        }

        res.json(fullOrderDetails)
    } catch (error) {
        console.error(error.message)
        res.json(error.message)
    }
})

//GET BY User ID
app.get("/order/userid/:userId", async(req,res)=>{
    try {
        let fullOrderDetails = [];
        const{userId}=req.params //WHERE

        const orders = await pool.query(`SELECT * FROM user_order_data 
        where user_id = $1`, [userId])
        for (order of orders.rows) {
            let temp = order;
            let result =  await pool.query(`SELECT * FROM order_data 
                Where orderID = $1`, [temp.orderid]);
            temp.details = result.rows
            fullOrderDetails.push(temp);
        }

        res.json(fullOrderDetails)
    } catch (error) {
        console.error(error.message)
        res.json(error.message)
    }
})

//GET BY order ID
app.get("/order/orderid/:orderID", async(req,res)=>{
    try {
        let fullOrderDetails = [];
        const{orderID}=req.params //WHERE

        const orders = await pool.query(`SELECT * FROM user_order_data 
        where orderid = $1`, [orderID])
        for (order of orders.rows) {
            let temp = order;
            let result =  await pool.query(`SELECT * FROM order_data 
                Where orderID = $1`, [orderID]);
            temp.details = result.rows
            fullOrderDetails.push(temp);
        }

        res.json(fullOrderDetails)
    } catch (error) {
        console.error(error.message)
        res.json(error.message)
    }
})

//CREATE
app.post('/order/create', async(req,res)=>{
    try {
        
        const {id, userId, items} = req.body
        const newOrder = await pool.query("INSERT INTO user_order_data(orderID, user_id, orderStatus) VALUES ($1,$2,$3) RETURNING *",[id, userId, "Incomplete"])
        for (item of items){
            await pool.query("INSERT INTO order_data(orderID, itemID, quantity, pricePerItem) VALUES ($1,$2,$3,$4) RETURNING *",[id, item.itemID, item.quantity, item.pricePerItem])
        }
        res.json(newOrder)
        console.log('Order created')
    } catch (error) {
        console.error(error.message)
        res.json(error.message)
    }
})

//UPDATE
app.put("/order/:orderID",async(req,res)=>{
    try {
        const{orderID}=req.params //WHERE
        console.log(req.body)
        const{orderStatus} = req.body // SET
        console.log(orderID)
        console.log(orderStatus)
        const updateOrder= await pool.query("UPDATE user_order_data SET orderstatus = $1 WHERE orderid=$2", [orderStatus,orderID])
        
        console.log("Update Successful!")
        res.json("Update Successful!")

    } catch (error) {
        console.error(error.message)
        res.json(error.message)
    }
})

app.get('/', function(req, res) {
    res.send('Hello world!')
}); 

app.listen(3000, () => {
    console.log('Server Started');
});
