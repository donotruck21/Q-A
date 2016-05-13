var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var User = mongoose.model('User');
var Answer = mongoose.model('Answer');


module.exports = (function() {
	return {
		getAll: function(req, res) {
			Question.find({}, function(err, questions) {
				if(err){
					console.log("errors:", err);
				} else {
					res.json(questions);
				}
			})
		},

		getOne: function(req, res) {
			Question.find({_id:req.params.id})
			.populate('comments')
			.exec(function(err, question) {
				if(err){
					console.log("errors:", err);
				} else {
					console.log('got question!')
					console.log(question)
					res.json(question);
				}
			})
		},
		
		create: function(req, res) {
			console.log("in backend controller, creating", req.body)

			User.findOne({name: req.body.name}, function(err, user){
				console.log('user:', user)

				var question = new Question({user: req.body.name, title: req.body.title, description: req.body.description, answers: []})
				
				question.save(function(err, question) {
					user.questions.push(question);
					user.save(function(err, user) {
						if(err) {
							console.log('ERROR');
							console.log(err)
				       	} else {
							console.log('EVERYTHING GOOD!')
							res.json(user);
						}
					})
				})
			})
		},



	}
})();