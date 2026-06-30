const client = require("./client.js");

async function init() {
  // const result = await client.set("messages1", "I'm Good"); // This is to set the key value pairs in redis.
  // await client.get("messages1"); // This is how you get value of any key pair.
  // await client.expire("message1", 10); // This is how you can set TTL ( Time To Live )in any key pair.
  // console.log("Result => ", result);
  //MSET & MGET => set or retrieve multiple string values in a single operation.
  // const result = await client.mSet([
  //   ["bike:1", "Deimos"],
  //   ["bike:2", "Ares"],
  //   ["bike:3", "Vanth"],
  // ]);
  // const res6 = await client.mGet(["bike:1", "bike:2", "bike:3"]);
  // INCR & DECR => It can parse the string value as an integer, increments and decrements it by one and set the obtained value as the new value.
  // 1. INCR
  //   await client.set("total_crashes", 0);
  //   const res7 = await client.incr("total_crashes");
  //   console.log(res7); // return 1
  // 2. DECR
  //   await client.set("total_crashes", 10);
  //   const res7 = await client.decr("total_crashes");
  //   console.log(res7); // return 9
  // INCRBY & DECRBY => That will increment and decrement the value by given value.
  // 1. INCRBY
  //     await client.set("total_crashes", 1);
  //     const res8 = await client.incrBy("total_crashes", 10);
  //     console.log(res8);// return 11
  // 2. DECRBY
  //     await client.set("total_crashes", 10);
  //     const res8 = await client.decrBy("total_crashes", 5);
  //     console.log(res8);// return 5
}
init();
