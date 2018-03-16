(function(mui) {
	var token = getQueryString('token') || null;
	
	if (token) {
		getUserInfo ();
	} else {
		getUserInfo2 ();
	}

	// if (token2) {
	// 	getUserInfo2 ();
	// }
	console.log(csOrzs);
	function getUserInfo () {
		localStorage.setItem("token",token);	
		$.ajax({
			// 请求网址
            beforeSend: function(request) {
                request.setRequestHeader("TOKEN", token);
            },
			url: csOrzs + '/Api/Common/me',
			type: 'POST',
		})
		.done(function(data) {
			console.log(data);
			if (data.code == 1) {
				localStorage.setItem("token",data.data.token);
				var AvatarData = data.data.user_data;
				var AvatarHtml = template('AvatarTemplate', AvatarData);
				$('#personalTitle').html(AvatarHtml);
				var statusData = data.data;
				var statusHtml = template('statusTemplate', statusData);
				$('#statusbox').html(statusHtml);
				// $('#Avatar').attr("src",data.data.user_data.head_img);
				// $('#userName').html(data.data.user_data.third_name);
				editCartNumber ('#carPage .mui-badge');
			} else {
				mui.toast("Network error, please try again!");
			}
		})
		.fail(function() {
			mui.toast("Network error, please try again!");
		});
	}
	function getUserInfo2 () {
		var token2 = localStorage.getItem("token");
		$.ajax({
			// 请求网址
            beforeSend: function(request) {
                request.setRequestHeader("TOKEN", token2);
            },
			url: csOrzs + '/Api/Common/me',
			type: 'POST',
		})
		.done(function(data) {
			console.log(data);
			if (data.code == 1) {
				localStorage.setItem("token",data.data.token);
				var AvatarData = data.data.user_data;
				var AvatarHtml = template('AvatarTemplate', AvatarData);
				$('#personalTitle').html(AvatarHtml);
				var statusData = data.data;
				var statusHtml = template('statusTemplate', statusData);
				$('#statusbox').html(statusHtml);
				// $('#Avatar').attr("src",data.data.user_data.head_img);
				// $('#userName').html(data.data.user_data.third_name);
				editCartNumber ('#carPage .mui-badge');
			} else {
				mui.toast("Network error, please try again!");
			}
		})
		.fail(function() {
			mui.toast("Network error, please try again!");
		});
	}

	var goOrders = document.getElementById('goOrders');
	goOrders.addEventListener('tap',function(){
		window.location.href = '../orders.html?show=item1mobile';
	});

	// 获取购物车数量
	function editCartNumber (dom) {
		var token = window.localStorage.getItem('token');
		$.ajax({
			beforeSend: function(request) {
	            request.setRequestHeader("TOKEN", token);
	        },
			url: csOrzs + '/Api/Cart/getAmount',
			type: 'POST',
		})
		.done(function(data) {
			if (data.code==1) {
				if (data.data.amount != 0) {
					$(dom).html(data.data.amount);
				}
			} else {
				// mui.toast("请求数据错误！");
				// 
			}
			
		})
		.fail(function() {
			// mui.toast("请求数据错误！");
		});
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

})(mui);