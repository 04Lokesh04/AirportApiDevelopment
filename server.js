const express= require('express')
const airportroute=require("./src/routes/airportroute")
const dotenv= require('dotenv')
const AppDataSource=require("./src/database/DataSource")
dotenv.config()
const app=express()

const PORT=process.env.PORT || 3000

app.use('/api/airport/',airportroute)

AppDataSource.initialize().then(()=>{
    console.log("Database is connnected")
    app.listen(PORT, ()=>{
        console.log(`server is running at ${PORT}`)
    })

}).catch((error)=>{
    console.error("Database not connected", error)
})
