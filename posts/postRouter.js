const express = 'express';
const db = require('./postDb');

const router = require('express').Router();

router.get('/', (req, res) => {
    db.get()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        res.status(500).json({error: 'error getting post'})
    })
});

router.get('/:id', validatePostId, (req, res) => {
    const id = req.params.id;
    db.getById(id)
        .then(post => {
            res.status(200).json(post)
        })
        .catch(err => {
            res.status(500).json({error: 'error getting post'})
        })
});

router.delete('/:id', validatePostId, (req, res) => {
    const id = req.params.id;
    db.remove(id)
        .then(post => {
            res.status(204).json({message: `successfully deleted post ${id}`})
        })
        .catch(err => {
            res.status(500).json({error: 'server error, did not delete post'})
        })
});

// remember .put use the .update request. Which accepts two arguments! in this case id and changes!
router.put('/:id', validatePostId, (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    db.update(id, changes)
        .then(post => {
            res.status(204).json({message: `post ${id} succesfully updated`})
        })
        .catch(err => {
            req.status(500).json({error: 'server error, did not update post'})
        })
});

// custom middleware
//the middleware dbetById() is coming from the postDb.js file
function validatePostId(req, res, next) {
    const id = req.params.id;
    db.getById(id)
        .then(user => {
            if (user) {
                req.user = user;
                next();
            }
            else {
                res.status(400).json({message: 'invalid user id'});
            }
        })
        .catch (err => {
            res.status(500).json({error: 'There was an error accessing that user from the database.'})
        })
}

module.exports = router;