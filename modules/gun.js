const Gun = require("gun");

const gun = Gun([
  "http://localhost:8765/gun",
  "https://gun-manhattan.herokuapp.com/gun",
]);

function broadcastme() {
  gun
    .get("albertipools")
    .set({ node: nodeurl, difficulty: difficulty }, (ack) => {
      if (ack.err) {
        console.error(ack.err);
      } else {
        console.log("Node URL Broadcasted......");
      }
    });
}

exports.broadcastme = broadcastme;
exports.gun = gun;
