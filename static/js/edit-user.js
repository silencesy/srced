mui.init();
mui('.mui-scroll-wrapper').scroll();
var serverCategoryPicker2 = new mui.PopPicker({layer: 2});
serverCategoryPicker2.setData(serverCategoryData);
var gradePicker = new mui.PopPicker();
gradePicker.setData([{value: '18',text: '大学四年级'},{value: '17',text: '大学三年级'},{value: '16',text: '大学二年级'},{value: '15',text: '大学一年级'},{value: '14',text: '12年级'},{value: '13',text: '11年级'},{value: '12',text: '10年级'},{value: '11',text: '9年级'},{value: '10',text: '8年级'},{value: '9',text: '7年级'},{value: '8',text: '6年级'},{value: '7',text: '5年级'},{value: '6',text: '4年级'},{value: '5',text: '3年级'},{value: '4',text: '2年级'},{value: '3',text: '1年级'},{value: '2',text: '幼儿园'},{value: '1',text: '托儿所'}]);
var map={0:'一',1:'二',2:'三',3:'四',4:'五',5:'六',6:'七',7:'八',8:'九',9:'十'};
mui.ready(function(){
	if(!mui.os.plus){
		initPage();
	}
	var cityPicker3 = new mui.PopPicker({layer: 3});
	
	cityPicker3.setData(cityData3);
	
	
	document.getElementById("province-city-district").addEventListener('tap', function(event) {
		cityPicker3.show(function(items) {
			if(items[0].value=='110000'||items[0].value=='120000'||items[0].value=='310000'||items[0].value=='500000'){
				document.getElementById("province-city-district-text").value=items[0].text+items[2].text;
			}else{
				document.getElementById("province-city-district-text").value=items[0].text+items[1].text+items[2].text;
			}
			document.getElementById("province").value=items[0].value;
			document.getElementById("city").value=items[1].value;
			document.getElementById("area").value=items[2].value;
			
			console.log( items[0].value+":"+items[1].value+":"+items[2].value+":");
		});
	}, false);
	
});
mui.plusReady(function(){
	initPage()
});
function initPage(){
	app.ajax('/account/home',{uid:app.getUid(),target_id:app.getUid()},function(data,textStatus,xhr){
		if(data.status==1){
			document.getElementById("headimgurl").src=data.data.headimgurl;
			document.getElementById("username").value=data.data.username;
			if(document.getElementById("sexRadio"+data.data.sex)){
				document.getElementById("sexRadio"+data.data.sex).checked=true;
			}
			if(data.data.province=="110000"||data.data.province=="120000"||data.data.province=="310000"||data.data.province=="500000"){
				document.getElementById("province-city-district-text").value=data.data.province_val+data.data.area_val;
			}else{
				document.getElementById("province-city-district-text").value=data.data.province_val+data.data.city_val+data.data.area_val;
			}
			document.getElementById("province").value=data.data.province;
			document.getElementById("city").value=data.data.city;
			document.getElementById("area").value=data.data.area;

			document.getElementById("summary").innerHTML=data.data.summary;
			document.getElementById('mobile').innerText=data.data.mobile;
			document.getElementById('weixin').value=data.data.wx;
			document.getElementById('email').value=data.data.wx;
			if(data.data.is_publish == 1) {
						document.getElementById("message-switch").classList.add('mui-active');
					} else{
						document.getElementById("message-switch").classList.remove('mui-active');

					}
			
			
			document.getElementById("message-switch").addEventListener('toggle', function(event) {
				//				plus.push.setAutoNotification( event.detail.isActive );
				app.setItem('$messageSwitch', event.detail.isActive + '');
				if(app.getItem('$messageSwitch') == 'true') {
					app.ajax('/setting/publish', {
						uid: app.getUid(),
						publish: true
					}, function(data, textStatus, xhr) {
						if(data.status == 1) {} else {
							mui.toast(data.data.msg);
						}
					}, function(xhr, type, errorThrown) {});
				} else if(app.getItem('$messageSwitch') == 'false') {

					app.ajax('/setting/publish', {
						uid: app.getUid(),
						publish:false
					}, function(data, textStatus, xhr) {
						if(data.status == 1) {} else {
							mui.toast(data.data.msg);
						}
					}, function(xhr, type, errorThrown) {});
				}
			});
			
			
			
			
			
		}else{
			mui.toast(data.data.msg);
		}
		
		
	},function(xhr,type,errorThrown){
		
	});
}



// document.querySelector('#file').onchange = function () {
// 	lrz(this.files[0], {width:300}).then(function (results) {
//     	mui.ajax(app.ossBase64Url,{
//     		data:{base64 :results.base64},
// 			dataType:'json',
// 			type:'post',
// 			timeout:10000,
// 			success:function(data){
// 				console.log(JSON.stringify(data))
// 				if(data.status==1){
// 					document.getElementById("headimgurl").src=data.data.oss_img_url;
// 				}
// 			},
// 			error:function(xhr,type,errorThrown){
// 				mui.toast(app.unknownAjaxErrorMessage);
				
// 			}
//     	});
//     });
// };
// document.getElementById("submit").addEventListener('tap',function(){
// 	var slideNumber=mui("#slider").slider().getSlideNumber();
// 	if(slideNumber==0){
// 		submitBasic();
// 	}else{
// 		submitChildren();
// 	}
// });

function submitBasic(){
	var sexRadio = document.getElementsByName('sexRadio');
	var sex="";
	for(i=0; i<sexRadio.length;i++){
     	if(sexRadio[i].checked)  { 
         	sex= sexRadio[i].value; 
     	} 
   	}
	var parameters={
		username:document.getElementById("username").value,
		head:document.getElementById("headimgurl").src,
		province:document.getElementById("province").value,
		city:document.getElementById("city").value,
		area:document.getElementById("area").value,
		sex:sex,
		summary:document.getElementById("summary").value,
		uid:app.getUid(),
		wx:document.getElementById('weixin').value,
		email:document.getElementById('email').value
	}
	app.ajax('/account/update',parameters,function(data,textStatus,xhr){
		if(data.status==1){
			mui.toast('您的信息已更新');
			setTimeout(function(){
					mui.back();
				},2000);
						
			if(mui.os.plus){
				plus.webview.currentWebview().opener().evalJS("initPage();");
				plus.webview.getWebviewById("me/main.html").evalJS('document.getElementById("username").innerText="'+parameters.username+'";document.getElementById("headimgurl").src="'+parameters.head+'";');
				setTimeout(function(){
					mui.back();
				},2000);
			}
		}else{
			mui.toast(data.data.msg);
		}
	},function(xhr,type,errorThrown){});
}


