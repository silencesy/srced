(function(mui) {

	mui.init();
	mui.ready(function() {
		var _getParam = function(obj, param) {
			return obj[param] || '';
		};					
		var showUserPickerButton = document.getElementById('showUserPicker');
		var userResult = document.getElementById('userResult');				
		//三级联动
		// var cityPicker3 = new mui.PopPicker({
		// 	layer: 3
		// });
		// cityPicker3.setData(cityData3);
		// var showCityPickerButton = document.getElementById('showCityPicker3');
		// var cityResult3 = document.getElementById('cityResult3');
		// showCityPickerButton.addEventListener('tap', function(event) {
		// 	cityPicker3.show(function(items) {
		// 		cityResult3.value = _getParam(items[0], 'text') + " " + _getParam(items[1], 'text') + " " + _getParam(items[2], 'text');
				//返回 false 可以阻止选择框的关闭
				//return false;
		// 	});
		// 	$('input').blur();
		// }, false);
		//输入框校验开始
		var subto = document.getElementById('subto');
		subto.addEventListener('tap',function() {
			var tel = /^1[34578]\d{9}$/;
			var name = document.getElementById('name').value;
			var theNumber = document.getElementById('number').value;
			// var cityResult3 = document.getElementById('cityResult3').value;
			var theTextareaC = document.getElementById('textareaC').value;
			var theTextareaE = document.getElementById('textareaE').value;
			var checkDeafultFlag = ($('#checkDeafult').is(':checked') == false)?0:1;
			console.log(checkDeafultFlag);

			// console.log(name,theNumber,cityResult3,theTextarea)
			if(name == '') {
				mui.toast('Please enter your name!');
				return false
			}else if(!tel.test(theNumber)) {
					mui.toast('Please enter a 11-digit vaild number!');
				return false
			}
			// else if(cityResult3 == '') {
			// 	mui.toast('Please select your region!');
			// 	return false
			// }
			else if(theTextareaC == '') {		
				mui.toast('Please write down your detailed address in Chinese!');
				return false
			}
			
			var token = window.localStorage.getItem('token');
			$.ajax({
				beforeSend: function(request) {
	                request.setRequestHeader("TOKEN", token);
	            },
				url: csOrzs + '/Api/Address/addAddress',
				type: 'POST',
				data: {
					fullname: name,
					phone: theNumber,
					// region: cityResult3,
					region: theTextareaC,
					region_detail: theTextareaE,
					is_default: checkDeafultFlag

				}
			})
			.done(function(data) {
				if (data.code == 1) {
					window.localStorage.setItem('token',data.data.token);
					window.location.href = './address.html';
				} else {
					mui.toast("Error!");
				}
				
			})
			.fail(function() {
				mui.toast("Error!");
			});
			


		});
		//输入框校验结束	
		function getUrlParam(key){
            // 获取参数
            var url = window.location.search;
            // 正则筛选地址栏
            var reg = new RegExp("(^|&)"+ key +"=([^&]*)(&|$)");
            // 匹配目标参数
            var result = url.substr(1).match(reg);
            //返回参数值
            return result ? decodeURIComponent(result[2]) : null;
        }

        	
	});
})(mui);	