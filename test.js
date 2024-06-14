const {
  postTemplate,
  createCommit,
  createIdentity,
} = require("alberti-protocol-sdk");

const axios = require("axios");

const pool = "http://127.0.0.1:5467";

const identity = createIdentity();

const privateKey = identity.privateKey;

async function createPost() {
  // get bitcoin price
  const priceBTC = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
  );

  const post_content = "Bitcoin Price : " + priceBTC.data.bitcoin.usd;
  const post_tags = ["bitcoin", "cryptocurrency"];

  const postdata = postTemplate(post_content, post_tags);

  const bodydata = createCommit(privateKey, postdata, "post");

  try {
    const response = await axios.post(pool + "/commit", bodydata);

    console.log(response.status);
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

async function getCommits() {
  try {
    const response = await axios.get(pool + "/commits");

    console.log(response.data);
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

// getCommits();

createPost();
