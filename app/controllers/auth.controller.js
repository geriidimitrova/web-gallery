const db = require("../models");
const config = require("../config/auth.config");
const User = db.users;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

exports.login = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).send({
            user,
            accessToken: token
        });
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};
