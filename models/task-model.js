const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	title: String,
	description: String,
	project: {
		type: Schema.Types.ObjectId,
		ref: 'Project',
	},
});
module.exports = mongoose.model('Task', schema);
