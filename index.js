const {
  syncDatabase,
  createCommit,
  getAllCommits,
  getUniqueAddresses,
  countAllCommits,
  getCommitsByAddress,
  getCommitBySignature,
  getHashtags,
  deleteOldCommits,
} = require("./modules/db");

const { app, port } = require("./modules/server");

syncDatabase();

app.get("/commits/:offset", async (req, res) => {
  const offset = req.params.offset || 0;
  const commits = await getAllCommits(offset);
  res.json(commits);
});

app.get("/commits/signature/:signature", async (req, res) => {
  const signature = req.params.signature;
  const commit = await getCommitBySignature(signature);
  res.json(commit);
});

app.get("/commits/address/:address", async (req, res) => {
  const address = req.params.address;
  const commits = await getCommitsByAddress(address);
  res.json(commits);
});

app.get("/addresses", async (req, res) => {
  const uniqueAddresses = await getUniqueAddresses();
  res.json(uniqueAddresses);
});

app.get("/count", async (req, res) => {
  const count = await countAllCommits();
  res.json({ count });
});

app.get("/hashtags", async (req, res) => {
  const hashtags = await getHashtags();
  res.json(hashtags);
});

// required routes

app.get("/", (req, res) => {
  deleteOldCommits(400);

  res.json({
    time: new Date(),
    guide: "https://github.com/AlbertiProtocol/pool",
  });
});

app.post("/commit", async (req, res) => {
  const { commitAt, data, publicKey, signature, type } = req.body;

  if (!data || !publicKey || !signature || !type) {
    return res
      .status(400)
      .send(
        "Missing required fields: address, data, publicKey, signature, type"
      );
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
      type
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
