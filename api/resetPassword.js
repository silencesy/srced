(function(mui) {
	mui.init();
	var loginBtn = document.getElementById('loginBtn');
	var getCode = document.getElementById('getCode');
	
	// fromHighLinght ();
	var countdown=60;

	// 获取验证码
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
			url:  csOrzs + '/Api/Public/mobileCode',
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

	// 重设密码
	loginBtn.addEventListener('tap',function(){
		var phoneNumber = document.getElementById('phoneNumber').value;
		var code = document.getElementById('code').value;
		var password = document.getElementById('password').value;
		var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;

		if (!phoneNumber) {
			mui.toast('Please enter your number!');
			return;
		} else if (!(/^1[34578]\d{9}$/.test(phoneNumber))) {
			mui.toast("Please enter a 11-digit valid number!");
			return false;
		} else if (!code) {
			mui.toast('Please enter the verification code!');
			return false;
		} else if ( password == '') {
			mui.toast("Please enter your password!");
			return false;
		} else if (!reg.test(password)) {
			mui.toast("请输入正确的密码！");
			return false;
		}
		$.ajax({
			url: csOrzs + '/Api/Account/resetPassword',
			type: 'POST',
			dataType: 'json',
			data: {mobile: phoneNumber,code: code,password: password},
		})
		.done(function(data) {
			var data = data;
			var isBind = data.data.is_bind;
			var source = data.data.source;
			console.log(data);
			if (data.data == 110) {
				mui.toast("Frequent operation, please try again later!");
				return false;
			} else if (data.code == 1) {
				var token = data.data.token;
				localStorage.setItem("token",token);
				window.location.href = "./login.html";
				return false;
			}else if(data.code == 0) {
				mui.toast(data.message)
			}
		})
		.fail(function() {
			mui.toast("Network error, please try again!");
		});

	})
	 
	// 获取短信倒计时
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

})(mui);