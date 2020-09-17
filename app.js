const express = require("express");

const app = express();

var dogJson = [
  { name: "Fido", breed: "Border Terrier", childFriendly: true },
  { name: "Butch", breed: "Poodle", childFriendly: true },
  { name: "Patch", breed: "Poodle", childFriendly: false }
];

app.get("/test", (req, resp) => {
  console.info(req.method);
  console.info("Test Request");
  resp.send("Hello from Test");
});

app.get("/staff", (req, resp) => {
  resp.send("<h1>Hello all staff</h1>");
});

app.get("/api/dogData", (req, resp) => {
  resp.json(dogJson);
});

app.get("/api/dogData/:dogID", (req, res) => {
  //   res.send(req.params.dogID);
  var dogData = dogJson[req.params.dogID];
  res.json(dogData);
});

app.get("/somepath/:somevalue1/:somevalue2", (req, res) => {
  // Use req.params.somevalue1 to retrieve the value1;
  // Use req.params.somevalue2 to retrieve the value2;
  var someval1 = req.params.somevalue1;
  var someval2 = req.params.somevalue2;
  res.send(`This is ${someval1} and this is ${someval2}`);
});

app.get("/api/chooseDog/:breed/:friendly", (req, res) => {
  var dogBreed = req.params.breed;
  dogBreed = dogBreed.toLowerCase();
  var dogFriendly = true;
  if (req.params.friendly === "0") {
    dogFriendly = false;
  }
  let dogData = {};
  dogJson.map(function(obj) {
    if (
      obj.breed.toLowerCase() === dogBreed &&
      obj.childFriendly === dogFriendly
    ) {
      dogData = obj;
    }
  });
  res.json(dogData);
});

app.use((req, res) => {
 res.status(404).send("Sorry can't find that!")
})

app.listen(3000);

console.log("Express on 3000");

module.exports = app;
