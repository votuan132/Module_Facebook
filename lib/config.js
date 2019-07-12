const qs = require('querystring');

// const Facebook = require('./file');

function Facebook(){
	this.url;
	this.formData;
	this.dataRequest;
	this.headers = {
		cookie: {
			'accept': '*/*',
			'accept-encoding': 'gzip, deflate, sdch',
			'accept-language': 'en-US,en;q=0.8,en-AU;q=0.6',
			'cookie': '',
			'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'
		},
		token: {
			'x-fb-connection-quality': 'EXCELLENT',
			'x-fb-connection-type': 'cell.CTRadioAccessTechnologyHSDPA',
			'user-agent': 'Dalvik/2.1.0 (Linux; U; Android 9; TA-1032 Build/PPR1.180610.011) [FBAN/Orca-Android;FBAV/218.0.0.18.113;FBPN/com.facebook.orca;FBLC/vi_VN;FBBV/157724813;FBCR/VN MOBIFONE;FBMF/HMD Global;FBBD/Nokia;FBDV/TA-1032;FBSV/9;FBCA/armeabi-v7a:armeabi;FBDM/{density=2.0,width=720,height=1280};FB_FW/1;]',
			'content-type': 'application/x-www-form-urlencoded',
			'x-fb-http-engine': 'Liger'
		},
	};
	

	this.config = {
		url: '',
		method: '',
		data: '',
		headers: '',
		transformRequest: [
		function(data, headers){
			return qs.stringify(data);
		}
		]
	};

}
 

module.exports = Facebook;