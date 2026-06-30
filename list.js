// ======================================================
// Import the Redis client
// ======================================================

// This file exports an already connected Redis client.
// (Usually client.js contains createClient() and client.connect())
const client = require("./client.js");

// ======================================================
// Main Function
// ======================================================

async function init() {
  console.log("========== REDIS STRING COMMANDS ==========\n");

  // ======================================================
  // 1. SET
  // ======================================================

  /*
      SET Command

      Syntax:
      SET key value

      Purpose:
      Stores a value inside Redis.

      Example:
      Key   -> "message1"
      Value -> "I'm Good"

      Redis stores everything as a string (unless using other data types).

      Before:
      message1 -> (doesn't exist)

      After:
      message1 -> "I'm Good"
  */

  // await client.set("message1", "I'm Good");

  // ======================================================
  // 2. GET
  // ======================================================

  /*
      GET Command

      Syntax:
      GET key

      Purpose:
      Retrieves the value stored at a key.

      Returns:
      - Stored value
      - null (if key doesn't exist)
  */

  // const message = await client.get("message1");
  // console.log("Message:", message);

  // ======================================================
  // 3. EXPIRE (TTL)
  // ======================================================

  /*
      EXPIRE Command

      Syntax:
      EXPIRE key seconds

      TTL = Time To Live

      It tells Redis to automatically delete
      the key after a certain number of seconds.

      Example:

      message1
         |
         |----> "I'm Good"

      EXPIRE message1 10

      After 10 seconds:

      message1
         |
         |----> Deleted Automatically

      Useful for:
      ✔ OTP
      ✔ Session Tokens
      ✔ Cache
      ✔ Temporary Data
  */

  // await client.expire("message1", 10);

  // Check remaining TTL
  // const ttl = await client.ttl("message1");
  // console.log("Remaining TTL:", ttl);

  // ======================================================
  // 4. MSET (Multiple SET)
  // ======================================================

  /*
      MSET = Multiple SET

      Instead of writing:

      SET bike:1 Deimos
      SET bike:2 Ares
      SET bike:3 Vanth

      We can store all values in one command.

      Advantage:
      ✔ Faster
      ✔ Less Network Calls
  */

  /*
      Database after MSET

      bike:1 -> Deimos
      bike:2 -> Ares
      bike:3 -> Vanth
  */

  // await client.mSet([
  //   ["bike:1", "Deimos"],
  //   ["bike:2", "Ares"],
  //   ["bike:3", "Vanth"],
  // ]);

  // ======================================================
  // 5. MGET (Multiple GET)
  // ======================================================

  /*
      MGET = Multiple GET

      Fetches multiple values in a single request.

      Returns:
      [
        "Deimos",
        "Ares",
        "Vanth"
      ]
  */

  // const bikes = await client.mGet([
  //   "bike:1",
  //   "bike:2",
  //   "bike:3",
  // ]);

  // console.log("Bikes:", bikes);

  // ======================================================
  // 6. INCR
  // ======================================================

  /*
      INCR = Increment by 1

      Works ONLY on numeric string values.

      Redis internally stores:

      total_crashes -> "0"

      INCR

      total_crashes -> "1"

      Useful for:
      ✔ Website Visitors
      ✔ Likes
      ✔ Views
      ✔ Counters
      ✔ API Requests
  */

  // await client.set("total_crashes", 0);

  // const increased = await client.incr("total_crashes");

  // console.log("After INCR:", increased);

  // ======================================================
  // 7. DECR
  // ======================================================

  /*
      DECR = Decrement by 1

      Before:

      total_crashes -> "10"

      After DECR:

      total_crashes -> "9"
  */

  // await client.set("total_crashes", 10);

  // const decreased = await client.decr("total_crashes");

  // console.log("After DECR:", decreased);

  // ======================================================
  // 8. INCRBY
  // ======================================================

  /*
      INCRBY = Increment by any number

      Before:

      total_crashes -> 1

      INCRBY 10

      After:

      total_crashes -> 11
  */

  // await client.set("total_crashes", 1);

  // const incrBy = await client.incrBy("total_crashes", 10);

  // console.log("After INCRBY:", incrBy);

  // ======================================================
  // 9. DECRBY
  // ======================================================

  /*
      DECRBY = Decrement by any number

      Before:

      total_crashes -> 10

      DECRBY 5

      After:

      total_crashes -> 5
  */

  // await client.set("total_crashes", 10);

  // const decrBy = await client.decrBy("total_crashes", 5);

  // console.log("After DECRBY:", decrBy);

  // ======================================================
  // 10. EXISTS
  // ======================================================

  /*
      EXISTS

      Checks whether a key exists.

      Returns:
      1 -> Exists
      0 -> Doesn't Exist
  */

  // const exists = await client.exists("message1");
  // console.log("Exists:", exists);

  // ======================================================
  // 11. DEL
  // ======================================================

  /*
      DEL

      Deletes a key permanently.

      Before:

      message1 -> "I'm Good"

      DEL message1

      After:

      message1 -> null
  */

  // await client.del("message1");

  // ======================================================
  // 12. TYPE
  // ======================================================

  /*
      TYPE

      Tells which datatype a key stores.

      Examples:

      string
      list
      set
      hash
      zset
  */

  // const type = await client.type("bike:1");
  // console.log("Type:", type);

  console.log("\n========== END ==========");
}

// Execute the program
init();
