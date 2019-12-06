var express = require("express");
require("../src/mongo/mongod");
const auth = require("../src/middlewares/auth");
const Users = require("../src/models/users");
var router = express.Router();

/* GET users listing. */
// router.get("/", auth, async (req, res, next) => {
//   try {
//     const data = await Users.find({});
//     res.status(200).send(data);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

router.get("/", auth, async (req, res, next) => {
  res.status(200).send(req.user);
});

router.get("/:id", async (req, res, next) => {
  try {
    const data = await Users.findById(req.params.id);
    if (!data) return res.status(404).send();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error + "");
  }
});

router.post("/", async (req, res, next) => {
  const user = new Users(req.body);
  try {
    const data = await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ data, token });
  } catch (error) {
    res.status(401).send(error + "");
  }
});

router.patch("/:id", async (req, res, next) => {
  const alllowedUpdates = ["name", "email", "age", "password"];
  const updates = Object.keys(req.body);
  const isvalidOrNot = updates.every(update =>
    alllowedUpdates.includes(update)
  );

  if (!isvalidOrNot)
    return res.status(400).send({ error: "Invalid Operation" });

  try {
    //to force updating to follow our schema and not bypass our middleware we find and then change it here and then pass it from middele ware
    const user = await Users.findById(req.params.id);

    if (!user) return res.status(404).send();
    updates.forEach(update => (user[update] = req.body[update]));
    user = await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send(error + "");
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const data = await Users.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).send();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error + "");
  }
});

router.post("/login/", async (req, res, next) => {
  try {
    const user = await Users.checkCradentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error + "");
  }
});

module.exports = router;
