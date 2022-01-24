const express = require("express")
const axios = require("axios")
const cors = require("cors")
const path = require("path")

const {GeoCode, GetNearByTouristPlaces} = require("./helpers")

const {MONGO_URI, PORT} = require("./Config/keys")

const app = express()

const port = PORT

app.use(cors())
app.use(express.json())

app.get("/GetNearByTouristPlaces", async (req, res) => {
  console.log("route hitting", req.query)

  const {lat, long} = req.query

  const latitude = lat

  const longitude = long

  console.log(latitude, typeof latitude)

  try {
    const response = await axios.get(
      `https://api.tomtom.com/search/2/poiSearch/tourist attraction.json?key=utQHsOJFx99x4BwG8NUuAa3QQ1MR5FBG&=&limit=10&lat=${latitude}&lon=${longitude}&radius=50000`
    )


    console.log("seeing response", response.data)
    
    res.send(response.data)
  } catch (err) {
    console.log("error ", err)
    res.status(400).send()
  }
})

app.get("/nearByTouristPlacesOfPerticularAddress", async (req, res) => {
  console.log("route hitting by static address", req.query)

  const {address} = req.query

  console.log(address)

  try {
    GeoCode(address, (err, coordinates, place_name) => {
      if (err) {
        return res.send(400).send({
          error: err,
        })
      }
      console.log("coordinates", coordinates, place_name)

      const latitude = coordinates[1]
      const longitude = coordinates[0]

      GetNearByTouristPlaces(latitude, longitude, place_name, (err, data) => {
        if (err) {
          return res.send({error: err})
        }

        res.send(data.data)
      })
    })
  } catch (err) {
    console.log("error ", err)
    res.status(400).send()
  }
})

app.get("/GetTouristPlaceDetails", async (req, res) => {
  console.log("route hitting 1", req.params)

  //   const {lat, long} = req.query

  const id = "356008000000071"

  //   const longitude = long

  try {
    const response = await axios.get(
      `https://api.tomtom.com/search/2/place.json?entityId=${id}&key=utQHsOJFx99x4BwG8NUuAa3QQ1MR5FBG&language=NGT`
    )
    console.log("seeing response", response.data)
    delete response.data.summary.queryType
    res.send(response.data)
  } catch (err) {
    console.log("error ", err)
    res.status(400).send()
  }
})

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

app.listen(port, () => console.log("server listening at port", PORT))
