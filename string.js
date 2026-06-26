const client = require("./client.js");

async function init() {
  //   await client.set("message:4", "Hey there!");
//   await client.expire("message:4", 10);

  const result = await client.get("message:4");
  console.log("Result => ", result);
}
init();
