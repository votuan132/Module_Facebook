const fb = require('./module');
const fs = require('fs');


var request = new fb();





request.login({user: '', pass: '!'}, 'data.json')
.then(function(data){
	console.log(data);
	request.reactPost('2286809344903964', 'haha')
	.then(function(data){
		console.log(data);

	})
});

