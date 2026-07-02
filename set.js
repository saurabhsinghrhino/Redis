// ======================================================
// Redis Sets (set.js)
// ======================================================
//
// A Redis Set is an unordered collection of UNIQUE values.
//
// Characteristics:
// ✔ No duplicate values
// ✔ Order is NOT guaranteed
// ✔ Very fast lookups
// ✔ Perfect for unique collections
//
// Real-world Examples:
// ✔ Followers
// ✔ Online Users
// ✔ Tags
// ✔ Roles & Permissions
// ✔ Unique Visitors
//
// ======================================================

const client = require("./client");

async function init() {
  console.log("\n========== REDIS SETS ==========\n");

  // Clean up old data
  await client.del("students");
  await client.del("frontend");
  await client.del("backend");

  // ======================================================
  // 1. SADD
  // ======================================================

  /*
        SADD = Set Add

        Adds one or more members into a Set.

        Duplicate values are ignored.

        Example:

        Before:

        students = {}

        SADD students Rahul

        After:

        {
            Rahul
        }
    */

  await client.sAdd("students", [
    "Rahul",
    "Saurabh",
    "Aman",
    "Rahul", // Duplicate
  ]);

  console.log("Students:", await client.sMembers("students"));

  // ======================================================
  // 2. SMEMBERS
  // ======================================================

  /*
        Returns every value inside the Set.

        Order is NOT guaranteed.

        Possible Output:

        [
            Rahul,
            Aman,
            Saurabh
        ]
    */

  const members = await client.sMembers("students");

  console.log("Members:", members);

  // ======================================================
  // 3. SCARD
  // ======================================================

  /*
        SCARD = Set Cardinality

        Returns total number of UNIQUE members.

        Example:

        Rahul
        Aman
        Saurabh

        Returns

        3
    */

  const total = await client.sCard("students");

  console.log("Total Students:", total);

  // ======================================================
  // 4. SISMEMBER
  // ======================================================

  /*
        Checks whether a member exists.

        Returns:

        true
        false
    */

  const exists = await client.sIsMember("students", "Saurabh");

  console.log("Saurabh Exists:", exists);

  // ======================================================
  // 5. SREM
  // ======================================================

  /*
        Removes a member.

        Before

        Rahul
        Aman
        Saurabh

        Remove

        Aman

        After

        Rahul
        Saurabh
    */

  await client.sRem("students", "Aman");

  console.log("After Remove:", await client.sMembers("students"));

  // ======================================================
  // 6. SPOP
  // ======================================================

  /*
        Removes and returns a RANDOM member.

        Useful when any random value is acceptable.

        Example:

        Set

        Rahul
        Saurabh
        Mohit

        SPOP

        Returns one random member.
    */

  const random = await client.sPop("students");

  console.log("Random Removed:", random);

  console.log(await client.sMembers("students"));

  // ======================================================
  // 7. SRANDMEMBER
  // ======================================================

  /*
        Returns a random member

        WITHOUT removing it.
    */

  await client.sAdd("students", ["Rahul", "Aman", "Mohit"]);

  const randomMember = await client.sRandMember("students");

  console.log("Random Member:", randomMember);

  // ======================================================
  // 8. SUNION
  // ======================================================

  /*
        Combines two Sets.

        Duplicate values appear only once.
    */

  await client.sAdd("frontend", ["HTML", "CSS", "JavaScript", "React"]);

  await client.sAdd("backend", ["Node", "Express", "JavaScript", "MongoDB"]);

  const union = await client.sUnion(["frontend", "backend"]);

  console.log("Union:", union);

  // ======================================================
  // 9. SINTER
  // ======================================================

  /*
        Returns common values.

        frontend

        HTML
        CSS
        JavaScript

        backend

        JavaScript
        Node

        Result

        JavaScript
    */

  const common = await client.sInter(["frontend", "backend"]);

  console.log("Common Skills:", common);

  // ======================================================
  // 10. SDIFF
  // ======================================================

  /*
        Returns values present
        in first Set only.

        frontend

        HTML
        CSS
        JavaScript

        backend

        JavaScript
        Node

        Result

        HTML
        CSS
    */

  const diff = await client.sDiff(["frontend", "backend"]);

  console.log("Difference:", diff);

  // ======================================================
  // 11. SMOVE
  // ======================================================

  /*
        Moves one member
        from one Set to another.

        Before

        frontend

        HTML
        CSS
        React

        backend

        Node

        Move React

        Result

        frontend

        HTML
        CSS

        backend

        Node
        React
    */

  await client.sMove("frontend", "backend", "React");

  console.log("Frontend:", await client.sMembers("frontend"));

  console.log("Backend:", await client.sMembers("backend"));

  console.log("\n========== END ==========");
}

init();
