const validator = require('../helpers/validate');

const saveAlbum = (req, res, next) => {
    const validationRule = {
        artist_name: 'required|string',
        title: 'required|string',
        release_year: 'required|integer',
        genre: 'required|string',
        total_tracks: 'required|integer',
        is_explicit: 'required|string',
        producer: 'required|string',
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(400).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveArtist = (req, res, next) => {
    const validationRule = {
        active_since: 'required|integer',
        country: 'required|string',
        genre: 'required|string',
        is_touring: 'required|string',
        name: 'required|string',
        record_label: 'required|string',
        total_albums: 'required|string',
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(400).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveMusic = (req, res, next) => {
    const validationRule = {
        album_name:'required|string',
        artist: 'required|string',
        duration_seconds: 'required|integer',
        genre: 'required|string',
        release_year: 'required|integer',
        title: 'required|string',
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(400).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveTour_date = (req, res, next) => {
    const validationRule = {
        performer: 'required|string',
        tour_name: 'required|string',
        city: 'required|string',
        country: 'required|string',
        venue: 'required|string',
        event_date: 'required|integer',
        is_sold_out: 'required|string',
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(400).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveAlbum,
    saveArtist,
    saveMusic,
    saveTour_date
};