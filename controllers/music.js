const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['music']
    try {
        const result = await mongodb
            .getDatabase()
            .db('project3')
            .collection('music')
            .find()
            .toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while fetching music.' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['music']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid contact id to find a song.');
    }

    try {
        const songId = new ObjectId(req.params.id);
        const result = await mongodb
            .getDatabase()
            .db('project3')
            .collection('music')
            .find({ _id: songId })
            .toArray();

        if (result.length === 0) {
            return res.status(404).json({ message: 'song not found.' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while fetching the song.' });
    }
};

const createSong = async (req, res) => {
    //#swagger.tags=['music']
    const song = {
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
            .collection('music')
            .insertOne(song);

        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the song.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while creating the song.' });
    }
};

const updateSong = async (req, res) => {
    //#swagger.tags=['music']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Must use a valid contact id to update a song.' });
    }

    try {
        const songId = new ObjectId(req.params.id);
        const song = {
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
            .collection('music')
            .replaceOne({ _id: songId }, song);

        console.log("Respuesta de MongoDB:", response);

        if (response.modifiedCount > 0 || response.matchedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'No song found with that ID.' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while updating the song.' });
    }
};

const deleteSong = async (req, res) => {
    //#swagger.tags=['music']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid contact id to delete a contact.')
    }
    try {
        const songId = new ObjectId(req.params.id);
        const response = await mongodb
            .getDatabase()
            .db('project3')
            .collection('music')
            .deleteOne({ _id: songId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the song.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while deleting the song.' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createSong,
    updateSong,
    deleteSong
};