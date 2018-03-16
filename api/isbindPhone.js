$(function(){
	
	var countdown=60;
	var isBind = getQueryString("isBind");
	var source = getQueryString("source");
	var phoneNumber = getQueryString("phoneNumber");
	var goback = getQueryString("state");
	wechatBind ();
	// mobileBind ();
	getcode ();
	// isBindEmail ();


	// 是否绑定并判断注册来源 显示不同弹出层
	// function isBindEmail () {
		
	// 	if (source == 1) {
	// 		$('#mobile-bind').show();
	// 	} else if (source == 0 ) {
	// 		$('#wechat-bind').show();
	// 	}
	// }

	// 微信注册绑定
	function wechatBind () {
		mui('.login-btn').on('tap','#loginBtn',function(){
	        // var email = $.trim($("#emailtext1").val());
	        // var username = getQueryString("nickname");
			var phoneNumber = document.getElementById('phoneNumber').value;
			var code = document.getElementById('code').value; 
			var openid = getQueryString("openid");
			var sex = getQueryString("sex");
			var city = getQueryString("city");
			var headimgurl = getQueryString("headimgurl");
			// alert(email,phoneNumber,code,username,openid,sex,city,headimgurl);
			$('.home-mask input').each(function(index, el) {
				$(this).blur();
			});
			if (!phoneNumber) {
				mui.toast('Please enter your number!');
				return;
			} else if (!(/^1[34578]\d{9}$/.test(phoneNumber))) {
				mui.toast("Please enter a 11-digit valid number!");
				return;
			}
			if (!code) {
				mui.toast('Please enter your code!');
				return;
			}
			
			$.ajax({
				url: csOrzs + '/Api/Account/checkMobile',
				type: 'POST',
				dataType: 'json',
				data: {
					mobile: phoneNumber,
					code: code,					
					openid: openid,
					head_img: headimgurl,
					sex: sex,
					city: city
				},
			})
			.done(function(data) {
				var data = data;
				console.log(data)
				var token = data.data.token;
				var mobile = data.data.mobile;
				var openid = data.data.openid;
				var head_img = data.data.head_img;
				var sex = data.data.sex;
				var city = data.data.city;
				console.log(mobile, openid+'1111', head_img+'222', sex+'333', city+'444');
				if (data.data == 110) {
					mui.toast("Verification code error!");
					return false;
				} else if (data.code == 1) {
					localStorage.setItem("token",token);
					window.location.href = goback;
					return false;
				} else if (data.code == 2) {
					window.location.href = './login-info.html?mobile='+mobile+'&openid='+openid+'&head_img='+head_img+'&sex='+sex+'&city='+city+'&state='+goback;
				}
			})
			.fail(function() {
				mui.toast("Network error, please try again!");
			})
			
	   	});
	}
	

	// 手机注册绑定
	// function mobileBind () {
	// 	mui('.login-btn').on('tap','#loginBtn2',function(){
	//         var email = $.trim($("#emailtext").val());
	// 		var phoneNumber = getQueryString("phoneNumber");
	// 		console.log(email,phoneNumber);
	// 		$('.home-mask input').each(function(index, el) {
	// 			$(this).blur();
	// 		});
	// 		if (!email) {
	// 			mui.toast("Please enter your email address!");
	// 			return false;
	// 		} else if (!(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(email))) {
	// 			mui.toast("Please enter a valid email address!");
	// 			return false;
	// 		} 
	// 		$.ajax({
	// 			url: 'http://proj7.thatsmags.com/Api/Account/mbBind',
	// 			type: 'POST',
	// 			dataType: 'json',
	// 			data: {mobile: phoneNumber,email: email},
	// 		})
	// 		.done(function(data) {
	// 			console.log(data);
	// 			if (data.message == "mobile_bind_success") {
	// 				var token = data.data.token;
	// 				localStorage.setItem("token",token);
	// 				window.location.href = './me.html';
	// 			} else {
	// 				mui.toast("Network error, please try again!");
	// 			}
	// 		})
	// 		.fail(function() {
	// 			mui.toast("Network error, please try again!");
	// 		});
	//    	});
	// }
   

	function getcode () {
		getCode.addEventListener('tap',function(){
			var phoneNumber = document.getElementById('phoneNumber').value;
			var code = document.getElementById('code').value;
			if (!phoneNumber) {
				mui.toast('Please enter your number!');
				return;
			} else if (!(/^1[34578]\d{9}$/.test(phoneNumber))) {
				mui.toast("Please enter a 11-digit valid number!");
				return;
			}	
			settime(this);
			$.ajax({
				url: csOrzs + '/Api/Public/mobileCode',
				type: 'POST',
				dataType: 'json',
				data: {mobile: phoneNumber},
			})
			.done(function(data) {
				var data = data;
				if (data.data == 107) {
					mui.toast("Please enter a 11-digit valid number!");
					return false;
				}
				if (data.data == 109) {
					mui.toast("Frequent operation, please try again later!");
					return false;
				}
			})
			.fail(function() {
				mui.toast("Network error, please try again!");
			});
			

		});
	}

	

	// 微信授权获取信息
	// function getWeChatInfo () {
	// 	var userCode = getQueryString("code") || null;
	// 	if (userCode) {
	// 		$.ajax({
	// 			url: 'http://proj7.thatsmags.com/Api/Account/thirdLogin',
	// 			type: 'POST',
	// 			dataType: 'json',
	// 			data: {code: userCode}
	// 		})
	// 		.done(function(data) {
	// 			// alert(JSON.stringify(data));
	// 			var data = data;
	// 			var isBind = data.data.is_bind;
	// 			if (isBind == 0) {
	// 				var source = data.data.source;
	// 				var openid = data.data.user_data.openid;
	// 				var nickname = data.data.user_data.nickname;
	// 				var sex = data.data.user_data.sex; 
	// 				var city = data.data.user_data.city; 
	// 				var headimgurl = data.data.user_data.headimgurl;
	// 			}
	// 			if (isBind == 1) {
	// 				var token = data.data.token;
	// 				localStorage.setItem("token",token);	
	// 				return false;
	// 			} else if (isBind == 0) {
	// 				sessionStorage.setItem("isBind",isBind);
	// 				sessionStorage.setItem("source",source);
	// 				sessionStorage.setItem("openid",openid);
	// 				sessionStorage.setItem("nickname",nickname);
	// 				sessionStorage.setItem("sex",sex);
	// 				sessionStorage.setItem("city",city);
	// 				sessionStorage.setItem("headimgurl",headimgurl);
	// 				isBindEmail ();
	// 				return false;
					
	// 			}
	// 		})
	// 		.fail(function() {
	// 			mui.toast("数据请求失败，稍后再试!");
	// 		})
			
			
	// 	}
	// }

	// 短信获取倒计时
	function settime(obj) {   
		if (countdown == 0) {   
		    obj.removeAttribute("disabled");  
		    obj.style.backgroundColor = "#fc4002";  
		    obj.style.color = "#fff"; 
		    obj.innerText="Send code";   
		    countdown = 60;   
		    return;  
		} else {   
		    obj.setAttribute("disabled", true);
		    obj.style.backgroundColor = "#6A6A6A"; 
		    obj.style.color = "#fff";   
		    obj.innerText = countdown+ "s";   
		    countdown--;   
		}   
		setTimeout(function() {   
		    settime(obj);
		},1000);
	} 

	// 获取地址栏参数
	function getQueryString(name) {
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
			var r = window.location.search.substr(1).match(reg);
		if (r != null) {
			return unescape(r[2]);
		}
			return null;
	}

})