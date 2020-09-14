const express = require('express');
const router = express.Router();
const Project = require('../models/project-model');
const mongoose = require('mongoose');

router.get('/projects', (req, res, next) => {
	//TODO: Populate all task
	Project.find()
		.populate('tasks')
		.then((projects) => res.json(projects))
		.catch((error) => res.json(error));
});
router.get('/projects/:id', (req, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		res.status(400).json({ message: 'Id not valid' });
	}
	Project.findById(req.params.id)
		.populate('tasks')
		.then((project) => res.json(project))
		.catch((error) => res.json(error));
});
router.put('/projects/:id', (req, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		res.status(400).json({ message: 'Id not valid' });
	}
	Project.findByIdAndUpdate(
		req.params.id,
		{
			title: req.body.title,
			description: req.body.description,
			tasks: req.body.tasks.map((t) => t._id),
		},
		{ new: true }
	)
		.then((response) => res.json(response))
		.catch((error) => res.json(error));
});

router.delete('/projects/:id', (req, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		res.status(400).json({ message: 'Id not valid' });
	}
	Project.findByIdAndRemove(req.params.id)
		.then((project) => res.json(project))
		.catch((error) => res.json(error));
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
