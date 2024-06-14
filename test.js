const post_tags = [
  "love",
  "instagood",
  "photooftheday",
  "fashion",
  "beautiful",
  "happy",
  "cute",
  "tbt",
  "like4like",
  "followme",
  "picoftheday",
  "follow",
  "me",
  "selfie",
  "summer",
  "art",
  "instadaily",
  "friends",
  "repost",
  "nature",
  "girl",
  "fun",
  "style",
  "smile",
  "food",
  "instalike",
  "family",
  "travel",
  "fitness",
  "igers",
  "tagsforlikes",
  "nofilter",
  "life",
  "beauty",
  "amazing",
  "sun",
  "instagram",
  "photography",
  "vscocam",
  "music",
  "follow4follow",
  "ootd",
  "makeup",
  "vsco",
  "swag",
  "l4l",
  "f4f",
  "pretty",
  "model",
  "motivation",
  "party",
  "design",
  "instapic",
  "cool",
  "baby",
  "dog",
  "lol",
  "funny",
  "instacool",
  "girls",
  "hair",
  "beach",
  "sunrise",
  "night",
  "bestoftheday",
  "sky",
  "photo",
  "clouds",
  "sunset",
  "handmade",
  "followback",
  "fitfam",
  "instafollow",
  "drawing",
  "black",
  "white",
  "pink",
  "blue",
  "red",
  "green",
  "artistic",
  "instaart",
  "illustration",
  "instapicture",
  "fashionista",
  "home",
  "christmas",
  "newyear",
  "happynewyear",
  "holiday",
  "snow",
  "winter",
  "spring",
  "autumn",
  "summer",
  "fall",
];

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
  const priceBTC = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
  );

  const post_content = "Bitcoin Price : " + priceBTC.data.bitcoin.usd;

  const postdata = postTemplate(
    post_content,
    post_tags.sort(() => Math.random() - 0.5).slice(0, 2)
  );

  const bodydata = createCommit(privateKey, postdata, "post");

  try {
    const response = await axios.post(pool + "/commit", bodydata);

    console.log(response.status);
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

setInterval(createPost, 1000 * 30);
