const express = require('express');
const router = express.Router();
const musicController = require('../controllers/music');

router.get('/', musicController.getAll);

router.get('/:id', musicController.getSingle);
// Crear, actualizar y eliminar
router.post('/', musicController.createSong);

router.put('/:id', musicController.updateSong);

router.delete('/:id', musicController.deleteSong);

module.exports = router;