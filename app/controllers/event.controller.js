const db = require("../models");
const Event = db.events;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Title is required"
    });
    return;
  }

  const event = {
    title: req.body.title,
    status: 'active',
  };
  if (req.body.description) { event.description = req.body.description }

  Event.create(event)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findAll = (req, res) => {
  Event.findAll({ where: {}, include: ["items"]})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findOne = (req, res) => {
  Event.findByPk(req.params.id, { include: ["items"] })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({ message: `Cannot find event with id=${id}.` });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.update = (req, res) => {
  if (!req.body.title || !req.body.status) {
    res.status(400).send({
      message: "Title and status are required"
    });
    return;
  }

  Event.update(req.body, {
    where: { id: req.params.id }
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Event updated successfully." });
      } else {
        res.send({  message: `Cannot update event.` });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.delete = (req, res) => {
  Event.destroy({ where: { id: req.params.id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Event deleted successfully!" });
      } else {
        res.send({  message: "Cannot delete event." });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Could not delete event" });
    });
};

exports.deleteAll = (req, res) => {
  Tutorial.destroy({ where: {}, truncate: false })
    .then(nums => {
      res.send({ message: `${nums} All events deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all events."
      });
    });
};
