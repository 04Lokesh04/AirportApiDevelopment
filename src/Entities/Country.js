const { EntitySchema } = require('typeorm');
const City = require('./City');
const Airport = require('./Airport');

module.exports = new EntitySchema({
    name: "Country",
    tableName: "country",
    columns: {
        id: {
            primary: true,
            type: "int",
        },
        name: {
            type: "varchar",
        },
        alt_name: {
            type: "varchar",
            nullable: true,
        },
        country_code_two: {
            type: "varchar",
            length: 2,
            nullable:true,
        },
        country_code_three: {
            type: "varchar",
            length: 3,
            nullable:true,
        },
        flag_app: {
            type: "varchar",
            nullable:true,
        },
        mobile_code: {
            type: "int",
            nullable:true,
        },
        continent_id: {
            type: "int",
            nullable:true,
        },
        country_flag: {
            type: "varchar",
            nullable:true,
        },
    },
    relations: {
        cities: {
            type: "one-to-many",
            target: "City",
            inverseSide: "country",
            cascade: true,
            onDelete: "CASCADE",
        },
        airports: {
            type: "one-to-many",
            target: "Airport",
            inverseSide: "country",
            cascade: true,
            onDelete: "CASCADE",
        },
    },
});
