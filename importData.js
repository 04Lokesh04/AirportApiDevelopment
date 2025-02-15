const csvParser = require('csv-parser');
const fs = require('fs');
const AppDataSource = require('./src/database/DataSource');
const Airport = require('./src/Entities/Airport');
const City = require('./src/Entities/City');
const Country = require('./src/Entities/Country');

async function importData() {
    try {
        // Initialize the database connection
        await AppDataSource.initialize();
        console.log("Database connected in importData.js");

        // Get repositories for Airport, City, and Country
        const airportRepository = AppDataSource.getRepository(Airport);
        const cityRepository = AppDataSource.getRepository(City);
        const countryRepository = AppDataSource.getRepository(Country);

        // Import Countries
        const countries = [];
        await new Promise((resolve, reject) => {
            fs.createReadStream("./data/Database - country.csv")
                .pipe(csvParser())
                .on("data", (row) => countries.push(row))
                .on("end", () => resolve())
                .on("error", (error) => reject(error));
        });
        await countryRepository.save(countries);
        console.log("Countries data imported");

        // Import Cities
        const cities = [];
        await new Promise((resolve, reject) => {
            fs.createReadStream("./data/Database - city.csv")
                .pipe(csvParser())
                .on("data", (row) => cities.push(row))
                .on("end", () => resolve())
                .on("error", (error) => reject(error));
        });
        await cityRepository.save(cities);
        console.log("Cities data imported");

        // Import Airports
        const airports = [];
        await new Promise((resolve, reject) => {
            fs.createReadStream("./data/Database - airport.csv")
                .pipe(csvParser())
                .on("data", async (row) => {
                    // Convert city_id and country_id to integers
                    row.city_id = parseInt(row.city_id, 10);
                    row.country_id = parseInt(row.country_id, 10);

                    // Check if city_id exists in the city table
                    const cityExists = await cityRepository.findOne({ where: { id: row.city_id } });
                    if (!cityExists) {
                        console.error(`City with id ${row.city_id} does not exist. Skipping airport:`, row.name);
                        return;
                    }

                    // Check if country_id exists in the country table
                    const countryExists = await countryRepository.findOne({ where: { id: row.country_id } });
                    if (!countryExists) {
                        console.error(`Country with id ${row.country_id} does not exist. Skipping airport:`, row.name);
                        return;
                    }

                    // Add the validated row to the airports array
                    airports.push(row);
                })
                .on("end", () => resolve())
                .on("error", (error) => reject(error));
        });

        // Save the validated airports data into the airport table
        await airportRepository.save(airports);
        console.log("Airports data imported");

    } catch (error) {
        console.error("Error while importing data:", error);
        process.exit(1);
    }
}

// Run the importData function
importData();