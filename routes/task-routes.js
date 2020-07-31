const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Task = require('../models/task-model');
const Project = require('../models/project-model');

router.get('/tasks/:id', (req, res, next) => {
	if (mongoose.Types.ObjectId.isValid(req.params.id)) {
		Task.findById(req.params.id)
			.populate('project')
			.then((task) => res.json(task))
			.catch((error) => res.json(error));
	} else {
		res.next();
	}
});
router.put('/tasks/:id', (req, res, next) => {
	if (mongoose.Types.ObjectId.isValid(req.params.id)) {
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
	if (mongoose.Types.ObjectId.isValid(req.params.id)) {
		Task.findByIdAndRemove(req.params.id)
			.then((task) =>
				Project.findById(task.project).then((p) => {
					const idxTask = p.tasks.findIndex(rask._id);
					p.task.splice(idxTask, 1);
					Project.findByIdAndUpdate(p._id, p).then(() => res.json(task));
				})
			)
			.catch((error) => res.json(error));
	} else {
		res.next();
	}
});

router.post('/tasks', (req, res, next) => {
	Task.create({
		title: req.body.title,
		description: req.body.description,
		project: req.body.project,
	})
		.then((task) =>
			Project.findById(task.project).then((p) => {
				p.tasks.push(task._id);
				Project.findByIdAndUpdate(p._id, p).then(() => res.json(task));
			})
		)
		.catch((error) => res.json(error));
});

module.exports = router;
