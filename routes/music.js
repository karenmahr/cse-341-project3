const express = require('express');
const router = express.Router();

const musicController = require('../controllers/music');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', musicController.getAll);

router.get('/:id', musicController.getSingle);

router.post('/', isAuthenticated, validation.saveMusic, musicController.createSong);

router.put('/:id', isAuthenticated, validation.saveMusic, musicController.updateSong);

router.delete('/:id', isAuthenticated, musicController.deleteSong);

module.exports = router;