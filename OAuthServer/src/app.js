let express = require("express");
let cors = require("cors");
let app = express();


app.use(cors());
app.use(express.json());
app.get("*", (req, res) => {
	return res.send({msg: "hello world"});
});

module.exports = app;
