let mongoose = require("mongoose");
let bcrypt = require("bcrypt");

let Schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

Schema.pre("save", function (next) {
    bcrypt.hash(this.password, 12, (err, hash) => {
        if (!err) this.set('password', hash);
        else console.error(err);
        next();
    });
});

Schema.methods.comparePwd = function (plainPwd) {
    try {
        return bcrypt.compareSync(plainPwd, this.password);
    } catch(e) {
        console.error(e);
        return false;
    }
}

module.exports = mongoose.model("account", Schema);