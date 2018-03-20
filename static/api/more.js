
(function(mui) {
	mui.init({
		swipeBack:true //启用右滑关闭功能
	});
	
	function imgLazyLoad() {
		$("img.lazy").lazyload({ 
			effect : "fadeIn",
			threshold: 600,
			placeholder: "http://api.mall.thatsmags.com/Public/ckfinder/images/grey.jpg"
		}); 
	}
	getData();
	function getData() {
		$.ajax({
			url:  csOrzs + '/Api/Set/getList',
			type: 'GET',
			data: {set_position: '14'},
		})
		.done(function(data) {
			console.log(data);
			if ( data.code == 1 ) {
				var imglist = data.data;
				var imglist2 = {"imglist":imglist};
				var imgTemplateHtml = template('imgTemplate', imglist2);
				$('.more-page').html(imgTemplateHtml);
				imgLazyLoad();
			} else {
				mui.toast("Network error, please try again!");
			}
		})
		.fail(function() {
			mui.toast("Network error, please try again!");
		});
		
	}
})(mui);