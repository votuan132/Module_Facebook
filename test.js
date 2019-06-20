const fb = require('./module');
const fs = require('fs');
;






var request = new fb();

// console.log(request);

request.getTokenCookie('', '')
.then(function(data){
	console.log(data);

})

// request.setData(facebook);
// request.reactPost('2278756049042627', 'love')
// .then(function(data){
// 	console.log(data);
// 	// fs.writeFileSync('data.txt', data, {encoding: 'utf8'});
// })