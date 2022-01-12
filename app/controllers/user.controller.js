const db = require("../models");
const User = db.users;

exports.create = (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    res.status(400).send({
      message: "The name, email and password are required"
    });
    return;
  }

  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    isAdmin: 'no',
    isActive: 'yes',   
  };
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findAll = (req, res) => {
  User.findAll({ where: {} })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

// exports.findOne = (req, res) => {
//   const id = req.params.id;

//   console.log(id);
//   User.findByPk(id)
//     .then(data => {
//       if (data) {
//         res.send(data);
//       } else {
//         res.status(404).send({ message: `Cannot find user.` });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({ message: err.message });
//     });
// };

exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(result => {
      if (result == 1) {
        res.send({ message: "User updated successfully." });
      } else {
        res.send({  message: `Cannot update user.` });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
