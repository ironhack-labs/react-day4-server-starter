const express = require('express');
const router = express.Router();
const Project = require('../models/project-model');
const Task = require('../models/task-model');
const mongoose = require('mongoose');

router.get('/projects', (req, res, next) => {
	//TODO: Populate all task
	Project.find()
		.populate('tasks')
		.then((projects) => res.json(projects))
		.catch((error) => res.json(error));
});
router.get('/projects/:id', (req, res, next) => {
	if (mongoose.isValidObjectId(req.params.id)) {
		//TODO: Populate all task
		Project.findById(req.params.id)
			.then((project) => res.json(project))
			.catch((error) => res.json(error));
	} else {
		res.next();
	}
});
router.put('/projects/:id', (req, res, next) => {
	if (mongoose.isValidObjectId(req.params.id)) {
		Project.findByIdAndUpdate(
			req.params.id,
			{
				title: req.body.title,
				description: req.body.description,
				tasks: [],
			},
			{ new: true }
		)
			.then((response) => res.json(response))
			.catch((error) => res.json(error));
	} else {
		res.next();
	}
});

router.delete('/projects/:id', (req, res, next) => {
	if (mongoose.isValidObjectId(req.params.id)) {
		Project.findByIdAndRemove(req.params.id)
			.then((project) => res.json(project))
			.catch((error) => res.json(error));
	} else {
		res.next();
	}
});

router.post('/projects', (req, res, next) => {
	Project.create({
		title: req.body.title,
		description: req.body.description,
		tasks: [],
	})
		.then((response) => res.json(response))
		.catch((error) => res.json(error));
});

module.exports = router;
