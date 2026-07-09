// ======================================================
// Redis Bitmaps (bitmap.js)
// ======================================================
//
// A Bitmap is simply a Redis String where
// every bit can be individually modified.
//
// Each bit has only two values:
//
// 0 -> OFF / False
// 1 -> ON / True
//
// Real-world Uses:
//
// ✔ User Login Tracking
// ✔ Attendance
// ✔ Online Status
// ✔ Feature Flags
//
// ======================================================

const client = require("./client");

async function init() {
  console.log("\n========== REDIS BITMAPS ==========\n");

  await client.del("attendance");

  // ======================================================
  // 1. SETBIT
  // ======================================================

  /*
        SETBIT key offset value

        offset = Bit Position

        value = 0 or 1
    */

  await client.setBit("attendance", 0, 1);
  await client.setBit("attendance", 1, 0);
  await client.setBit("attendance", 2, 1);
  await client.setBit("attendance", 3, 1);

  console.log("Attendance Bitmap Created.");

  // ======================================================
  // 2. GETBIT
  // ======================================================

  /*
        Returns value at
        a specific bit.

        0 = Absent

        1 = Present
    */

  const student0 = await client.getBit("attendance", 0);

  const student1 = await client.getBit("attendance", 1);

  console.log("Student 0:", student0);

  console.log("Student 1:", student1);

  // ======================================================
  // 3. BITCOUNT
  // ======================================================

  /*
        Counts total bits
        that are equal to 1.
    */

  const present = await client.bitCount("attendance");

  console.log("Present Students:", present);

  // ======================================================
  // 4. BITPOS
  // ======================================================

  /*
        Finds first occurrence
        of a bit.

        Example:

        Find first 1.
    */

  const firstPresent = await client.bitPos("attendance", 1);

  console.log("First Present Student:", firstPresent);

  // ======================================================
  // 5. BITOP
  // ======================================================

  /*
        Performs bitwise
        operations.

        Supported:

        AND
        OR
        XOR
        NOT
    */

  await client.del("day1");
  await client.del("day2");

  // Day 1 Attendance
  await client.setBit("day1", 0, 1);
  await client.setBit("day1", 1, 1);
  await client.setBit("day1", 2, 0);

  // Day 2 Attendance
  await client.setBit("day2", 0, 1);
  await client.setBit("day2", 1, 0);
  await client.setBit("day2", 2, 1);

  // ======================================================
  // BITOP AND
  // ======================================================

  /*
        Only students
        present on BOTH days.

        Day1

        110

        Day2

        101

        AND

        100
    */

  await client.bitOp("AND", "commonAttendance", ["day1", "day2"]);

  console.log("AND Result:", await client.get("commonAttendance"));

  // ======================================================
  // BITOP OR
  // ======================================================

  /*
        Present on
        at least one day.
    */

  await client.bitOp("OR", "allAttendance", ["day1", "day2"]);

  console.log("OR Result:", await client.get("allAttendance"));

  // ======================================================
  // BITOP XOR
  // ======================================================

  /*
        Present on
        exactly one day.
    */

  await client.bitOp("XOR", "xorAttendance", ["day1", "day2"]);

  console.log("XOR Result:", await client.get("xorAttendance"));

  // ======================================================
  // BITOP NOT
  // ======================================================

  /*
        Inverts bits.

        110

        becomes

        001
    */

  await client.bitOp("NOT", "notAttendance", ["day1"]);

  console.log("NOT Result:", await client.get("notAttendance"));

  console.log("\n========== END ==========");
}

init();
