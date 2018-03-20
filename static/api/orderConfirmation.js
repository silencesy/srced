(function(mui) {
	document.getElementById("changeEmail").addEventListener('tap', function(e) {
		$defaultText = $('#emailText').html();
        e.detail.gesture.preventDefault(); //修复iOS 8.x平台存在的bug，使用plus.nativeUI.prompt会造成输入法闪一下又没了
        var btnArray = ['Cancel', 'Done'];
        mui.prompt('Change the email address', 'Email  address', ' ', btnArray, function(e) {
            if (e.index == 1) {
                if (e.value.length==0) {
                    mui.toast("Please enter your email address!");
                    return false;
                } else if (!/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(e.value)) {
                    mui.toast("Please enter a valid email address!");
                    return false;
                } else {
                    $('#emailText').html(e.value);
                    mui.toast("Successfully!");
                }

               
                
            } else {
                
            }
        })
    });
})(mui);
