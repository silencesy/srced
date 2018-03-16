(function(mui) {
	mui.ready(function() {
		var backTimer = null;
		var isTop = true;
		var clientHeight = document.documentElement.clientHeight;
		var backBtn = document.getElementById('backBtn');
		var getCode = document.getElementById('getCode');
		var submitEmail = document.getElementById('loginBtn');
		var countdown=60;
		getAllDate ();
		search();
		var isloop;
		// 数据获取
		function getAllDate () {
			$.ajax({
				url: csOrzs + '/Api/Public/home',
				type: 'POST',
				dataType: 'json'
			})
			.done(function(data) {
				var homeData = data;
				console.log(homeData);
				if (data.code==1) {
					// 首页轮播
					var figures = homeData.data.figure;
					if (figures.length == 1) {
						isloop = false;
					} else {
						isloop = true;
					}
					var homeBannerList2 = {"homeBannerList":figures};
					var homeBannerHtml = template('homeBanner', homeBannerList2);
					$('#homeBannerbox').html(homeBannerHtml);
					homeBannerFunction();
					
					// 商户模板
					var merchants = homeData.data.merchant;
					var merchantsList2 = {"merchantsList":merchants};
					var merchantsHtml = template('merchants', merchantsList2);
					$('#merchantsBox').html(merchantsHtml);
					homeProductCarousel1();
					// 商品模板
					var products = homeData.data.goods;
					var productList2 = {"productList":products};
					var productsHtml = template('products', productList2);
					$('#productBox').html(productsHtml);
					homeProductCarousel2();
					// 文章模板
					var articles = homeData.data.article;
					var articlesList2 = {"articlesList":articles};
					var articlesTtml = template('articles', articlesList2);
					$('#articleBox').html(articlesTtml);
					// deals模板
					var dealsData = homeData.data.deals;
					var dealsTtml = template('deals', dealsData);
					$('#categoryBox').append(dealsTtml);
					// allMerchanttemplate模板
					var allMerchantData = homeData.data.allMerchant;
					var allMerchantDataTtml = template('allMerchanttemplate', allMerchantData);
					$('#categoryBox').append(allMerchantDataTtml);
					// 分类模板
					var category = homeData.data.category;
					var categoryList2 = {"categoryList":category};
					var categorysTtml = template('categorys', categoryList2);
					$('#categoryBox').append(categorysTtml);

					// 广告1
					var ads = homeData.data.ads;
					if (ads.length!=0) {
						adFlag(0);
						adFlag(1);
						adFlag(2);
					}
					imgLazyLoad();
					$('.layout.home-layout').css("visibility","visible");
					$('.layer-box').remove();
					$('#homePageShow').css("visibility","block");
					function adFlag(index) {
						if (ads[index].ad_cat_id == 1) {
							var ad1 = 	'<a href="./product-detail.html?productid='+ ads[index].ad_id +'">'
								+'<img class="lazy" src="'+ ads[index].ad_img +'" alt="" />'
								+'</a>'
							$('#homeId'+ (index+1)).html(ad1);
						} else if (ads[index].ad_cat_id == 2) {
							var ad2 = 	'<a href="./shopOwner-home.html?merchantsid='+ ads[index].ad_id +'">'
								+'<img class="lazy" src="'+ ads[0].ad_img +'" alt="" />'
								+'</a>'
							$('#homeId'+ (index+1)).html(ad2);
						} else {
							var ad3 = 	'<a href="'+ads[index].ad_url+'">'
								+'<img class="lazy" src="'+ ads[index].ad_img +'" alt="" />'
								+'</a>'
							$('#homeId'+ (index+1)).html(ad3);
						}
					}
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
				threshold: 200,
				placeholder: "http://api.mall.thatsmags.com/Public/ckfinder/images/grey.jpg"
			}); 
		}

		
		mui.init({
			swipeBack:true //启用右滑关闭功能
		});

	    document.getElementById('backBtn').addEventListener('tap',function(e){
	   		 backTimer = setInterval(function(){
		      //获取滚动条距离顶部高度
		      var osTop = document.documentElement.scrollTop || document.body.scrollTop;
		      var ispeed = Math.floor(-osTop / 7);
		       
		      document.documentElement.scrollTop = document.body.scrollTop = osTop+ispeed;
		      //到达顶部，清除定时器
		      if (osTop == 0) {
		        clearInterval(backTimer);
		      };
		      isTop = true;
		       
		    },5);
	   		e.preventDefault();
	   	});

		//首页第一个轮播
	    function homeBannerFunction () {
	    	var homeBannerCarousel = new Swiper('.home-banner-carousel',{
				loop: isloop,
				autoplay: 4000,
				speed: 1000,
				autoplayDisableOnInteraction: false,
				pagination : '.swiper-pagination',
				paginationClickable :true				
			});
	    }
	    //首页第二个轮播
	    function homeProductCarousel1() {
			var homeProductCarousel = new Swiper('.home-product-carousel1',{
		        scrollbar: '.swiper-scrollbar',
		        scrollbarHide: true,
		        slidesPerView: 'auto',
		        freeMode : true,
		        spaceBetween: 5,
		        slidesPerView: 3.2,
		        grabCursor: true
			});
		}

		//首页第三个轮播
		function homeProductCarousel2() {
			var homeProductCarousel = new Swiper('.home-product-carousel2',{
		        scrollbar: '.swiper-scrollbar',
		        scrollbarHide: true,
		        slidesPerView: 'auto',
		        freeMode : true,
		        spaceBetween: 5,
		        slidesPerView: 3.2,
		        grabCursor: true
			});
		}

		//搜索
		var userPicker = new mui.PopPicker();
		userPicker.setData([{
			value: 'All',
			text: 'All'
		},{
			value: 'Shops',
			text: 'Shops'
		}, {
			value: 'Deals',
			text: 'Deals'
		}, {
			value: 'Ticketing',
			text: 'Ticketing'
		}, {
			value: 'Coupons',
			text: 'Coupons'
		}]);

		// 搜索下拉选选择
		var showUserPickerButton = document.getElementById('showUserPicker');
		showUserPickerButton.addEventListener('tap', function(event) {
			userPicker.show(function(items) {
				showUserPickerButton.innerHTML = items[0].text + '<i class="iconfont icon-xiangshangjiantou-copy-copy-copy fr"></i>';
				$(showUserPickerButton).attr('value',items[0].text);
			});
		}, false);

		$('.iconfont.icon-sousuo').on("click",function(){

			var searchText = $('#searchInput').val();
			if (searchText=='') {
				$('#searchInput').blur();
				mui.toast("Please enter keywords!");
			} else {
				if ($(showUserPickerButton).attr('value')=='Shops') {
					window.location.href = './search-result.html?searchdata='+ searchText;
				} else if ($(showUserPickerButton).attr('value')=='Deals'){
					window.location.href = './search-all.html?searchdata=' + searchText + '&flag=' + 1;
				} else if ($(showUserPickerButton).attr('value')=='Ticketing'){
					window.location.href = './search-all.html?searchdata=' + searchText + '&flag=' + 3;
				} else if ($(showUserPickerButton).attr('value')=='Coupons'){
					window.location.href = './search-all.html?searchdata=' + searchText + '&flag=' + 4;
				} else {
					window.location.href = './search-all.html?searchdata=' + searchText + '&flag=' + 0;
				}
			}		
		});
		$('#homeSearch').submit(function(e){
			$('#searchInput').blur();
	  		var searchText = $('#searchInput').val();
			if (searchText=='') {
				$('#searchInput').blur();
				mui.toast("Please enter keywords!");
			} else {
				if ($(showUserPickerButton).attr('value')=='Shops') {
					window.location.href = './search-result.html?searchdata='+ searchText;
				} else if ($(showUserPickerButton).attr('value')=='Deals'){
					window.location.href = './search-all.html?searchdata=' + searchText + '&flag=' + 1;
				} else if ($(showUserPickerButton).attr('value')=='Ticketing'){
					window.location.href = './search-all.html?searchdata=' + searchText + '&flag=' + 3;
				} else if ($(showUserPickerButton).attr('value')=='Coupons'){
					window.location.href = './search-all.html?searchdata=' + searchText + '&flag=' + 4;
				} else {
					window.location.href = './search-all.html?searchdata=' + searchText + '&flag=' + 0;
				}
			}		
		});

		// 搜索栏渐变
		function search() {
		    var searchBox = document.querySelector('#searchBg');
		    var bannerBox = document.querySelector('.home-banner-carousel');
		    var height = 280;
		    // console.log(height);
		    window.onscroll = function(){
		        var top = document.body.scrollTop || document.documentElement.scrollTop;
		        // console.log(top,height,bannerBox);
		        var opacity = 0;
		        if(top > height){
		            opacity = 0.95;
		        }
		        else{
		            opacity = 0.95 * (top/height);
		        }
		        if (top >= clientHeight) {
				  	backBtn.style.display = "block";
				} else {
				  	backBtn.style.display = "none";
				};
		        searchBox.style.background = "rgba(246,67,44,"+opacity+")";
		    }
		}

	});
	
	

})(mui);