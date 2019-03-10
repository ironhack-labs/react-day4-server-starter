const express = require('express');
const mongoose = require('mongoose')
const Project = require('../models/project-model')

// GET PROJECT 

const router = express.Router()

router.get('/projects', (req, res, next) => {
  Project.find().populate('tasks')
  .then(alltheProjects => {
    res.json(alltheProjects);
  })
  .catch(err=>{res.jason(err)
  });
});


router.post('/projects', (req, res, next)=>{
  console.log(req.body)
  Project.create({
    title: req.body.title,
    description: req.body.description,
    task:[]
  })
  .then(response => {
    res.json(response);
  })
  .catch(err => {
    res.json(err);
  })

});

// line 37 has a status which is 400 - not found, we manage different status so the browser can react to that status 
router.get("/projects/:id", (req, res, next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400).json({message: "The ID does not exists"})
    return
  }

  Project.findById(req.params.id)
    .populate("tasks")
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.json(err)
    });

})

router.put("/projects/:id" , (req, res, next) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400).json({message: "The ID does not exists"})
    return
  }

  Project.findByIdAndUpdate(req.params.id, req.body)
    .then( ()=>{
      res.json({
        message: `Project with id ${req.params.id} has been updated successfully!`
      })
      .catch(err=>{
        res.json(err);
      })
    })
})


router.delete("/projects/:id" , (req, res, next) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400).json({message: "The ID does not exists"})
    return
  }

  Project.findByIdAndDelete(req.params.id, req.body)
    .then( ()=>{
      res.json({
        message: `Project with id ${req.params.id} has been deleted!`
      })
      .catch(err=>{
        res.json(err);
      })
    })

})


// POST del project
router.post('/projects', (req, res, next)=>{
  Project.create({
    title: req.body.title,
    description: req.body.description,
    tasks: [],
    owner: req.user._id
  })
  .then(response => {
  res.json(response);
  })
  .catch(err => {
  res.json(err);
  })
});

module.exports = router;

