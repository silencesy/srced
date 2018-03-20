(function(mui) {
	mui.previewImage();
	h('#buyIcon').tap(function(){
		window.location.href= this.href;
	});

	$(".comment-title2").click(function() {
        $(".comment-title1").removeClass("comment-title-active");
        $(this).addClass("comment-title-active");
		$.each($('.comment-box'),function(index,item){
		    if($(this).hasClass('withImg') == false) {
		        $(this).css("display","none");
			}
		});
	});
	$(".comment-title1").click(function() {
        $(".comment-title2").removeClass("comment-title-active");
        $(this).addClass("comment-title-active");
        $(".comment-box").css("display","block");
	});
})(mui);
