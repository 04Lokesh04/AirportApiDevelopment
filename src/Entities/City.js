const { EntitySchema } = require('typeorm');
const Airport = require('./Airport');
const Country = require('./Country');

module.exports = new EntitySchema({
    name: "City",
    tableName: "city",
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
        country_id:{
            type:"int",
            nullable:false,
        },
        is_active: {
            type: "boolean",
            default: true,
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
        lat: {
            type: "decimal",
        },
        long: {
            type: "decimal",
        },
    },
    relations: {
        country: {
            type: "many-to-one",
            target: "Country",
            joinColumn: { name: "country_id",referencedColumnName: "id"},
            onDelete: "CASCADE",
        },
        airports: {
            type: "one-to-many",
            target: "Airport",
            inverseSide: "city",
            cascade: true,
        },
    },
});

