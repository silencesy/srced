(function(mui) {
	var subto = document.getElementById('subto');
	subto.addEventListener('tap',function() {
		/*验证税号 15或者17或者18或者20位字母、数字组成*/
		var tel = /^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/;
		var name = document.getElementById('name').value;
		var theTextarea = document.getElementById('textarea').value;
		var theNumber = document.getElementById('number').value;
		var checkDeafultFlag = ($('#checkDeafult').is(':checked') == false)?0:1;
		console.log(checkDeafultFlag);
		if(name == '') {
			mui.toast('Please enter your company name!');
			return false
		}else if(theTextarea == '') {		
			mui.toast('Please enter your company address!');
			return false
		}else if(!tel.test(theNumber)) {
			mui.toast('Please enter a right tax number!');
			return false
		}
		var token = window.localStorage.getItem('token');

		$.ajax({
			beforeSend: function(request) {
                request.setRequestHeader("TOKEN", token);
            },
			url: csOrzs + '/Api/Invoice/addInvoice',
			type: 'POST',
			data: {
				company_name: name,
				tax: theNumber,
				region: theTextarea,
				is_default: checkDeafultFlag
			},
		})
		.done(function(data) {
			if (data.code == 1) {
				window.localStorage.setItem('token',data.data.token);
				window.location.href = './invoice-list.html';
			} else {
				mui.toast("Error");
			}
			
		})
		.fail(function() {
			mui.toast("Error");
		})
	});

})(mui);
