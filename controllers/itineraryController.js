const Itinerary = require("../models/itinerary");

const itinerary_index = (req, res) => {

  Itinerary.find({ user: req.user })
    .sort({ createdAt: -1 })
    .then((iteniraries) => {
      res.json({
        iteniraries
      });
    })
    .catch((err) => {
      console.log("the error is " + err);
    });
}


const itinerary_details = (req, res) => {
  Itinerary.findById({ user: req.user })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};

const itinerary_create = (req, res) => {
  req.itinerary.user = req.user.id;
  Itinerary.create(req.itinerary)
    .then((result) => {
      res.status(201).json({ success: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ error: err });
    });
};

const itinerary_update = (req, res) => {
  Itinerary.findOneAndUpdate({ _id: req.id, user: req.user.id }, req.update)
    .save()
    .then((result) => {
      res.status(201).json({ success: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ error: err });
    });
};

const itinerary_delete = (req, res) => {
  Itinerary.findByIdAndDelete(req.id)
    .then((result) => {
      res.status(404).json({ result });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  itinerary_index,
  itinerary_details,
  itinerary_create,
  itinerary_update,
  itinerary_delete,

};
