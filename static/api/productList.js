//启用双击监听
mui.init({
	gestureConfig:{
		doubletap:true
	},
	subpages:[{
		url:'pullrefresh_sub2.html',
		id:'pullrefresh_sub2.html',
		styles:{
			top: '45px',
			bottom: '0px',
		}
	}]
});
var contentWebview = null;
document.querySelector('header').addEventListener('doubletap',function () {
	if(contentWebview==null){
		contentWebview = plus.webview.currentWebview().children()[0];
	}
	contentWebview.evalJS("mui('#pullrefresh').pullRefresh().scrollTo(0,0,100)");
});
mui('.mui-bar-tab').on('tap','a',function(){
    console.log(this.getAttribute('href'));
    window.location.href = this.getAttribute('href');
})