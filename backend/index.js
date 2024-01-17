require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const productRoute = require('./routes/products')
const cors = require('cors')

// import express from "express"
// import { PORT,mongoDBURL } from "./config.js"
// import mongoose from "mongoose"
// import { ProductModel } from './models/productModel.js'


// const app = express()


// app.use(express.json())

// app.get("/", (req, res) => {
//     console.log(req)
//     return res.status(234).send('Welcome!')
// })

// mongoose
//     .connect(mongoDBURL)
//     .then(() => {
//         console.log('App connected to database')
//         app.listen(PORT, () => {
//             console.log(`App is listening to port: ${PORT}`)
//         })
//     })
//     .catch((err) => {
//         console.log(err)
//     })

const app = express()



// const { MongoClient } = require("mongodb");
// // Replace the uri string with your MongoDB deployment's connection string.
// const uri =
// "mongodb+srv://admin:tC6eyxiLYdiysDTR@webshop.47proxx.mongodb.net/?retryWrites=true&w=majority";

// const client = new MongoClient(uri);

// async function run() {
//   try {
//     await client.connect();
//     // database and collection code goes here
//     const db = client.db("shopItems");
//     const coll = db.collection("products");

//     // insert code goes here
//     // const docs = [
//     //   {name: "Halley's Comet", officialName: "1P/Halley", orbitalPeriod: 75, radius: 3.4175, mass: 2.2e14},
//     //   {name: "Wild2", officialName: "81P/Wild", orbitalPeriod: 6.41, radius: 1.5534, mass: 2.3e13},
//     //   {name: "Comet Hyakutake", officialName: "C/1996 B2", orbitalPeriod: 17000, radius: 0.77671, mass: 8.8e12}
//     // ];

//     coll.updateMany(
//         {},
//         {
//             $set: {
//                 timestamp: new Date()
//             }
//         },
//         {
//             multi: true
//         }
//     )

//     // display the results of your operation
//     // console.log(result.insertedIds);

//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);



mongoose
    .connect(process.env.mongoDB_URL)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`App is listening to port: ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })


app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/products', productRoute)


