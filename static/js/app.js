var hexcase=0;function hex_md5(a){return rstr2hex(rstr_md5(str2rstr_utf8(a)))}function hex_hmac_md5(a,b){return rstr2hex(rstr_hmac_md5(str2rstr_utf8(a),str2rstr_utf8(b)))}function md5_vm_test(){return hex_md5("abc").toLowerCase()=="900150983cd24fb0d6963f7d28e17f72"}function rstr_md5(a){return binl2rstr(binl_md5(rstr2binl(a),a.length*8))}function rstr_hmac_md5(c,f){var e=rstr2binl(c);if(e.length>16){e=binl_md5(e,c.length*8)}var a=Array(16),d=Array(16);for(var b=0;b<16;b++){a[b]=e[b]^909522486;d[b]=e[b]^1549556828}var g=binl_md5(a.concat(rstr2binl(f)),512+f.length*8);return binl2rstr(binl_md5(d.concat(g),512+128))}function rstr2hex(c){try{hexcase}catch(g){hexcase=0}var f=hexcase?"0123456789ABCDEF":"0123456789abcdef";var b="";var a;for(var d=0;d<c.length;d++){a=c.charCodeAt(d);b+=f.charAt((a>>>4)&15)+f.charAt(a&15)}return b}function str2rstr_utf8(c){var b="";var d=-1;var a,e;while(++d<c.length){a=c.charCodeAt(d);e=d+1<c.length?c.charCodeAt(d+1):0;if(55296<=a&&a<=56319&&56320<=e&&e<=57343){a=65536+((a&1023)<<10)+(e&1023);d++}if(a<=127){b+=String.fromCharCode(a)}else{if(a<=2047){b+=String.fromCharCode(192|((a>>>6)&31),128|(a&63))}else{if(a<=65535){b+=String.fromCharCode(224|((a>>>12)&15),128|((a>>>6)&63),128|(a&63))}else{if(a<=2097151){b+=String.fromCharCode(240|((a>>>18)&7),128|((a>>>12)&63),128|((a>>>6)&63),128|(a&63))}}}}}return b}function rstr2binl(b){var a=Array(b.length>>2);for(var c=0;c<a.length;c++){a[c]=0}for(var c=0;c<b.length*8;c+=8){a[c>>5]|=(b.charCodeAt(c/8)&255)<<(c%32)}return a}function binl2rstr(b){var a="";for(var c=0;c<b.length*32;c+=8){a+=String.fromCharCode((b[c>>5]>>>(c%32))&255)}return a}function binl_md5(p,k){p[k>>5]|=128<<((k)%32);p[(((k+64)>>>9)<<4)+14]=k;var o=1732584193;var n=-271733879;var m=-1732584194;var l=271733878;for(var g=0;g<p.length;g+=16){var j=o;var h=n;var f=m;var e=l;o=md5_ff(o,n,m,l,p[g+0],7,-680876936);l=md5_ff(l,o,n,m,p[g+1],12,-389564586);m=md5_ff(m,l,o,n,p[g+2],17,606105819);n=md5_ff(n,m,l,o,p[g+3],22,-1044525330);o=md5_ff(o,n,m,l,p[g+4],7,-176418897);l=md5_ff(l,o,n,m,p[g+5],12,1200080426);m=md5_ff(m,l,o,n,p[g+6],17,-1473231341);n=md5_ff(n,m,l,o,p[g+7],22,-45705983);o=md5_ff(o,n,m,l,p[g+8],7,1770035416);l=md5_ff(l,o,n,m,p[g+9],12,-1958414417);m=md5_ff(m,l,o,n,p[g+10],17,-42063);n=md5_ff(n,m,l,o,p[g+11],22,-1990404162);o=md5_ff(o,n,m,l,p[g+12],7,1804603682);l=md5_ff(l,o,n,m,p[g+13],12,-40341101);m=md5_ff(m,l,o,n,p[g+14],17,-1502002290);n=md5_ff(n,m,l,o,p[g+15],22,1236535329);o=md5_gg(o,n,m,l,p[g+1],5,-165796510);l=md5_gg(l,o,n,m,p[g+6],9,-1069501632);m=md5_gg(m,l,o,n,p[g+11],14,643717713);n=md5_gg(n,m,l,o,p[g+0],20,-373897302);o=md5_gg(o,n,m,l,p[g+5],5,-701558691);l=md5_gg(l,o,n,m,p[g+10],9,38016083);m=md5_gg(m,l,o,n,p[g+15],14,-660478335);n=md5_gg(n,m,l,o,p[g+4],20,-405537848);o=md5_gg(o,n,m,l,p[g+9],5,568446438);l=md5_gg(l,o,n,m,p[g+14],9,-1019803690);m=md5_gg(m,l,o,n,p[g+3],14,-187363961);n=md5_gg(n,m,l,o,p[g+8],20,1163531501);o=md5_gg(o,n,m,l,p[g+13],5,-1444681467);l=md5_gg(l,o,n,m,p[g+2],9,-51403784);m=md5_gg(m,l,o,n,p[g+7],14,1735328473);n=md5_gg(n,m,l,o,p[g+12],20,-1926607734);o=md5_hh(o,n,m,l,p[g+5],4,-378558);l=md5_hh(l,o,n,m,p[g+8],11,-2022574463);m=md5_hh(m,l,o,n,p[g+11],16,1839030562);n=md5_hh(n,m,l,o,p[g+14],23,-35309556);o=md5_hh(o,n,m,l,p[g+1],4,-1530992060);l=md5_hh(l,o,n,m,p[g+4],11,1272893353);m=md5_hh(m,l,o,n,p[g+7],16,-155497632);n=md5_hh(n,m,l,o,p[g+10],23,-1094730640);o=md5_hh(o,n,m,l,p[g+13],4,681279174);l=md5_hh(l,o,n,m,p[g+0],11,-358537222);m=md5_hh(m,l,o,n,p[g+3],16,-722521979);n=md5_hh(n,m,l,o,p[g+6],23,76029189);o=md5_hh(o,n,m,l,p[g+9],4,-640364487);l=md5_hh(l,o,n,m,p[g+12],11,-421815835);m=md5_hh(m,l,o,n,p[g+15],16,530742520);n=md5_hh(n,m,l,o,p[g+2],23,-995338651);o=md5_ii(o,n,m,l,p[g+0],6,-198630844);l=md5_ii(l,o,n,m,p[g+7],10,1126891415);m=md5_ii(m,l,o,n,p[g+14],15,-1416354905);n=md5_ii(n,m,l,o,p[g+5],21,-57434055);o=md5_ii(o,n,m,l,p[g+12],6,1700485571);l=md5_ii(l,o,n,m,p[g+3],10,-1894986606);m=md5_ii(m,l,o,n,p[g+10],15,-1051523);n=md5_ii(n,m,l,o,p[g+1],21,-2054922799);o=md5_ii(o,n,m,l,p[g+8],6,1873313359);l=md5_ii(l,o,n,m,p[g+15],10,-30611744);m=md5_ii(m,l,o,n,p[g+6],15,-1560198380);n=md5_ii(n,m,l,o,p[g+13],21,1309151649);o=md5_ii(o,n,m,l,p[g+4],6,-145523070);l=md5_ii(l,o,n,m,p[g+11],10,-1120210379);m=md5_ii(m,l,o,n,p[g+2],15,718787259);n=md5_ii(n,m,l,o,p[g+9],21,-343485551);o=safe_add(o,j);n=safe_add(n,h);m=safe_add(m,f);l=safe_add(l,e)}return Array(o,n,m,l)}function md5_cmn(h,e,d,c,g,f){return safe_add(bit_rol(safe_add(safe_add(e,h),safe_add(c,f)),g),d)}function md5_ff(g,f,k,j,e,i,h){return md5_cmn((f&k)|((~f)&j),g,f,e,i,h)}function md5_gg(g,f,k,j,e,i,h){return md5_cmn((f&j)|(k&(~j)),g,f,e,i,h)}function md5_hh(g,f,k,j,e,i,h){return md5_cmn(f^k^j,g,f,e,i,h)}function md5_ii(g,f,k,j,e,i,h){return md5_cmn(k^(f|(~j)),g,f,e,i,h)}function safe_add(a,d){var c=(a&65535)+(d&65535);var b=(a>>16)+(d>>16)+(c>>16);return(b<<16)|(c&65535)}function bit_rol(a,b){return(a<<b)|(a>>>(32-b))};

(function($, owner) {
//	owner.baseUrl="http://192.168.1.126/megoalshequapi"; 
	
	owner.baseUrl="http://115.29.164.197:81"; 
	owner.ossBase64Url='http://115.29.164.197:83/accept/oss_base64'; 
	owner.baseWebUrl='http://shequ.megoal.org'; 
	owner.channel="1";
	owner.unknownAjaxErrorMessage="网络异常，请稍后再试";
	owner.pageSize=10;
	
	owner.ajax = function(url,parameters,success,error){
		var parameterNames=[];
		for(var key in parameters){
			parameterNames.push(key);
		}
		parameterNames.sort();
		var queryString="";
		for(var i in parameterNames){
			if(parameters[parameterNames[i]].length==0){
				continue;
			}
			if(queryString==""){
				queryString=parameterNames[i]+"="+parameters[parameterNames[i]];
			}else{
				queryString=queryString+"&"+parameterNames[i]+"="+parameters[parameterNames[i]];
			}
			
		}
		if(url.indexOf("oAuth/get_token")!=-1||url.indexOf("oAuth/refresh_token")!=-1){
			queryString=queryString+"@megoal shequ.";
		}else{
			queryString=queryString+this.getToken();
		}
		console.log(this.getToken());
		queryString=queryString+this.getDeviceUUID();
		console.log(queryString)
		parameters['sign']=hex_md5(queryString);
		console.log(this.getDeviceUUID())
		var settings={
			dataType:'json',
			type:'post',
			timeout:10000,
			headers:{'Client-UUid':this.getDeviceUUID()}
		};
		settings.data=parameters;
		settings.success=function(data,textStatus,xhr){
			console.log(JSON.stringify(data));
			if(data.status==1){
				success(data,textStatus,xhr);
			}else{
				if(data.status==-101){
					success(data,textStatus,xhr);
					app.ajax('/oAuth/refresh_token',{'device':app.getChannel()},function(data,textStatus,xhr){
					 	if(data.status==1){
					 		app.setToken(data.data.token);
					 	}
					},function(xhr,type,errorThrown){
					});
				}else if(data.status==-201){
					success(data,textStatus,xhr);
				}else{
					success(data,textStatus,xhr);
				}
			}
		};
		settings.error=function(xhr,type,errorThrown){
			console.log(type)
			mui.toast(app.unknownAjaxErrorMessage);
			error(xhr,type,errorThrown);
		};
		console.log(owner.baseUrl+url);
		console.log(JSON.stringify(parameters));
		$.ajax(owner.baseUrl+url,settings);
	};
	owner.getItem = function(key){
		var token=mui.os.plus?plus.storage.getItem(key):localStorage.getItem(key);
		return token;
	};
	owner.setItem = function(key,value){
		if(mui.os.plus){
			try{
				plus.storage.setItem(key,value);
			}catch(e){
				alert(window.location.search);
			}
			
		}else{
			localStorage.setItem(key,value);
		}
	};
	owner.getChannel = function(){
		return mui.os.ios?'ios':(mui.os.android?'android':(mui.os.wechat?'wechat':'browser'));
	}
	owner.getToken = function(){
		var token=mui.os.plus?plus.storage.getItem("$token"):localStorage.getItem("$token");
		return token;
	};
	owner.setToken = function(token){
		if(mui.os.plus){
			plus.storage.setItem("$token",token);
		}else{
			localStorage.setItem("$token",token);
		}
	};
	owner.getUid = function(){
		return (mui.os.plus?parseInt(plus.storage.getItem("$uid")):parseInt(localStorage.getItem("$uid")))||0;
	};
	owner.setUid = function(uid){
		if(mui.os.plus){
			plus.storage.setItem("$uid",uid);
		}else{
			localStorage.setItem("$uid",uid);
		}
	};
	owner.getDeviceUUID = function(){
		var deviceUUID=mui.os.plus?plus.storage.getItem("$deviceUUID"):localStorage.getItem("$deviceUUID");
		if(deviceUUID){
			return deviceUUID;
		}
		deviceUUID=mui.os.plus?plus.device.uuid:this.uuid();
		if(mui.os.plus){
			plus.storage.setItem("$deviceUUID",deviceUUID);
		}else{
			localStorage.setItem("$deviceUUID",deviceUUID);
		}
		return deviceUUID;
	};

	owner.getState = function() {
		var stateText = (mui.os.plus? plus.storage.getItem('$state'):localStorage.getItem('$state')) || "{}";
		return JSON.parse(stateText);
	};
	owner.setState = function(state) {
		state = state || {};
		if(mui.os.plus){
			plus.storage.setItem('$state', JSON.stringify(state));
		}else{
			localStorage.setItem('$state', JSON.stringify(state));
		}
	};
	owner.setSettings = function(settings) {
		settings = settings || {};
		if(mui.os.plus){
			plus.storage.setItem('$settings', JSON.stringify(settings));
		}else{
			localStorage.setItem('$settings', JSON.stringify(settings));
		}
	};
	owner.getSettings = function() {
		var settingsText = (mui.os.plus? plus.storage.getItem('$settings') :localStorage.getItem('$settings')) || "{}";
		return JSON.parse(settingsText);
	};
	owner.getParameter = function(name){
		return this.getParameters()[name];
		//var uri = window.location.search; 
		//var re = new RegExp("" +name+ "\=([^\&\?]*)", "ig"); 
		//return ((uri.match(re))?decodeURIComponent(uri.match(re)[0].substr(name.length+1)):null); 
	};
	owner.getParameters = function(){
		var uri = window.location.search; 
		var re = /\w*\=([^\&\?]*)/ig; 
		var retval={}; 
		while ((arr = re.exec(uri)) != null) {
			var temp=arr[0].split("=");
			retval[temp[0]]=decodeURIComponent(temp[1]); 
		}
		return retval; 
	};
	owner.toQueryString = function(parameterJson){
		var queryString="";
		for(var key in parameterJson){
			if(queryString==""){
				queryString=key+"="+encodeURIComponent(parameterJson[key]);
			}else{
				queryString=queryString+"&"+key+"="+encodeURIComponent(parameterJson[key]);
			}
		}
		return queryString;
	};
	var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	owner.uuid = function (len, radix) {
	    var chars = CHARS, uuid = [], i;
	    radix = radix || chars.length;
	 
	    if (len) {
	      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
	    } else {
	      var r;
	 
	      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
	      uuid[14] = '4';
	 
	      for (i = 0; i < 36; i++) {
	        if (!uuid[i]) {
	          r = 0 | Math.random()*16;
	          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
	        }
	      }
	    }
	 
	    return uuid.join('');
	  };
	owner.getopenid = function(){
		return (mui.os.plus ? plus.storage.getItem("$openid") : localStorage.getItem("$openid")) ||'';
	};
	owner.setopenid = function(openid){
		if(mui.os.plus){
			plus.storage.setItem("$openid",openid);
		}else{
			localStorage.setItem("$openid",openid);
		}
	};
	
}(mui, window.app = {}));

function gotoLogin(){
	mui.openWindow('../login.html','login.html',{});
}
function gotobind(){
	mui.openWindow('../bind.html','bind.html',{});
}

var shareServices = {};
function shareMessage(href,targetId,type) {
	var shareIds = [{
		id: "weixin",
		ex: "WXSceneSession"
	}, {
		id: "weixin",
		ex: "WXSceneTimeline"
	}],
	shareButtons = [{
		title: "发送给微信好友"
	}, {
		title: "分享到微信朋友圈"
	}];
	plus.nativeUI.actionSheet({
		cancel: "取消",
		buttons: shareButtons
	}, function(e) {
		var i = e.index;
		if (i > 0) {
			var s_id = shareIds[i - 1].id;
			var share = shareServices[s_id];
			if (share) {
				if (share.authenticated) {
					sendShareMessage(share,shareIds[i - 1].ex,href,targetId,type);
				} else {
					share.authorize(function() {
						sendShareMessage(share,shareIds[i - 1].ex,href,targetId,type);
						//sendShareMessage(share, shareIds[i - 1].ex,app.baseWebUrl+'/question/question-details.html?id='+questionId,questionId,'question');
					}, function(e) {
						mui.toast("认证授权失败")
					});
				}
			} else {
				mui.toast("无法获取分享服务");
			}
		}
	});
	
	
}
function sendShareMessage(share,ex,href,targetId,type) {
	var msg = {
		extra: {
			scene: ex
		}
	};
	msg.href=href;
	//msg.href = app.baseWebUrl+'/question/question-details.html?id='+questionId;
	msg.title = "欢迎来到米高留学";
	msg.content = "米高留学致力于打造更专业，更公开、更高效的留学综合平台，为中国留学生及家长提供申请、培训、学习、生活等服务与资讯。";
	msg.thumbs = ["http://liuxia.img-cn-shanghai.aliyuncs.com/icon/default/megoal_icon.png@!w100h100"];
	share.send(msg, function() {
		app.ajax('/share/add',{uid:app.getUid(),target_id:targetId,type:type},function(data,textStatus,xhr){
			if(data.status==1){
				mui.toast('Successfully!');
			}else{
				mui.toast(data.data.msg)
			}
	   },function(xhr,type,errorThrown){});
	}, function(e) {
		//mui.toast(e.message);
	});
}
if(!mui.os.plus){
	document.write("<script src='../js/jweixin-1.0.0.js'></script>");
	var currenturl= window.location.href;
	app.ajax('/oAuth/get_jssdk_ticket',{url:currenturl},function(data,textStatus,xhr)
	{
		wx.config({
	                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	                appId: data.appid, // 必填，公众号的唯一标识
	                timestamp: data.timestamp, // 必填，生成签名的时间戳
	                nonceStr: data.nonsence, // 必填，生成签名的随机串
	                signature: data.signature,// 必填，签名，见附录1
	                jsApiList:
	                        [
	                            "onMenuShareTimeline",
	                            "onMenuShareAppMessage",
	                            "onMenuShareQQ",
	                            "onMenuShareWeibo",
	                            "getNetworkType",
	                            "openLocation",
	                            "getLocation",
	                            "hideOptionMenu",
	                            "showOptionMenu",
	                            "hideMenuItems",
	                            "showMenuItems",
	                            "hideAllNonBaseMenuItem",
	                            "showAllNonBaseMenuItem",
	                            "closeWindow",
	                            "scanQRCode",
	                            "chooseWXPay",
	                            "openProductSpecificView",
	                        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	            });
	
	            wx.ready(function()
	            {
	                wx.ready(function()
	                {
	                    var url = data.share_url; //"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx313e07827df30003&redirect_uri=http://jingzhi.12star.net/oauth&response_type=code&scope=snsapi_userinfo&state=GZH#wechat_redirect";
	                    var imgurl = "http://liuxia.img-cn-shanghai.aliyuncs.com/icon/default/megoal_icon.png@!w300h300";
	                    var title = "欢迎来到米高留学";
	                    var desc = "米高留学致力于打造更专业，更公开、更高效的留学综合平台，为中国留学生及家长提供申请、培训、学习、生活等服务与资讯。";
	                    wx.onMenuShareTimeline({
	                        title:title,
	                        desc: desc,
	                        link: url,
	                        imgUrl: imgurl,
	                        success: function () {
	                            //alert("已分享");
	                    app.ajax('/share/add',{uid:app.getUid(),target_id:app.getParameter('id'),type:app.getParameter('type')},function(data,textStatus,xhr){
	     					if(data.status==1){
	     						alert(data.data.insert_id);
	     					}else{
	     						mui.toast(data.data.msg)
	     					}
	 				    },function(xhr,type,errorThrown){
	   				  });       
	                            
	                        },
	                        cancel: function () {
	                            //alert("已取消");
	                        }
	                    });
	
	                    wx.onMenuShareAppMessage({
	                        title:title,
	                        desc: desc,
	                        link: url,
	                        imgUrl: imgurl,
	                        trigger:function(res){
	                            //alert("点击发送给朋友");
	                        },
	                        success:function(res){
	                            //alert("已分享");
	                   app.ajax('/share/add',{uid:app.getUid(),target_id:app.getParameter('id'),type:app.getParameter('type')},function(data,textStatus,xhr){
	     					if(data.status==1){
	     						alert(data.data.insert_id);
	     					}else{
	     						mui.toast(data.data.msg)
	     					}
	 				    },function(xhr,type,errorThrown){
	   				  });                               
	                        },
	                        cancel:function(res){
	                            //alert("已取消");
	                        },
	                        fail:function(res){
	                            //alert(JSON.stringify(res));
	                        }
	                    });
	                });
	            });
	},function(xhr,type,errorThrown){});
	
	var openid = GetQueryString("openid");
	var state = GetQueryString("state");
	// alert(openid);
	// alert(state);
	if (openid) {
		 app.setopenid(openid);
		 signinTP(app.getopenid(),'weixin');
	}
	        
	function signinTP(openid,platform){
		//通过openid	获取uid
	 	app.ajax('/account/signinTP',{openid:openid,platform:platform},function(data,textStatus,xhr){
		if(data.status==1){
	 		app.setUid(data.data.uid+"");
		}else{
			mui.toast(data.data.msg);
		}
		},function(xhr,type,errorThrown){});
	}
	
	
	function GetQueryString(name)
	{
	     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     var r = window.location.search.substr(1).match(reg);
	     if(r!=null)return  unescape(r[2]); return null;
	}
}




//获取openid 
// var herf_str = window.location.href;
//         var split_str = herf_str.split('?openid=');
//         var openid = "";
//         if(split_str.length > 1)
//         {
//             openid = split_str[1];
//             app.setopenid(openid);

//             signinTP(app.getopenid(),'weixin');
//         }




