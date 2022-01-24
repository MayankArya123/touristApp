const axios = require("axios")


const GetNearByTouristPlaces = async (latitude, longitude, placename, cb) => {
  console.log(latitude)
  console.log(longitude)

  const response = await axios.get(
    `https://api.tomtom.com/search/2/poiSearch/tourist attraction.json?key=utQHsOJFx99x4BwG8NUuAa3QQ1MR5FBG&=&limit=10&lat=${latitude}&lon=${longitude}&radius=50000`
  )

  if (response.data.summary) {
    console.log("seeing response    jjjjjjjjjjjjjjjjj", response.data.summary)
    response.data.summary.placeName = placename
    delete response.data.summary.queryType
    // const { ,...rest } = response.data
    console.log(response.data.summary)

    // const DistanceResponse = await axios.get(
    //     `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=22.95456,76.042034&destinations=22.96974,76.06057&departure_time=now&key=b0VzzHpdfJzjGuQukhVIGv5ci6gkZ`
    //   )
   
    //   console.log('distance response',DistanceResponse.data.rows[0].elements[0].distance.text)
    //   console.log('distance response',DistanceResponse.data.rows[0].elements[0].duration.text)

    //   response.data.summary.distance = DistanceResponse.data.rows[0].elements[0].distance.text
    //   response.data.summary.duration = DistanceResponse.data.rows[0].elements[0].duration.text

    cb(undefined, response)
  } else {
    // console.log('dddddd',response);
    cb("something went wrong")
  }
}

const GeoCode = (address, cb) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoibWF5YW5rMTI0IiwiYSI6ImNreTlwdXBldjA4aGoyb29jbjd5ZW16cnAifQ.7InN2qkKmpdcSiHYknzJkQ"

  axios
    .get(url)
    .then(({data}) => {
      if (data.features.length > 0) {
        console.log(
          "response",
          data.features[0].center,
          data.features[0].place_name
        )
        const {center, place_name} = data.features[0]
        cb(undefined, center, place_name)
      } else {
        console.log("unable to find location")
        cb("unable to find location")
      }
    })
    .catch((err) => {
      if (err) {
        if (err) {
          if (err.response) {
            console.log(err.response.data.message)
            cb(err.response.data.message)
          } else {
            console.log("network -error", err)
            cb("network error")
          }
        }
      }
    })
}


module.exports ={GeoCode,GetNearByTouristPlaces}