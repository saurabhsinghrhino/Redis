// ======================================================
// Redis Lists (list.js)
// ======================================================
//
// A Redis List is an ordered collection of elements.
//
// Think of it like:
//
// [
//   "A",
//   "B",
//   "C",
//   "D"
// ]
//
// Features:
// ✔ Maintains insertion order
// ✔ Allows duplicate values
// ✔ Fast insertion/removal at both ends
// ✔ Implemented as a Doubly Linked List internally
//
// Common Use Cases:
// ✔ Chat Messages
// ✔ Notifications
// ✔ Recent Searches
// ✔ Task Queue
// ✔ Job Processing
// ✔ Activity Logs
//
// ======================================================

const client = require("./client");

async function init() {
  console.log("\n========== REDIS LIST ==========\n");

  // Always start with a clean list
  await client.del("fruits");

  // ======================================================
  // 1. LPUSH
  // ======================================================

  /*
        LPUSH = Left Push

        Inserts element at the beginning (left side).

        Before:

        []

        LPUSH Apple

        After:

        ["Apple"]
    */

  await client.lPush("fruits", "Apple");

  console.log("After LPUSH Apple:", await client.lRange("fruits", 0, -1));

  // ======================================================
  // 2. LPUSH Multiple Values
  // ======================================================

  /*
        LPUSH can insert multiple values.

        Current:

        ["Apple"]

        LPUSH Mango Banana Orange

        Every new value is pushed to the LEFT.

        Final:

        [
          "Orange",
          "Banana",
          "Mango",
          "Apple"
        ]
    */

  await client.lPush("fruits", "Mango", "Banana", "Orange");

  console.log("After Multiple LPUSH:", await client.lRange("fruits", 0, -1));

  // ======================================================
  // 3. RPUSH
  // ======================================================

  /*
        RPUSH = Right Push

        Adds element at the END of the list.

        Current:

        [
          "Orange",
          "Banana",
          "Mango",
          "Apple"
        ]

        RPUSH Grapes

        Result:

        [
          "Orange",
          "Banana",
          "Mango",
          "Apple",
          "Grapes"
        ]
    */

  await client.rPush("fruits", "Grapes");

  console.log("After RPUSH:", await client.lRange("fruits", 0, -1));

  // ======================================================
  // 4. LRANGE
  // ======================================================

  /*
        LRANGE

        Returns elements between indexes.

        Syntax:

        LRANGE key start stop

        Indexes:

        0  1  2  3  4
        O  B  M  A  G

        0  -> First Element

        -1 -> Last Element

        -2 -> Second Last

        Examples:

        LRANGE fruits 0 -1
        => Entire List

        LRANGE fruits 0 2
        => First 3 Elements
    */

  const list = await client.lRange("fruits", 0, -1);

  console.log("Entire List:", list);

  // ======================================================
  // 5. LLEN
  // ======================================================

  /*
        LLEN

        Returns total number of elements.

        Example:

        [
          Apple
          Mango
          Banana
        ]

        LLEN

        Returns:

        3
    */

  const length = await client.lLen("fruits");

  console.log("Length:", length);

  // ======================================================
  // 6. LPOP
  // ======================================================

  /*
        Removes first element.

        Current:

        [
          Orange,
          Banana,
          Mango,
          Apple,
          Grapes
        ]

        LPOP

        Removes:

        Orange
    */

  const left = await client.lPop("fruits");

  console.log("Removed Left:", left);

  console.log(await client.lRange("fruits", 0, -1));

  // ======================================================
  // 7. RPOP
  // ======================================================

  /*
        Removes last element.

        Current:

        [
          Banana,
          Mango,
          Apple,
          Grapes
        ]

        RPOP

        Removes:

        Grapes
    */

  const right = await client.rPop("fruits");

  console.log("Removed Right:", right);

  console.log(await client.lRange("fruits", 0, -1));

  // ======================================================
  // 8. LINDEX
  // ======================================================

  /*
        Returns value at given index.

        Example:

        [
          Banana,
          Mango,
          Apple
        ]

        LINDEX 1

        Returns:

        Mango
    */

  const second = await client.lIndex("fruits", 1);

  console.log("Index 1:", second);

  // ======================================================
  // 9. LSET
  // ======================================================

  /*
        Replace value at index.

        Before:

        [
          Banana,
          Mango,
          Apple
        ]

        LSET index 1 Kiwi

        After:

        [
          Banana,
          Kiwi,
          Apple
        ]
    */

  await client.lSet("fruits", 1, "Kiwi");

  console.log("After LSET:", await client.lRange("fruits", 0, -1));

  // ======================================================
  // 10. LREM
  // ======================================================

  /*
        Remove matching values.

        Syntax:

        LREM key count value

        count > 0

        Removes from LEFT

        count < 0

        Removes from RIGHT

        count = 0

        Removes ALL occurrences
    */

  await client.rPush("fruits", "Apple");
  await client.rPush("fruits", "Apple");

  console.log("Before LREM:", await client.lRange("fruits", 0, -1));

  await client.lRem("fruits", 0, "Apple");

  console.log("After LREM:", await client.lRange("fruits", 0, -1));

  // ======================================================
  // 11. LTRIM
  // ======================================================

  /*
        Keep only selected indexes.

        Example:

        Current:

        [
          A
          B
          C
          D
          E
        ]

        LTRIM 0 2

        Result:

        [
          A
          B
          C
        ]

        Useful for:

        ✔ Keep latest 100 logs
        ✔ Keep latest notifications
    */

  await client.del("numbers");

  await client.rPush("numbers", 1, 2, 3, 4, 5, 6, 7);

  console.log("Numbers:", await client.lRange("numbers", 0, -1));

  await client.lTrim("numbers", 0, 2);

  console.log("After LTRIM:", await client.lRange("numbers", 0, -1));

  // ======================================================
  // 12. RPOPLPUSH
  // ======================================================

  /*
        Moves last element from one list
        to another list.

        Source:

        queue

        Destination:

        processing

        Used in Job Queues.
    */

  await client.del("queue");
  await client.del("processing");

  await client.rPush("queue", "Job1", "Job2", "Job3");

  const moved = await client.rPopLPush("queue", "processing");

  console.log("Moved Job:", moved);

  console.log("Queue:", await client.lRange("queue", 0, -1));

  console.log("Processing:", await client.lRange("processing", 0, -1));

  console.log("\n========== END ==========\n");
}

init();
