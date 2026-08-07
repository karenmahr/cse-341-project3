const express = require('express');
const router = express.Router();

const tour_datesController = require('../controllers/tour_dates');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', tour_datesController.getAll);

router.get('/:id', tour_datesController.getSingle);

router.post('/', isAuthenticated, validation.saveTour_date, tour_datesController.createTour_date);

router.put('/:id', isAuthenticated, validation.saveTour_date, tour_datesController.updateTour_date);

router.delete('/:id', isAuthenticated, tour_datesController.deleteTour_date);

module.exports = router;