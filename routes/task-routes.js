const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Task = require('../models/task-model');

router.get('/tasks/:id', (req, res, next) => {
	if (mongoose.isValidObjectId(req.params.id)) {
		//TODO: Populate all task
		Task.findById(req.params.id)
			.then((task) => res.json(task))
			.catch((error) => res.json(error));
	} else {
		res.next();
	}
});
router.put('/tasks/:id', (req, res, next) => {
	if (mongoose.isValidObjectId(req.params.id)) {
		Task.findByIdAndUpdate(
			req.params.id,
			{
				title: req.body.title,
				description: req.body.description,
				project: req.body.projectID,
			},
			{ new: true }
		)
			.then((task) => res.json(task))
			.catch((error) => res.json(error));
	} else {
		res.next();
	}
});

router.delete('/tasks/:id', (req, res, next) => {
	if (mongoose.isValidObjectId(req.params.id)) {
		Task.findByIdAndRemove(req.params.id)
			.then((task) => res.json(task))
			.catch((error) => res.json(error));
	} else {
		res.next();
	}
});

router.post('/projects', (req, res, next) => {
	Task.create({
		title: req.body.title,
		description: req.body.description,
		project: req.body.projectID,
	})
		.then((task) => res.json(task))
		.catch((error) => res.json(error));
});

module.exports = router;
