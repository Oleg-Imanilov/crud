const express = require('express')
const db = require('./db')('./data');

function chkErr(res, err, data) {
    if(err) {
        res.status(500).send(err);
    } else {
        res.send(data);
    }
}

function crud(table) {
    let tbl = '/' + table;
    const router = express.Router();

    router.get(`${tbl}/:id`, (req, res) => {
        const { id } = req.params;
        db(table).find({ _id: id }, (err, docs) => {
            chkErr(res, err, docs[0]);
        });
    });

    router.get(tbl, (req, res) => {
        db(table).find({}, (err, docs) => {
            chkErr(res, err, docs);
        });
    });

    router.post(tbl, (req, res) => {
        const n = req.body;
        db(table).insert(n, (err, doc) => {
            chkErr(res, err, doc);
        });
    })

    router.delete(`${tbl}/:id`, (req, res) => {
        const { id } = req.params;
        db(table).remove({ _id: id }, { multi: false }, (err, numRemoved) => {
            chkErr(res, err, { numRemoved });
        });
    })

    router.put(`${tbl}/:id`, (req, res) => {
        const { id } = req.params;
        const data = req.body;
        data._id && delete data._id;
        db(table).update({ _id: id }, { $set: data }, { multi: false, returnUpdatedDocs: true }, (err, numAffected, affectedDocument, upsert) => {
            chkErr(res, err, affectedDocument);
        });
    })
    return router;
}

module.exports = crud;
