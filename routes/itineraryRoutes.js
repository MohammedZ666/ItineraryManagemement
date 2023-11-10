const express = require('express');
const { itinerary_create, itinerary_delete, itinerary_index, itinerary_details, itinerary_update } = require('../controllers/itineraryController');

const router = express.Router();

router.post('/create', itinerary_create);
router.get('/list', itinerary_index);
router.get('/detail', itinerary_details);
router.put('/update', itinerary_update)
router.delete('/delete', itinerary_delete);


module.exports = router;