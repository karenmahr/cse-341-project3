const express = require('express');
const router = express.Router();

const albumsController = require('../controllers/albums');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', albumsController.getAll);

router.get('/:id', albumsController.getSingle);

router.post('/', isAuthenticated, validation.saveAlbum, albumsController.createAlbum);

router.put('/:id', isAuthenticated, validation.saveAlbum, albumsController.updateAlbum);

router.delete('/:id', isAuthenticated, albumsController.deleteAlbum);

module.exports = router;