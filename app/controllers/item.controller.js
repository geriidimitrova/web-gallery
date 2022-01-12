const db = require("../models");
const Item = db.items;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Name is required"
    });
    return;
  }
  if (!req.body.author) {
    res.status(400).send({
      message: "Author is required"
    });
    return;
  }
  if(!req.files.file) {
    res.status(400).send({
      status: false,
      message: 'No file uploaded'
    });
    return;
  } 

  let file = req.files.file;
  file.mv('./public/' + file.name)

  const item = {
    name: req.body.name,
    author: req.body.author,
    itemPath: './public/' + file.name,
    fileName: file.name,
    eventId: req.body.eventId,
  };
  if (req.body.description) {
    item.description = req.body.description;
  }

  Item.create(item)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Sorry, not created!"
      });
    });
};

exports.findAll = (req, res) => {
  Item.findAll({ include: ["event"] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving items."
      });
    });
};
exports.findAllApproved = (req, res) => {
  Item.findAll({ where: { status: 'approved' }, include: ["event"] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving approved items."
      });
    });
};
exports.findAllRejected = (req, res) => {
  Item.findAll({ where: { status: 'rejected' }, include: ["event"] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving rejected items."
      });
    });
};
exports.findAllApplications = (req, res) => {
  Item.findAll({ where: { status: null }, include: ["event"] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving applications."
      });
    });
};

exports.findByEvent = (req, res) => {
  var id = req.params.eventId;
  Item.findAll({ where: { eventId: id }, include: ["event"] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving approved items."
      });
    });
};

exports.approve = (req, res) => {
  const id = req.params.id;

  Item.update({status: 'approved'}, { where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Item updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update item.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating item"
      });
    });
};
exports.reject = (req, res) => {
  const id = req.params.id;

  Item.update({status: 'rejected'}, { where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Item updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update item.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating item"
      });
    });
};
