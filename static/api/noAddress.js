mui.init({
	swipeBack:true //启用右滑关闭功能
});

mui('.no-address').on('tap','a',function(){
    window.location.href = this.getAttribute('href');
});