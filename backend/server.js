const express = require('express')
const PORT = process.env.PORT || 8000
const dotenv = require('dotenv').config()
const colors = require('colors')
const connectDB = require('./config/db.js')
const recipeRoutes = require('./routes/recipeRoutes')
const userRoutes = require('./routes/userRoutes')
const { errorHandler } = require('./middleware/errorMiddleware')
const path = require('path')
//connect to database
connectDB()

const app = express()
//Body parser middleware
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(express.json({ limit: '50mb' }))

//Routers
app.use('/api/recipes', recipeRoutes)
app.use('/api/users', userRoutes)

//Error Handler middleware
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`)
})
