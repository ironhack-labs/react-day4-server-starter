// routes/project-routes.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Project = require('../models/project-model');
const Task = require('../models/task-model'); // <== !!!


// POST route => to create a new project
router.post('/projects', (req, res, next) => {

  let { title, description, imageUrl } = req.body

  Project.create({
    title,
    description,
    tasks: [],
    owner: req.user._id,
    imageUrl
  })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    })
});

// GET route => to get all the projects
router.get('/projects', (req, res, next) => {
  Project.find().populate('tasks')
    .then(allTheProjects => {
      res.json(allTheProjects);
    })
    .catch(err => {
      res.json(err);
    })
});


// GET route => to get a specific project/detailed view
router.get('/projects/:id', (req, res, next) => {

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  // our projects have array of tasks' ids and 
  // we can use .populate() method to get the whole task objects
  //                                   ^
  //                                   |
  //                                   |
  Project.findById(req.params.id).populate('tasks')
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.json(err);
    })
})

// PUT route => to update a specific project
router.put('/projects/:id', (req, res, next) => {

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Project.findByIdAndUpdate(req.params.id, req.body)
    .then(resposeData => {
      res.json(resposeData)
      res.json({ message: `Project with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})

// DELETE route => to delete a specific project
router.delete('/projects/:id', (req, res, next) => {

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Project.findByIdAndRemove(req.params.id)
    .then(responseData => {
      (responseData) ?
        res.json({ message: `Project with ${req.params.id} is removed successfully.` })
        :
        res.status(400).json({ message: `Project with ${req.params.id} is not found` })
    })
    .catch(err => {
      res.json(err);
    })
})

module.exports = router;