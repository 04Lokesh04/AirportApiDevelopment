
const {EntitySchema, JoinColumn} = require('typeorm');
const City = require('./City');
const Country = require('./Country');

module.exports = new EntitySchema({
    name:"Airport",
    tableName:"airport",
    columns:{
        id:{
            primary:true,
            type:'int'
        },
        icao_code:{
            type:"varchar"
        },
        iata_code: {
            type: "varchar",
        },
        name: {
            type: "varchar",
        },
        type: {
            type: "varchar",
        },
        city_id:{
            type:"int",
            nullable:false,
        },
        country_id:{
            type:"int",
            nullable:false,
        },
        continent_id: {
            type: "int",
        },
        website_url: {
            type: "varchar",
            nullable: true,
        },
        created_at: {
            type: "datetime",
            default: () => "CURRENT_TIMESTAMP",
        },
        updated_at: {
            type: "datetime",
            default: () => "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
        },
        latitude_deg: {
            type: "decimal",
        },
        longitude_deg: {
            type: "decimal",
        },
        elevation_ft: {
            type: "int",
        },
        wikipedia_link: {
            type: "varchar",
            nullable: true,
        },
    

    },
    relations:{
        city:{
            type:"many-to-one",
            target:"City",
            joinColumn:{name:"city_id", referencedColumnName: "id"},
            onDelete:"CASCADE"
        },
        country:{
            type:"many-to-one",
            target:"Country",
            joinColumn: { name: "country_id",referencedColumnName: "id"},
            onDelete:"CASCADE"
        },
    },
})
