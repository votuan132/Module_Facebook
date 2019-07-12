Fill user and pass


request.login({user: '', pass: ''}, 'data.json')
.then(function(data){
	console.log(data);

	request.reactPost('2286809344903964', 'haha')
	.then(function(data){
		console.log(data);

	})

});