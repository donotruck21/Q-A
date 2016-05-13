var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var Answer = mongoose.model('Answer');


module.exports = (function() {
	return	{
		create: function(req, res) {
			console.log("in backend controller, creating answer:", req.body)

			// var answer = new Answer({user: req.body.name, answer: req.body.answer, details: req.body.details, likes: 0, question: req.body.question, _question: req.body.question_id})

			// console.log(answer)

			// answer.save(function(err){
			// 	if(err){
		 //    		console.log("something went wrong")
		 //    		console.log(err)
		 //    	}
		 //    	else{
		 //    		console.log("added a answer!")
			// 		res.json(answer);
		 //    	}
			// })
			Question.findOne({_id: req.body.question_id}, function(err, question){
				console.log('question:', question)

				var answer = new Answer({user: req.body.name, answer: req.body.answer, details: req.body.details, likes: 0, _question: req.body.question_id, question: req.body.question})
				console.log(answer)

				answer.save(function(err, answer) {
					question.answers.push(answer);
					question.save(function(err, question) {
						if(err) {
							console.log('ERROR');
							console.log(err)
				       	} else {
							console.log('EVERYTHING GOOD!')
							res.json(question);
						}
					})
				})
			})
		},

		getAll: function(req, res) {
			console.log('in controller:', req.params.id)

			Question.findOne({_id: req.params.id}, function(err, result){
				console.log(result)
				var question = result.title
				console.log('found question:', question)
				Answer.find({question: question}, function(err, answers) {
					console.log('found:', answers)
					if(err){
			    		console.log("something went wrong")
			    		console.log(err)
			    	}
			    	else{
			    		console.log("found all answer!")
						res.json(answers);
			    	}
				})
			})
		},

		addLike: function(req, res) {
			console.log('adding like for:', req.params.id)

			Answer.findOne({_id: req.params.id}, function(err, answer){
				console.log(answer)
				answer.likes ++
				answer.save()
				console.log(answer)
				res.json(answer)
			})
		},



	}
})();