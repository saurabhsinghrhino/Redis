// ======================================================
// Redis Sorted Sets (sortedSet.js)
// ======================================================
//
// A Sorted Set stores UNIQUE members with a SCORE.
//
// Member + Score
//
// Example:
//
// leaderboard
//
// Alex      -> 1200
// Rahul     -> 950
// Saurabh   -> 800
//
// Redis automatically sorts
// according to the score.
//
// Real-world Uses:
//
// ✔ Game Leaderboards
// ✔ Trending Posts
// ✔ Student Rankings
// ✔ Priority Queues
// ✔ Recommendation Systems
//
// ======================================================

const client = require("./client");

async function init() {
  console.log("\n========== REDIS SORTED SET ==========\n");

  // Remove previous leaderboard
  await client.del("leaderboard");

  // ======================================================
  // 1. ZADD
  // ======================================================

  /*
        ZADD = Sorted Set Add

        Syntax:

        Member + Score

        Redis automatically
        sorts members according
        to score.
    */

  await client.zAdd("leaderboard", [
    { score: 850, value: "Saurabh" },
    { score: 1200, value: "Alex" },
    { score: 650, value: "Rahul" },
    { score: 950, value: "Aman" },
  ]);

  console.log("Leaderboard Created.");

  // ======================================================
  // 2. ZRANGE
  // ======================================================

  /*
        Returns members
        from lowest score
        to highest score.

        Index:

        0
        1
        2
        3
    */

  const players = await client.zRange("leaderboard", 0, -1);

  console.log("Players:", players);

  // ======================================================
  // 3. ZRANGE WITH SCORES
  // ======================================================

  /*
        Returns both

        Member
        Score
    */

  const withScores = await client.zRangeWithScores("leaderboard", 0, -1);

  console.log(withScores);

  // ======================================================
  // 4. ZREVRANGE
  // ======================================================

  /*
        Highest Score

                ↓

        Lowest Score

        Used in Leaderboards.
    */

  const topPlayers = await client.zRevRange("leaderboard", 0, 2);

  console.log("Top Players:", topPlayers);

  // ======================================================
  // 5. ZSCORE
  // ======================================================

  /*
        Returns score
        of one member.
    */

  const score = await client.zScore("leaderboard", "Saurabh");

  console.log("Saurabh Score:", score);

  // ======================================================
  // 6. ZRANK
  // ======================================================

  /*
        Returns ranking
        from LOWEST score.

        Lowest

        Rank 0
    */

  const rank = await client.zRank("leaderboard", "Saurabh");

  console.log("Saurabh Rank:", rank);

  // ======================================================
  // 7. ZREVRANK
  // ======================================================

  /*
        Returns ranking
        from HIGHEST score.

        Highest

        Rank 0
    */

  const reverseRank = await client.zRevRank("leaderboard", "Saurabh");

  console.log("Leaderboard Rank:", reverseRank);

  // ======================================================
  // 8. ZINCRBY
  // ======================================================

  /*
        Increase score.

        Example

        Saurabh

        850

        +

        100

        =

        950
    */

  await client.zIncrBy("leaderboard", 100, "Saurabh");

  console.log(await client.zRangeWithScores("leaderboard", 0, -1));

  // ======================================================
  // 9. ZREM
  // ======================================================

  /*
        Removes a member.
    */

  await client.zRem("leaderboard", "Rahul");

  console.log("After Remove:", await client.zRange("leaderboard", 0, -1));

  // ======================================================
  // 10. ZCARD
  // ======================================================

  /*
        Returns total
        number of members.
    */

  const total = await client.zCard("leaderboard");

  console.log("Total Players:", total);

  // ======================================================
  // 11. ZCOUNT
  // ======================================================

  /*
        Count members
        whose score lies
        between a range.
    */

  const count = await client.zCount("leaderboard", 800, 1200);

  console.log("Players between 800-1200:", count);

  // ======================================================
  // 12. ZPOPMAX
  // ======================================================

  /*
        Removes highest
        scored member.
    */

  const highest = await client.zPopMax("leaderboard");

  console.log("Highest Removed:", highest);

  // ======================================================
  // 13. ZPOPMIN
  // ======================================================

  /*
        Removes lowest
        scored member.
    */

  const lowest = await client.zPopMin("leaderboard");

  console.log("Lowest Removed:", lowest);

  console.log("\nFinal Leaderboard:");

  console.log(await client.zRangeWithScores("leaderboard", 0, -1));

  console.log("\n========== END ==========");
}

init();
