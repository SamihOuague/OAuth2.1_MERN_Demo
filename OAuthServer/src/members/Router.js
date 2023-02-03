const router = require("express").Router();
const { getClientId, register, login } = require("./Controller");

router.get("/", getClientId);
router.post("/register", register);
router.post("/login", login);

module.exports = router;