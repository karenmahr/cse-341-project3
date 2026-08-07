const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['tour_dates']
    try {
        const result = await mongodb
            .getDatabase()
            .db('project3')
            .collection('tour_dates')
            .find()
            .toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while fetching tour_dates.' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['tour_dates']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid contact id to find a tour_date.');
    }

    try {
        const tour_dateId = new ObjectId(req.params.id);
        const result = await mongodb
            .getDatabase()
            .db('project3')
            .collection('tour_dates')
            .find({ _id: tour_dateId })
            .toArray();

        if (result.length === 0) {
            return res.status(404).json({ message: 'tour_date not found.' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while fetching the tour_date.' });
    }
};

const createTour_date = async (req, res) => {
    //#swagger.tags=['tour_dates']
    const tour_date = {
        performer: req.body.performer,
        tour_name: req.body.tour_name,
        city: req.body.city,
        country: req.body.country,
        venue: req.body.venue,
        event_date: req.body.event_date,
        is_sold_out: req.body.is_sold_out,
    };

    try {
        const response = await mongodb
            .getDatabase()
            .db('project3')
            .collection('tour_dates')
            .insertOne(tour_date);

        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the tour_date.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while creating the tour_date.' });
    }
};

const updateTour_date = async (req, res) => {
    //#swagger.tags=['tour_dates']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Must use a valid contact id to update a tour_date.' });
    }

    try {
        const tour_dateId = new ObjectId(req.params.id);
        const tour_date = {
            performer: req.body.performer,
            tour_name: req.body.tour_name,
            city: req.body.city,
            country: req.body.country,
            venue: req.body.venue,
            event_date: req.body.event_date,
            is_sold_out: req.body.is_sold_out,
        };

        const response = await mongodb
            .getDatabase()
            .db('project3')
            .collection('tour_dates')
            .replaceOne({ _id: tour_dateId }, tour_date);

        console.log("Respuesta de MongoDB:", response);

        if (response.modifiedCount > 0 || response.matchedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'No tour_date found with that ID.' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while updating the tour_date.' });
    }
};

const deleteTour_date = async (req, res) => {
    //#swagger.tags=['tour_dates']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid contact id to delete a contact.')
    }
    try {
        const tour_dateId = new ObjectId(req.params.id);
        const response = await mongodb
            .getDatabase()
            .db('project3')
            .collection('tour_dates')
            .deleteOne({ _id: tour_dateId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the tour_date.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while deleting the tour_date.' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createTour_date,
    updateTour_date,
    deleteTour_date
};