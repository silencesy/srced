var submitArrImg = [];
function imgChange(obj1, obj2) {
    console.log(obj1);
    console.log(obj2);
    var file = document.getElementById("file");
    var imgContainer = document.getElementsByClassName(obj1)[0];
    var fileList = file.files;
    var file2 = file.files[0];
    var input = document.getElementsByClassName(obj2)[0];
    var imgArr = [];
    for (var i = 0; i < fileList.length; i++) {
        var imgUrl = window.URL.createObjectURL(file.files[i]);
        imgArr.push(imgUrl);
        var img = document.createElement("img");
        img.setAttribute("src", imgArr[i]);
        var imgAdd = document.createElement("div");
        imgAdd.setAttribute("class", "z_addImg");
        imgAdd.appendChild(img);
        imgContainer.appendChild(imgAdd);
    };
    imgRemove();
    var reader = new FileReader();   
    reader.readAsDataURL(file2);   
    reader.onload = function(e){    
        var string = this.result.toString();    
        submitArrImg.push(string); 
    }  
    
};

function imgRemove() {
    var imgList = document.getElementsByClassName("z_addImg");
    var mask = document.getElementsByClassName("z_mask")[0];
    var cancel = document.getElementsByClassName("z_cancel")[0];
    var sure = document.getElementsByClassName("z_sure")[0];
    for (var j = 0; j < imgList.length; j++) {
        imgList[j].index = j;

        imgList[j].onclick = function() {

            var t = this;
            mask.style.display = "block";
            cancel.onclick = function() {
                mask.style.display = "none";
            };
            sure.onclick = function() {
                mask.style.display = "none";
                t.style.display = "none";
                console.log(t.index);
                // submitArrImg.splice(t.index,1);
                submitArrImg.splice(t.index,1);
                console.log(submitArrImg);
            };
        }
    };
};
(function(mui) {
    //输入框校验开始
    var refundSubmit = document.getElementById('refundSubmit');
    var order_goods_id = getQueryString('flagid');
    var token = localStorage.getItem("token");
    refundSubmit.addEventListener('tap',function() {
    var refundTextarea = document.getElementById('refundTextarea').value;
        if(refundTextarea == '') {
            mui.toast('Reason of cancel cannot be empty');
            return false;
        } else {
            console.log(submitArrImg);
            $('.layer-box').show();
            $.ajax({
                // 请求网址
                beforeSend: function(request) {
                    request.setRequestHeader("TOKEN", token);
                },
                url: csOrzs + '/Api/Order/addRefund',
                type: 'POST',
                data: {
                    order_goods_id: order_goods_id,
                    content: refundTextarea,
                    image_array: submitArrImg
                },
            })
            .done(function(data) {
                if (data.code == 1) {
                    mui.toast("Success!");
                    $('.layer-box').hide();
                    setTimeout(function(){
                        window.location.href = './refund-info.html';
                    },200);
                } else {
                    mui.toast("Network error, please try again!");
                    $('.layer-box').hide();
                }
            })
            .fail(function() {
                mui.toast("Network error, please try again!");
                $('.layer-box').hide();
            });
            
        }
    });  
    // 获取地址栏参数
    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
            return null;
    }  
})(mui);