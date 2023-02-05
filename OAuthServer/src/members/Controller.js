const Model = require("./Model");
const jwt = require("./utils/jwt");

module.exports = {
    hostTest: async (req, res) => {
        return res.send({msg: "Hello"});
    },
    register: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) return res.status(400).send({ success: false, message: "Malformed body." });
            else if (password.length < 8) return res.status(400).send({ success: false, message: "Password too short." });
            let model = new Model({
                email,
                password,
            });
            let user = await model.save();
            if (!user) return res.status(500).send({success: false, message: "User not created."});
            return res.status(201).send({ success: true, token: jwt.signToken() });
        } catch(e) {
            if (e && e.code == 11000) return res.status(401).send({success: false, message: "Email already used."});
            console.error(e);
            return res.status(500).send(e);
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) return res.status(400).send({success: false, message: "Malformed body."});
            let user = await Model.findOne({ email });
            if (!user) return res.status(404).send({success: false, message: "User does not exists."});
            if (!user.comparePwd(password)) return res.send({success: false, message: "Wrong password."});
            return res.send({ success: true, token: jwt.signToken() });
        } catch(e) {
            return res.status(500).send({success: false, message: "Something wrong."});
        }
    }
}