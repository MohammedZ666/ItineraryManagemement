const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const itinerarySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    dates: {
        type: Array,
        required: true
    },
    destinations: {
        type: Array,
        required: true
    },
    activities: {
        type: Array,
        required: true,
    },
    transporation: {
        type: String,
        required: true,
    },
    accomodation: {
        type: String,
        required: false
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const Itinerary = mongoose.model('Itinerary', itinerarySchema)

module.exports = Itinerary;