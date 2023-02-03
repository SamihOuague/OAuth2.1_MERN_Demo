let jwt = require("jsonwebtoken");

module.exports = {
    signToken: () => {
        let token = jwt.sign({ iat: Date.now() }, process.env.SECRET_KEY);
        return token;
    },
    verifyToken: (token) => {
        let decoded = jwt.verify(token, process.env.SECRET_KEY);
        return decoded;
    }
}