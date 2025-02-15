const express= require('express')
const airtportController=require("../controllers/airportController")
const router=express.Router()

router.get('/:iata_code', airtportController)

module.exports=router