(function(mui) {
	mui.init({
		swipeBack:true //启用右滑关闭功能
	});
	getaCartData ();
	isLogin2();
	editCartNumber ('#carPage .mui-badge');
	// 获取购物车信息
	function getaCartData () {
		var token = window.localStorage.getItem('token');
		$.ajax({
			beforeSend: function(request) {
                request.setRequestHeader("TOKEN", token);
            },
			url: csOrzs + '/Api/Cart/getList',
			type: 'POST'
		})
		.done(function(data) {
			console.log(data);
			var cartListData = data.data.list;
			var token = data.data.token;
			localStorage.setItem("token",token);
			if (cartListData.length == 0 ) {
				cartIsEmpty ();
			} else {
				cartNotEmpty ();
				var cartList2 = {"cartList":cartListData};
				var cartListHtml = template('cartTemplate', cartList2);
				$('#cartList').html(cartListHtml);
				imgLazyLoad();
			}
		})
		.fail(function() {
			mui.toast("Network error, please try again!");
		})
	}

	function imgLazyLoad() {
		$("img.lazy").lazyload({ 
			effect : "fadeIn",
			threshold: 600,
			placeholder: "http://api.mall.thatsmags.com/Public/ckfinder/images/grey.jpg"
		}); 
	}

	// 是否登录和过期
	function isLogin2() {
	var token = window.localStorage.getItem('token') || null;
		if (!token) {
			window.location.href = './login.html';
		}
	}

	//拖拽删除
	var btnArray = ['Confirm', 'Cancel'];
	mui('#cartList').on('tap', '.mui-btn', function(event) {
		var elem = this;
		var cartid =$(elem).parents('.mui-slider-right.mui-disabled')
							.siblings('.mui-slider-handle')
							.find('.listCheckBox').attr('cartid');
		console.log(cartid);
		var li = elem.parentNode.parentNode;
		mui.confirm('Are you sure to delete？', ' ', btnArray, function(e) {
			if (e.index == 0) {
				var i = 2;
				if (i===2) {
					var token = window.localStorage.getItem('token');
					$.ajax({
						beforeSend: function(request) {
			                request.setRequestHeader("TOKEN", token);
			            },
						url: csOrzs + '/Api/Cart/deleteCart',
						type: 'POST',
						data: {cart_id: [cartid]},
					})
					.done(function(data) {
						localStorage.setItem("token",data.data.token);
						$(li).remove();
						cartIsEmpty ();
						checkedValues();
						AllLight();
						editCartNumber ('#carPage .mui-badge');
						mui.toast('Deleted successfully!');
					})
					.fail(function() {
						mui.toast('Failed to delete!');
					});
					
					
				} else {
					mui.swipeoutClose(li);
				}

			} else {
				setTimeout(function() {
					mui.swipeoutClose(li);
				}, 0);
			}
		});
	});
	
	mui('#header').on('tap', '.edit-btn', function(event) {
		var doneBtn = document.getElementById('doneBtn');
		var doDelete = document.getElementById('doDelete');
		doneBtn.style.display = 'block';
		toPay.style.display = 'none';
		doDelete.style.display = 'block';
		this.style.display = "none";
		mui('.product-buy-info').each(function(){
			this.style.display = "none";
		});
		mui('.sub-add').each(function(){
			this.style.display = "block";
		});
		mui('.mui-table-view-cell').each(function(index, el) {
			mui.swipeoutClose(this);
		});
		sunAddColor ();

	});


	// 批量更新/更改购物车
	mui('#header').on('tap', '#doneBtn', function(event) {
		var editBtn = document.getElementById('editBtn');
		var doneBtn = document.getElementById('doneBtn');
		var doDelete = document.getElementById('doDelete');
		var doDelete = document.getElementById('doDelete');

		editBtn.style.display = 'block';
		doneBtn.style.display = 'none';
		toPay.style.display = 'block';
		doDelete.style.display = 'none';

		mui('.product-buy-info').each(function(){
			this.style.display = "block";
		});
		mui('.sub-add').each(function(){
			this.style.display = "none";
		});
		$('.product-buy-info .number').each(function(index, el) {
			$(this).text($(this).parents('.product-list-info').find('input').val());
		});
		$('.listCheckBox').each(function(index, el) {
			$(this).val($(this).siblings('.product-list-info').find('input').val());
		});
		checkedValues();
		var allEditObj = {};
		$('.edit-input').each(function(index, el) {
			allEditObj[$(this).attr('cartid')]= $(this).val();
		});
		// 批量更改购物车
		var token = window.localStorage.getItem('token');
		$.ajax({
			beforeSend: function(request) {
                request.setRequestHeader("TOKEN", token);
            },
			url: csOrzs + '/Api/Cart/editCart',
			type: 'POST',
			data: {
				cart_array: allEditObj
			},
		})
		.done(function(data) {
			if (data.code == 1) {
				window.localStorage.setItem('token',data.data.token);
			} else {
				mui.toast('Save failed!');
			}
		})
		.fail(function() {
			mui.toast('Network error, please try again!');
			console.log(1);
		})	

		mui('.mui-table-view-cell').each(function(index, el) {
			mui.swipeoutClose(this);
		});0
	});


	// 批量删除
	mui('#checkAll').on('tap', '#doDelete', function(event) {
		if($('input:checkbox[class=listCheckBox]:checked').length === 0) {
			mui.toast('Please select the goods you want to delete.');
		} else {
			mui.confirm('Are you sure to delete the selected goods?', ' ', btnArray, function(e) {
				if (e.index == 0) {
					var deleteArr = [];
					$('input:checkbox[class=listCheckBox]:checked').each(function(index, el) {
						deleteArr.push($(this).attr('cartid'));
					});
					console.log(deleteArr);
					var token = window.localStorage.getItem('token');
					$.ajax({
						beforeSend: function(request) {
			                request.setRequestHeader("TOKEN", token);
			            },
						url: csOrzs + '/Api/Cart/deleteCart',
						type: 'POST',
						data: {
							cart_id: deleteArr
						}
					})
					.done(function(data) {
						console.log(data);
						if (data.code == 1) {
							$('input:checkbox[class=listCheckBox]:checked').each(function(index, el) {
								$(this).parents('.mui-table-view-cell').remove();
							});
							checkedValues();
							cartIsEmpty();
							AllLight();
							editCartNumber ('#carPage .mui-badge');
							window.localStorage.setItem('token',data.data.token);
							mui.toast("Deleted successfully!");
						} else {
							mui.toast("Failed to delete!");
						}
					})
					.fail(function() {
						mui.toast("Failed to delete!");
					});
					
					
				}
			});
		}
	});

	// 支付

	mui('#checkAll').on('tap', '#toPay', function(event) {
		if($('input:checkbox[class=listCheckBox]:checked').length === 0) {
			mui.toast('Please select at least one goods before the payment.');
		} else {

			var payArr = [];
			var proObj = {};
			$('input:checkbox[class=listCheckBox]:checked').each(function(index, el) {
				payArr.push($(this).attr('cartid'));
				proObj[$(this).attr('priceid')] = $(this).val();
			});
			var proObjString = JSON.stringify(proObj);
			var token = window.localStorage.getItem('token');
			$.ajax({
				beforeSend: function(request) {
	                request.setRequestHeader("TOKEN", token);
	            },
				url: csOrzs + '/Api/Cart/judgeOrder',
				type: 'POST',
				data: {cart_id: payArr},
			})
			.done(function(data) {
				console.log(data);
				if (data.code == 0) {
					window.localStorage.setItem('token',data.data.token);
					mui.toast('Network error, please try again!');
					console.log(1);
				}

				if (data.code == -120) {
					window.localStorage.setItem('token',data.data.token);
					mui.toast('The general goods and eTicket should be paid separately.',{ duration:'long', type:'div' });
				}
				if(data.code == 1) {
					window.localStorage.setItem('token',data.data.token);
					if (data.data.status == 1) {
						window.location.href = './order-confirm-email.html?proarr=' + proObjString + '&status=1'+'&payArr='+ payArr;
					}
					if (data.data.status == 2) {
						window.location.href = './order-confirm-addr.html?proarr=' + proObjString+ '&status=2'+'&payArr='+ payArr;
					}
				}

			})
			.fail(function() {
				console.log("error");
			});
			
			
		}
	});
	
	// 全选和全不选
	mui('.settlement-box').on('change', 'input', function() {
		var value = this.checked;
		mui('.listCheckBox').each(function() {
			if (value) {
				this.checked = true;
			} else {
				this.checked = false;
			}
		});
		checkedValues();
	});

	// 勾选购物车算价格和高亮all input
	$('#cartList').on('change', '.mui-table-view-cell', function(event) {
 		AllLight();
		checkedValues();
 	});

	//所有选项选中all亮 
	function AllLight() {
		var checkAllInput = document.getElementById('checkAllInput');
		var flag = 0;
		mui('.listCheckBox').each(function(index, el) {
			if (this.checked) {
				flag++;
			}
		});
		if(flag==mui('.listCheckBox').length) {
			checkAllInput.checked = true;
			
		} else {
			checkAllInput.checked = false;
			
		}
	}
	
	// 页面跳转
	$('.mui-content').on('click', 'a', function(event) {
 		window.location.href = $(this).attr('href');
 	});

	//购物车加减
 	$('#cartList').on('click', '.sub', function(event) {
 		
 		event.preventDefault();
 		var n = $(this).siblings('input').val() || 2;
		var num = parseInt(n)-1;
        if (num == 1) {
           this.style.color = "#D5D5D5";
        }
		if(num==0){
            return;
        }
		$(this).siblings('input').val(num);
 	});

 	//购物车加减
 	$('#cartList').on('click', '.add', function(event) {
 		event.preventDefault();
 		/* Act on the event */
 		this.previousElementSibling.previousElementSibling.style.color = "#222";
	 	var n = $(this).siblings('input').val() || 1;
	 	var num=parseInt(n)+1;
	 	$(this).siblings('input').val(num);
 	});

	//购物车空跳转空购物车
    function cartIsEmpty () {
    	console.log(1);
        if (mui('.mui-table-view-cell').length===0) {
            $('#header').hide();
            $('.mui-content').hide();
			$('#checkAll').hide();
			$('.cart-empty-box').show();
        }
    }
    //显示购物车
	function cartNotEmpty () {
        if (mui('.mui-table-view-cell').length===0) {
            $('#header').show();
            $('.mui-content').show();
			$('#checkAll').show();
			$('.cart-empty-box').hide();
        }
    }
	//算总价格
    function checkedValues(){ 
		var arr=new Array(); 
		var arr2=new Array(); 
		var sumPriceNumber = 0;
		var checkbox=document.getElementsByClassName('listCheckBox');
		var sumPrice = document.getElementById('sumPrice');
		for(var i=0;i<checkbox.length;i++){ 
			if(checkbox[i].checked==true){ 
				arr.push($(checkbox[i]).siblings('.product-list-info').find('.price').text());
				arr2.push($(checkbox[i]).siblings('.product-list-info').find('.number').text());
			} 
		}
		for(var i=0;i<arr.length;i++){
			sumPriceNumber +=arr[i]*arr2[i];
		}
		sumPrice.innerText = sumPriceNumber.toFixed(2);
	}


	function sunAddColor () {
		$('.sub-add input').each(function(index, el) {
			if($(this).val()>1) {
				$(this).prev().css({"color":"#222"});
			}
		});
	}

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
				} else if (data.data.amount == 0) {
					$(dom).html('');
				}
			} else {
				// mui.toast("Network error, please try again!");
			}
			
		})
		.fail(function() {
			// mui.toast("Network error, please try again!");
		});
	}
	
})(mui);