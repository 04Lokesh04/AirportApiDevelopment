const {DataSource} = require('typeorm')
const Airport = require('../Entities/Airport')
const City = require('../Entities/City')
const Country = require('../Entities/Country')

const AppDataSource= new DataSource({
    type:'sqlite',
    database:'./src/database/database-sqlite',
    entities:[Airport, City, Country],
    synchronize:true,
    logging:"file",
    cache:true


})

module.exports=AppDataSource