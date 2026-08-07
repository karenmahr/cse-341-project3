const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['albums']
    try {
        const result = await mongodb
            .getDatabase()
            .db('project3')
            .collection('albums')
            .find()
            .toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while fetching albums.' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['albums']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid contact id to find a album.');
    }

    try {
        const albumId = new ObjectId(req.params.id);
        const result = await mongodb
            .getDatabase()
            .db('project3')
            .collection('albums')
            .find({ _id: albumId })
            .toArray();

        if (result.length === 0) {
            return res.status(404).json({ message: 'album not found.' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while fetching the album.' });
    }
};

const createAlbum = async (req, res) => {
    //#swagger.tags=['albums']
    const album = {
        artist_name: req.body.artist_name,
        title: req.body.title,
        release_year: req.body.release_year,
        genre: req.body.genre,
        total_tracks: req.body.total_tracks,
        is_explicit: req.body.is_explicit,
        producer: req.body.producer,
    };

    try {
        const response = await mongodb
            .getDatabase()
            .db('project3')
            .collection('albums')
            .insertOne(album);

        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the album.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while creating the album.' });
    }
};

const updateAlbum = async (req, res) => {
    //#swagger.tags=['albums']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Must use a valid contact id to update a album.' });
    }

    try {
        const albumId = new ObjectId(req.params.id);
        const album = {
            artist_name: req.body.artist_name,
            title: req.body.title,
            release_year: req.body.release_year,
            genre: req.body.genre,
            total_tracks: req.body.total_tracks,
            is_explicit: req.body.is_explicit,
            producer: req.body.producer,
        };

        const response = await mongodb
            .getDatabase()
            .db('project3')
            .collection('albums')
            .replaceOne({ _id: albumId }, album);

        console.log("Respuesta de MongoDB:", response);

        if (response.modifiedCount > 0 || response.matchedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'No album found with that ID.' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while updating the album.' });
    }
};

const deleteAlbum = async (req, res) => {
    //#swagger.tags=['albums']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid contact id to delete a contact.')
    }
    try {
        const albumId = new ObjectId(req.params.id);
        const response = await mongodb
            .getDatabase()
            .db('project3')
            .collection('albums')
            .deleteOne({ _id: albumId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the album.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while deleting the album.' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createAlbum,
    updateAlbum,
    deleteAlbum
};