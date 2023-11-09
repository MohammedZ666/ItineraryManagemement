const express = require('express');
const { itinerary_create, itinerary_delete, itinerary_index, itinerary_details } = require('../controllers/itineraryController');

const router = express.Router();

router.post('/create', itinerary_create);
router.post('/list', itinerary_index);
router.get('/detail', itinerary_details);
router.delete('/delete', itinerary_delete);

module.exports = router;