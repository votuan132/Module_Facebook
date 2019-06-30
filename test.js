const fb = require('./module');
const fs = require('fs');
;






var request = new fb();

// console.log(request);

request.getTokenCookie('vovanhoangtuan', 'Zz0703348869!')
.then(function(data){
	console.log(data);
	request.getFBdtsg().then(function(test){
		console.log(test);
	});

})

// request.setData(facebook);
// request.reactPost('2278756049042627', 'love')
// .then(function(data){
// 	console.log(data);
// 	// fs.writeFileSync('data.txt', data, {encoding: 'utf8'});
// })