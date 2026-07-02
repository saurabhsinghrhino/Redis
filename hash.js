// ======================================================
// Redis Hashes (hash.js)
// ======================================================
//
// A Redis Hash stores data as Field -> Value pairs.
//
// Think of it like a JavaScript Object.
//
// JavaScript:
//
// const user = {
//     name: "Saurabh",
//     age: 22,
//     city: "Lucknow"
// }
//
// Redis:
//
// user:1
//
// name -> Saurabh
// age  -> 22
// city -> Lucknow
//
// Why use Hashes?
//
// ✔ Store Objects
// ✔ Very Memory Efficient
// ✔ Update Individual Fields
// ✔ No Need to Rewrite Entire Object
//
// Real-world Uses:
//
// ✔ User Profiles
// ✔ Sessions
// ✔ Shopping Cart
// ✔ Product Information
// ✔ Employee Records
//
// ======================================================

const client = require("./client");

async function init() {
  console.log("\n========== REDIS HASHES ==========\n");

  // Remove previous data
  await client.del("user:1");

  // ======================================================
  // 1. HSET
  // ======================================================

  /*
        HSET = Hash Set

        Adds one or more field-value pairs.

        Redis:

        user:1

        name -> Saurabh
        age  -> 22
        city -> Lucknow
    */

  await client.hSet("user:1", {
    name: "Saurabh",
    age: "22",
    city: "Lucknow",
  });

  console.log("User Created");

  // ======================================================
  // 2. HGET
  // ======================================================

  /*
        Returns value of a single field.

        Example

        user:1

        name -> Saurabh

        HGET user:1 name

        Returns

        Saurabh
    */

  const name = await client.hGet("user:1", "name");

  console.log("Name:", name);

  // ======================================================
  // 3. HMGET
  // ======================================================

  /*
        Returns multiple fields.

        Example

        HMGET user:1
        name age city

        Returns

        [
            Saurabh,
            22,
            Lucknow
        ]
    */

  const details = await client.hmGet("user:1", ["name", "age", "city"]);

  console.log("Multiple Fields:", details);

  // ======================================================
  // 4. HGETALL
  // ======================================================

  /*
        Returns the complete object.

        Result

        {
            name: Saurabh,
            age: 22,
            city: Lucknow
        }
    */

  const user = await client.hGetAll("user:1");

  console.log("Complete User:", user);

  // ======================================================
  // 5. HEXISTS
  // ======================================================

  /*
        Checks whether
        a field exists.

        Returns

        true
        false
    */

  const exists = await client.hExists("user:1", "city");

  console.log("City Exists:", exists);

  // ======================================================
  // 6. HDEL
  // ======================================================

  /*
        Deletes one field.

        Before

        name
        age
        city

        Delete

        city

        After

        name
        age
    */

  await client.hDel("user:1", "city");

  console.log("After Delete:", await client.hGetAll("user:1"));

  // ======================================================
  // 7. HKEYS
  // ======================================================

  /*
        Returns every field.

        Result

        [
            name,
            age
        ]
    */

  const keys = await client.hKeys("user:1");

  console.log("Fields:", keys);

  // ======================================================
  // 8. HVALS
  // ======================================================

  /*
        Returns every value.

        Result

        [
            Saurabh,
            22
        ]
    */

  const values = await client.hVals("user:1");

  console.log("Values:", values);

  // ======================================================
  // 9. HLEN
  // ======================================================

  /*
        Returns total number
        of fields.

        Example

        name
        age

        Returns

        2
    */

  const total = await client.hLen("user:1");

  console.log("Total Fields:", total);

  // ======================================================
  // 10. HINCRBY
  // ======================================================

  /*
        Increments a numeric field.

        Before

        age = 22

        HINCRBY age 1

        After

        age = 23
    */

  await client.hIncrBy("user:1", "age", 1);

  console.log("After Increment:", await client.hGetAll("user:1"));

  // ======================================================
  // 11. HSET (Update Existing Field)
  // ======================================================

  /*
        HSET also updates fields.

        Before

        age = 23

        After

        age = 25
    */

  await client.hSet("user:1", "age", "25");

  console.log("Updated User:", await client.hGetAll("user:1"));

  console.log("\n========== END ==========");
}

init();
