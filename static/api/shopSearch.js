(function(mui) {
	// var removeHistory = document.getElementById('removeHistory');
	// var btnArray = ['Confirm', 'Cancel'];
	// removeHistory.addEventListener('tap',function(){
	// 	mui.confirm('Are you sure to clear the search history?', ' ', btnArray, function(e) {
	// 		if (e.index == 0) {
	// 			$('.history-txt').html("");
	// 			mui.toast('Clear search history!');
	// 		} else {
				
	// 		}
	// 	});
	// });
	var merchantsid = getQueryString("merchantsid");

	$('#shopsearchbtn').on('click',function(){
		var searchKey = $('#searchkeywords').val();
		if (searchKey == '') {
			mui.toast('Please enter keywords!');
		} else {
			
		}
	});
	function getQueryString(name) {
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
			var r = window.location.search.substr(1).match(reg);
		if (r != null) {
			return unescape(r[2]);
		}
			return null;
	}

})(mui);