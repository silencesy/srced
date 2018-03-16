mui.init({
	pullRefresh: {
		container: '#pullrefresh',
		down: {
			callback: pulldownRefresh
		},
		up: {
			contentrefresh: 'loading...',
			callback: pullupRefresh
		}
	}
});
/**
 * 下拉刷新具体业务实现
 */
function pulldownRefresh() {
	setTimeout(function() {
		var table = document.body.querySelector('.mui-table-view');
		var cells = document.body.querySelectorAll('.mui-table-view-cell');
		for (var i = cells.length, len = i + 8; i < len; i++) {
			var li = document.createElement('li');
			li.className = 'mui-table-view-cell';
			li.innerHTML = '<a href="#">'
					+'<img class="list-li-img" src="images/prodeuctdemo.png">'
					+'<div class="product-list-info">'
						+'<p>itemitemitemitemitemitemiteemitemitemitemiteemitemitemitemiteemitemitemitemiteemitemitemitemiteemitemitemitemitemitemitemitemitem</p>'
						+'<div>'
							+'<span>￥100</span>'
						+'</div>'
					+'</div>'
				+'</a>';
			//下拉刷新，新纪录插到最前面；
			table.insertBefore(li, table.firstChild);
		}
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
	}, 800);
}
var count = 0;
/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {
	setTimeout(function() {
		mui('#pullrefresh').pullRefresh().endPullupToRefresh((++count > 5)); //参数为true代表没有更多数据了。
		var table = document.body.querySelector('.mui-table-view');
		var cells = document.body.querySelectorAll('.mui-table-view-cell');
		for (var i = cells.length, len = i + 8; i < len; i++) {
			var li = document.createElement('li');
			li.className = 'mui-table-view-cell';
			li.innerHTML = '<a href="#">'
					+'<img class="list-li-img" src="images/prodeuctdemo.png">'
					+'<div class="product-list-info">'
						+'<p>itemitemitemitemitemitemiteemitemitemitemiteemitemitemitemiteemitemitemitemiteemitemitemitemiteemitemitemitemitemitemitemitemitem</p>'
						+'<div>'
							+'<span>￥100</span>'
						+'</div>'
					+'</div>'
				+'</a>';
			table.appendChild(li);
		}
	}, 800);
}