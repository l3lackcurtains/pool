const {
  syncDatabase,
  createCommit,
  getAllCommits,
  getUniqueAddresses,
  countAllCommits,
  getCommitBySignature,
  getHashtags,
} = require("./modules/db");

const { app, port } = require("./modules/server");

const { verifyCommit } = require("alberti-protocol-sdk");

const difficulty = process.env.ALBERTI_DIFFICULTY || 3;

syncDatabase();

app.get("/commits/:offset", async (req, res) => {
  const offset = req.params.offset || 0;
  const address = req.query.address || false;
  const commits = await getAllCommits(offset, address);
  res.json(commits);
});

app.get("/signature/:signature", async (req, res) => {
  const signature = req.params.signature;
  const commit = await getCommitBySignature(signature);
  res.json(commit);
});

app.get("/addresses", async (req, res) => {
  const uniqueAddresses = await getUniqueAddresses();
  res.json(uniqueAddresses);
});

app.get("/hashtags", async (req, res) => {
  const hashtags = await getHashtags();
  res.json(hashtags);
});

app.get("/", async (req, res) => {
  const count = await countAllCommits();

  res.json({
    time: new Date(),
    totalCommits: count,
    difficulty: difficulty,
    guide: "https://github.com/AlbertiProtocol/pool",
  });
});

app.post("/commit", async (req, res) => {
  const { commitAt, data, publicKey, signature, type, nonce } = req.body;

  if (!commitAt || !data || !publicKey || !signature || !type || !nonce) {
    return res.status(400).send("Missing required fields");
  }

  if (!verifyCommit(req.body, difficulty)) {
    return res.status(400).send("Invalid signature");
  }

  let dynamicData = {};
  if (data && typeof data === "object") {
    dynamicData = data;
  }

  try {
    const commit = await createCommit(
      commitAt,
      signature,
      dynamicData,
      publicKey,
      type,
      nonce
    );

    res.json(commit);
  } catch (error) {
    console.error("Error creating commit:", error);
    res.status(500).send("Failed to create commit");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at ${port}`);
});
