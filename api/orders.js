mui.init({
	swipeBack:true //启用右滑关闭功能
});

mui('.mui-bar-tab').on('tap','a',function(){
    window.location.href = this.getAttribute('href');
});