const axios = require('axios');
const qs = require('querystring');
const fs = require('fs');
const md5 = require('js-md5');

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

	this.setData = function(dataFb){
		this.dataRequest = dataFb;
	}

	this.getTokenCookie = async function(email, pass){
		this.url = 'https://b-api.facebook.com/method/auth.login';
		this.formData = {
			api_key: '882a8490361da98702bf97a021ddc14d',
			client_country_code: 'VN',
			cpl: 'true',
			credentials_type: 'device_based_login_password',
			currently_logged_in_userid: '0',
			email: email,
			error_detail_type: 'button_with_disabled',
			fb_api_caller_class: 'com.facebook.account.login.protocol.Fb4aAuthHandler',
			fb_api_req_friendly_name: 'authenticate',
			format: 'json',
			generate_session_cookies: '1',
			locale: 'vi_VN',
			meta_inf_fbmeta: '',
			method: 'auth.login',
			password: pass,
			source: 'device_based_login',		
		};
		this.formData.sig = this.getSig(this.formData);

		var dataFb = await this.run('post', 'token');

		if (dataFb.error_code) {
			return false;
		}else{
			var data =  dataFb.session_cookies.map(function(item, i){
				return item.name +'='+ item.value;
			});

			var resuft = {
				cookie: data.join('; '),
				access_token: dataFb.access_token
			};
			this.dataRequest = resuft;
			return resuft;
		}

	}

	this.postStatus = async function(content, privacy = 0){
		var listPrivacy = [300645083384735, 291667064279714, 286958161406148];
		this.url = 'https://m.facebook.com/a/home.php';
		this.formData = {
			privacyx: listPrivacy[privacy],
			xc_message: content,
			target: this.dataRequest.user_id,
			__a: 1,
			fb_dtsg: this.dataRequest.fb_dtsg
		};

		
		if (content == '') {
			return false;
		}
		
		return await this.run();

	}	

	this.reactPost = async function(idPost, type = 'like'){
		var typeReaction = {
			like: 1,
			love: 2,
			wow: 3,
			haha: 4,
			sad: 7,
			angry: 8
		};

		this.url = 'https://www.facebook.com/ufi/reaction';
		this.formData = {
			ft_ent_identifier: idPost,
			reaction_type: typeReaction[type],
			client_id: '1',
			source: '1',
			fb_dtsg: this.dataRequest.fb_dtsg
		};

		
		
		return await this.run();

	};

	this.commentPost = async function(idPost, content, sticker = 0){
		var dataSticker = ["", "126361874215276", "126362187548578", "126361967548600", "126362100881920", "126362137548583", "126361920881938", 
		"126362064215257", "126361974215266", "126361910881939", "126361987548598", "126361994215264", "126362007548596", "126362027548594", "126362044215259", 
		"126362074215256", "126362080881922", "126362087548588", "126362107548586", "126362117548585", "126362124215251", "126362130881917", "126362160881914", 
		"126362167548580", "126362180881912", "126362197548577", "126362207548576", "126361900881940", "126361884215275", "126361957548601", "126361890881941", 
		"126362034215260", "126362230881907"];

		this.url = 'https://www.facebook.com/ufi/add/comment/';
		this.formData = {
			ft_ent_identifier: idPost,
			comment_text: content,
			attached_sticker_fbid: dataSticker[sticker],
			source: 1,
			client_id: 1,
			__a: 1,
			fb_dtsg: this.dataRequest.fb_dtsg
		};

		var data = await this.run();
		data = JSON.parse(data.substr(9));
		var dataReturn = data.jsmods;

		if (typeof dataReturn.require[1][3][1] === 'object') {
			dataReturn = dataReturn.require[1][3][1].comments[0].id;
		}else{
			dataReturn = dataReturn.require[2][3][1].comments[0].id;
		}
		
		return dataReturn;
	}


	this.run = async function(type = 'post', typeConfig = 'cookie'){
		this.config.url = this.url;

		if (type === 'get') {
			this.config.method = 'get';
			this.config.data = '';
		}else{
			this.config.method = 'post';
			this.config.data = this.formData;
			
		}

		if (typeConfig === 'cookie') {
			this.headers.cookie.cookie = this.dataRequest.cookie;
			this.config.headers = this.headers.cookie;
		}else{
			this.config.headers = this.headers.token;
		}

		var dataReturn = await axios(this.config);
		return dataReturn.data;
	}

	this.getFBdtsg = async function(){
		this.url = 'https://m.facebook.com/';
		var data = await this.run('get');
		var regex = /name=\"fb_dtsg\" value=\"(.+?)\" autocomplete=\"off\"/g;
		var found = data.match(regex);
		console.log(found);

		fs.writeFileSync('data1.html', data, {encoding: 'utf8'});

	}

	this.getSig = function(formData) {
		var sig = '';
		Object.keys(formData).forEach(function(key) {
			// console.log(formData[key]);
			sig += key +'='+ formData[key];
			
		});
		// console.log(sig);
		sig = md5(sig + '62f8ce9f74b12f84c123cc23437a4a32');
		return sig;
	}
}


module.exports = Facebook;