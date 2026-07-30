const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['artists']
    try {
        const result = await mongodb
            .getDatabase()
            .db('project3')
            .collection('artists')
            .find()
            .toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while fetching artists.' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['artists']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid contact id to find a artist.');
    }

    try {
        const artistId = new ObjectId(req.params.id);
        const result = await mongodb
            .getDatabase()
            .db('project3')
            .collection('artists')
            .find({ _id: artistId })
            .toArray();

        if (result.length === 0) {
            return res.status(404).json({ message: 'artist not found.' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while fetching the artist.' });
    }
};

const createArtist = async (req, res) => {
    //#swagger.tags=['artists']
    const artist = {
        album_name: req.body.album_name,
        artist: req.body.artist,
        duration_seconds: req.body.duration_seconds,
        genre: req.body.genre,
        release_year: req.body.release_year,
        title: req.body.title
    };

    try {
        const response = await mongodb
            .getDatabase()
            .db('project3')
            .collection('artists')
            .insertOne(artist);

        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the artist.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while creating the artist.' });
    }
};

const updateArtist = async (req, res) => {
    //#swagger.tags=['artists']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Must use a valid contact id to update a artist.' });
    }

    try {
        const artistId = new ObjectId(req.params.id);
        const artist = {
            album_name: req.body.album_name,
            artist: req.body.artist,
            duration_seconds: req.body.duration_seconds,
            genre: req.body.genre,
            release_year: req.body.release_year,
            title: req.body.title
        };

        const response = await mongodb
            .getDatabase()
            .db('project3')
            .collection('artists')
            .replaceOne({ _id: artistId }, artist);

        console.log("Respuesta de MongoDB:", response);

        if (response.modifiedCount > 0 || response.matchedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'No artist found with that ID.' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while updating the artist.' });
    }
};

const deleteArtist = async (req, res) => {
    //#swagger.tags=['artists']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid contact id to delete a contact.')
    }
    try {
        const artistId = new ObjectId(req.params.id);
        const response = await mongodb
            .getDatabase()
            .db('project3')
            .collection('artists')
            .deleteOne({ _id: artistId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the artist.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while deleting the artist.' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createArtist,
    updateArtist,
    deleteArtist
};