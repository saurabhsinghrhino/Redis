/**
 * Redis Streams example (Node.js)
 *
 * Demonstrates:
 *  - Adding entries to a stream (XADD)
 *  - Creating a consumer group (XGROUP CREATE)
 *  - Reading as part of a consumer group (XREADGROUP)
 *  - Acknowledging processed entries (XACK)
 *  - Reading pending (unacked) entries (XPENDING / XCLAIM)
 *  - Trimming the stream (XTRIM)
 *
 * Requires: npm install ioredis
 * Run: node redis-streams-example.js
 */

const Redis = require("ioredis");

const STREAM_KEY = "orders";
const GROUP_NAME = "order-processors";
const CONSUMER_NAME = `consumer-${process.pid}`;

async function main() {
  const redis = new Redis(); // defaults to localhost:6379

  // 1. Producer: add a few entries to the stream
  console.log("--- Producing events ---");
  for (let i = 1; i <= 3; i++) {
    const id = await redis.xadd(
      STREAM_KEY,
      "*", // let Redis auto-generate the ID
      "orderId",
      `order-${i}`,
      "amount",
      (Math.random() * 100).toFixed(2),
      "status",
      "created",
    );
    console.log(`Added entry ${id}`);
  }

  // 2. Create a consumer group (ignore error if it already exists)
  try {
    await redis.xgroup("CREATE", STREAM_KEY, GROUP_NAME, "0", "MKSTREAM");
    console.log(`Created consumer group "${GROUP_NAME}"`);
  } catch (err) {
    if (!err.message.includes("BUSYGROUP")) throw err;
    console.log(`Consumer group "${GROUP_NAME}" already exists`);
  }

  // 3. Consumer: read new entries as part of the group
  console.log("\n--- Consuming events ---");
  const results = await redis.xreadgroup(
    "GROUP",
    GROUP_NAME,
    CONSUMER_NAME,
    "COUNT",
    10,
    "STREAMS",
    STREAM_KEY,
    ">", // '>' = only new, undelivered entries
  );

  if (results) {
    const [, entries] = results[0];
    for (const [id, fields] of entries) {
      const data = fieldsToObject(fields);
      console.log(`Processing ${id}:`, data);

      // ... do your processing here ...

      // 4. Acknowledge the entry once processed
      await redis.xack(STREAM_KEY, GROUP_NAME, id);
      console.log(`Acked ${id}`);
    }
  }

  // 5. Inspect pending (delivered but unacked) entries for this group
  const pending = await redis.xpending(STREAM_KEY, GROUP_NAME);
  console.log("\nPending summary:", pending);

  // 6. Trim the stream to the most recent 1000 entries (approximate trimming)
  await redis.xtrim(STREAM_KEY, "MAXLEN", "~", 1000);

  await redis.quit();
}

// Redis returns field/value pairs as a flat array; convert to an object.
function fieldsToObject(fields) {
  const obj = {};
  for (let i = 0; i < fields.length; i += 2) {
    obj[fields[i]] = fields[i + 1];
  }
  return obj;
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
