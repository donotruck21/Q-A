var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = (function() {
	return {
		create: function(req, res) {
			console.log(req.body.name)

			User.findOne({name: req.body.name}, function(err, user){
				if(user){
					console.log('existing user')
					res.json(user)
				}else{
					console.log('new user')

					var user = new User({name: req.body.name, questions: [], answers: []})

					user.save(function(err){
						if(err){
				    		console.log("something went wrong")
				    		console.log(err)
				    	}
				    	else{
				    		console.log("added a user!")
							res.json(user);
				    	}
					})
				}
			})
		},
	}
})();