const AppDataSource = require("../database/DataSource")
const Airport = require("../Entities/Airport")

const airtportController=async (req, res)=>{
    const {iata_code}=req.params
    const airportRepo=AppDataSource.getRepository(Airport)
    try{
        const airport=await airportRepo
        .createQueryBuilder("airport")
        .leftJoinAndSelect("airport.city", "city")
        .leftJoinAndSelect("city.country", "country")
        .where("airport.iata_code= :iata_code", {iata_code})
        .getOne()
        if (!airport){
            return res.status(404).json(null)
        }
        const formattedResponse = {
            airport: {
              id: airport.id,
              icao_code: airport.icao_code,
              iata_code: airport.iata_code,
              name: airport.name,
              type: airport.type,
              latitude_deg: airport.latitude_deg,
              longitude_deg: airport.longitude_deg,
              elevation_ft: airport.elevation_ft,
              address: {
                city: {
                  id: airport.city.id,
                  name: airport.city.name,
                  country_id: airport.city.country.id,
                  is_active: airport.city.is_active,
                  lat: airport.city.lat,
                  long: airport.city.long,
                },
                country: {
                  id: airport.city.country.id,
                  name: airport.city.country.name,
                  country_code_two: airport.city.country.country_code_two,
                  country_code_three: airport.city.country.country_code_three,
                  mobile_code: airport.city.country.mobile_code,
                  continent_id: airport.city.country.continent_id,
                },
              },
            },
          };
      
        res.status(200).json(formattedResponse)

    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }

}

module.exports=airtportController