(function(mui) {

	getPageDataGoods (); 
	getPageDataShops ();
	// 数据获取
	function getPageDataGoods () {
		var token = window.localStorage.getItem('token');
		$.ajax({
			// 请求网址
            beforeSend: function(request) {
                request.setRequestHeader("TOKEN", token);
            },
			url: csOrzs + '/Api/Collect/collectList',
			type: 'POST',
			data: {content_type: 1},
		})
		.done(function(data) {
			console.log(data);
			if (data.code == 1) {
				localStorage.setItem("token",data.data.token);
				var goodData = data.data.list;
				var favouriteList2 = {"favouriteList":goodData};
				var favouriteHtml = template('favouriteTemplate', favouriteList2);
				$('#goodsList').html(favouriteHtml);
				imgLazyLoad();
			} else {
				mui.toast("Network error, please try again!");
			}
		})
		.fail(function() {
			mui.toast("Network error, please try again!");
		});	
	}

	function getPageDataShops () {
		var token = window.localStorage.getItem('token');
		$.ajax({
			// 请求网址
            beforeSend: function(request) {
                request.setRequestHeader("TOKEN", token);
            },
			url: csOrzs + '/Api/Collect/collectList',
			type: 'POST',
			data: {content_type: 2},
		})
		.done(function(data) {
			console.log(data);
			if (data.code == 1) {
				localStorage.setItem("token",data.data.token);
				var goodData = data.data.list;
				var favouriteList2 = {"favouriteList":goodData};
				var favouriteHtml = template('favouriteTemplate2', favouriteList2);
				$('#shopList').html(favouriteHtml);
				imgLazyLoad();
			} else {
				mui.toast("Network error, please try again!");
			}
		})
		.fail(function() {
			mui.toast("Network error, please try again!");
		});	
	}

	function imgLazyLoad() {
		$("img.lazy").lazyload({ 
			effect : "fadeIn",
			threshold: 0,
			placeholder: csOrzs + "/Public/ckfinder/images/lazyimg/lazy.jpg"
		}); 
	}

	// 切换
	$('.tab-btn >li').click(function(){
		$('.tab-btn >li').eq($(this).index()).addClass('tab-active').siblings().removeClass('tab-active');
		$('.tab-con >div').hide().eq($(this).index()).show();
	});

	$('.mui-favourite-content').on('click', 'a', function(event) {
		window.location.href = $(this).attr("href");
	});

	// 删除
 	var btnArray = ['Confirm', 'Cancel'];
 	mui('.save-pro-ul').on('tap', '.delete-btn', function(event) {
     	var that = this;
		mui.confirm('Are you sure you delete the good？', ' ', btnArray, function(e) {
			if (e.index == 0) {
				var id = $(that).parents('.save-pro-list').attr("goodsid");
				Collection (0,id,1);
				$(that).parents('.save-pro-list').slideUp("fast");
				mui.toast('The goods has been deleted');
			} else {
							
			}
		});
 	});

    mui('.tab-con').on('tap', '.shopsDelete', function(event) {
     	var that = this;
		mui.confirm('Are you sure you delete the good？', ' ', btnArray, function(e) {
			if (e.index == 0) {
				var id = $(that).parents('.shops-list').attr("shopid");
				Collection (0,id,2);
				$(that).parents('.shops-list').slideUp("fast");
				mui.toast('The shops has been deleted');
			} else {
							
			}
		});
 	});	
 		

 	// 收藏共用
    function Collection (isnot,id,shoporpro) {
        var token = window.localStorage.getItem('token');
        $.ajax({
            beforeSend: function(request) {
                request.setRequestHeader("TOKEN", token);
            },
            url: csOrzs + '/Api/Collect/userCollect',
            type: 'POST',
            data: {
                status: isnot,
                content_id: id,
                content_type: shoporpro,
                },
            })
            .done(function(data) {
                if (data.code == 1) {
                    // localStorage.setItem("token",data.data.token);
                    // mui.toast(info);
                }
        })
        .fail(function() {
            mui.toast("Network error, please try again!");
        })    
    }
})(mui);