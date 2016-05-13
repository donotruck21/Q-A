var mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
	name: {type: String, required: true},
	questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],
	answers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Answer'}]
});

var QuestionSchema = new mongoose.Schema({
	user: {type: String, required: true},
	title: {type: String, required: true},
	description: {type: String},
	answers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Answer'}]
});


var AnswerSchema = new mongoose.Schema({
	user: {type: String, required: true},
	answer: {type: String, required: true},
	details: {type: String},
	likes: Number,
	question: String,
	_question: {type: mongoose.Schema.Types.ObjectId, ref: 'Question'}
});








mongoose.model('User', UserSchema);
mongoose.model('Question', QuestionSchema);
mongoose.model('Answer', AnswerSchema);