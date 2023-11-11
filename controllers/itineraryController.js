const Itinerary = require("../models/itinerary");

const itinerary_index = (req, res) => {

  Itinerary.find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .then((iteniraries) => {
      res.status(201).json(iteniraries);
    })
}


const itinerary_details = (req, res) => {
  Itinerary.findById({ _id: req.body.id })
    .then((result) => {
      res.status(201).json(result);
    })
};

const itinerary_create = (req, res) => {
  req.body.user = req.user.id;
  Itinerary.create(req.body)
    .then((result) => {
      res.status(201).json(result);
    })
};

const itinerary_update = (req, res) => {
  Itinerary.findOneAndUpdate({ _id: req.body.id }, req.body, {
    new: true
  })
    .then((result) => {
      res.status(201).json(result);
    })
};

const itinerary_delete = (req, res) => {
  Itinerary.findByIdAndDelete(req.body.id)
    .then((result) => {
      res.status(201).json(result);
    });
};

module.exports = {
  itinerary_index,
  itinerary_details,
  itinerary_create,
  itinerary_update,
  itinerary_delete,

};
