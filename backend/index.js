require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const productRoute = require('./routes/products')
const cors = require('cors')

const app = express()

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


