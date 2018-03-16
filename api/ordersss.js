(function(mui) {
	var showIndex;


	var listDomArr = [];
	var miniRefreshArr = [];

	showTab();

	var initMiniRefreshs = function(dom,index) {
        
        // listDomArr[index] = document.querySelector('#listdata' + index);
        
        miniRefreshArr[index] = new MiniRefresh({
            container: '#' + dom,
            down: {
            	contentdown: 'Release to refresh',
                contentover: 'Pull down to refresh',
                contentrefresh: 'Loading…',
                callback: function() {         
                    miniRefreshArr[index].endDownLoading(true);
                }
            },
            up: {
                isAuto: true,
                contentdown: 'Pull up to load more',
                contentrefresh: 'Loading…',
                contentnomore: 'No more data',
                callback: function() {
                    setTimeout(function() {
                        console.log(0);
                        miniRefreshArr[index].endUpLoading(true);
                    }, 1000);
                }
            }
        });
    };

    initMiniRefreshs('all',0);
    initMiniRefreshs('unpaid',1);
    initMiniRefreshs('paid',2);
    initMiniRefreshs('deliverd',3);
    initMiniRefreshs('review',4);

	function showTab() {
		var showflag = getQueryString('show') || "All";
		var show = showflag.toLowerCase();
		$('.mui-bar .mui-tab-item').each(function(index, el) {
			$(this).removeClass('mui-active');
		});
		$('.mui-bar .mui-tab-item').each(function(index, el) {
			if ($(this).attr('href')==('#'+show)) {
				$(this).addClass('mui-active');
				showIndex = index;
			}
		});
		$('.mui-content .mui-control-content').each(function(index, el) {
			$(this).removeClass('mui-active');
		});
		$('.mui-content .mui-control-content').each(function(index, el) {
			if (showIndex == index) {
				$(this).addClass('mui-active');
			}
		});
	}
	
	function getQueryString(name) {
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
		var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return unescape(r[2]);
	}     
		return null;
	}
})(mui);