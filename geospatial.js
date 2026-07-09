// ======================================================
// Redis Geospatial (geo.js)
// ======================================================
//
// Redis Geospatial stores locations
// using:
//
// Latitude
// Longitude
//
// Real-world Uses:
//
// ✔ Uber Drivers
// ✔ Nearby Restaurants
// ✔ Hospitals
// ✔ Delivery Partners
// ✔ GPS Tracking
//
// ======================================================

const client = require("./client");

async function init() {
  console.log("\n========== REDIS GEOSPATIAL ==========\n");

  // Remove previous data
  await client.del("cities");

  // ======================================================
  // 1. GEOADD
  // ======================================================

  /*
        Adds locations.

        Syntax

        GEOADD key
        longitude latitude member
    */

  await client.geoAdd("cities", [
    {
      longitude: 77.209,
      latitude: 28.6139,
      member: "Delhi",
    },
    {
      longitude: 72.8777,
      latitude: 19.076,
      member: "Mumbai",
    },
    {
      longitude: 88.3639,
      latitude: 22.5726,
      member: "Kolkata",
    },
    {
      longitude: 80.2707,
      latitude: 13.0827,
      member: "Chennai",
    },
  ]);

  console.log("Cities Added.");

  // ======================================================
  // 2. GEOPOS
  // ======================================================

  /*
        Returns longitude
        and latitude
        of a member.
    */

  const delhi = await client.geoPos("cities", "Delhi");

  console.log("Delhi Position:", delhi);

  // ======================================================
  // 3. GEODIST
  // ======================================================

  /*
        Returns distance
        between two members.

        Units:

        m
        km
        mi
        ft
    */

  const distance = await client.geoDist("cities", "Delhi", "Mumbai", "km");

  console.log("Delhi -> Mumbai:", distance, "KM");

  // ======================================================
  // 4. GEOSEARCH
  // ======================================================

  /*
        Find nearby members.

        Search within
        1500 KM
        from Delhi.
    */

  const nearby = await client.geoSearch(
    "cities",
    {
      longitude: 77.209,
      latitude: 28.6139,
    },
    {
      radius: 1500,
      unit: "km",
    },
  );

  console.log("Nearby Cities:", nearby);

  // ======================================================
  // 5. GEOSEARCH FROM MEMBER
  // ======================================================

  /*
        Search around
        an existing member.
    */

  const nearbyFromDelhi = await client.geoSearch(
    "cities",
    {
      member: "Delhi",
    },
    {
      radius: 1500,
      unit: "km",
    },
  );

  console.log("Nearby From Delhi:", nearbyFromDelhi);

  // ======================================================
  // 6. GEOHASH
  // ======================================================

  /*
        Returns Geohash.

        Geohash is a
        compact encoded
        representation
        of a location.
    */

  const hash = await client.geoHash("cities", "Delhi");

  console.log("Delhi Geohash:", hash);

  console.log("\n========== END ==========");
}

init();
