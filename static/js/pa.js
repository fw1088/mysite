function check_form() {
    $('#password').val(CryptoJS.MD5($('#password').val()).toString());
    var password = $('#password').val();
    var username = $('#username').val();
    post('/login', { password:password,username:username });  
    return true;
}
var idtime=0;
function timeout()
			{
				document.getElementById("backtop").style.right = "-50px"; 
				if(idtime != 0)
				{
					clearTimeout(idtime);
					idtime = 0;
				}
			}
window.onscroll = function(){
	if (document.documentElement.scrollTop + document.body.scrollTop > 100) { 
						
			var str = document.getElementById("navbar-top").className;
			str = str.replace("navbar-top "," navbar-topnext ");
			document.getElementById("navbar-top").className = str;
			document.getElementById("backtop").style.right = "25px";
			str = document.getElementById("backtop").className;
			
			
			if (parseInt(str.indexOf("backhide")) > 0)
			{
				str = str.replace(" backhide "," back ");	
			}
		    else if( parseInt(str.indexOf("back")) == -1)
		    {
				
				str = str + " back ";
				
			}
			console.log(str);
			document.getElementById("backtop").className = str;
			if(idtime != 0)
			{
				clearTimeout(idtime);
				idtime = 0;
			}
			
} 
else { 					
			var str = document.getElementById("navbar-top").className;
			str = str.replace(" navbar-topnext "," navbar-top ");
			document.getElementById("navbar-top").className = str;
			
			str = document.getElementById("backtop").className;
			if (parseInt(str.indexOf("back")) > 0)
			{
				str = str.replace(" back "," backhide ");	
			}
			else if ( parseInt(str.indexOf("backhide")) == -1 )
			{
				str = str+ " backhide ";
			}
			console.log(str);
			document.getElementById("backtop").className = str;
			if(idtime == 0)
			{
					idtime = setTimeout("timeout()","750");
			}
	} 
	
}

function gotoTop()
{
	 $('body,html').animate({scrollTop:0},1000);	
}

$(document).ready(function() {
				var keystr=$("#xcrf").html();
				var str='<div style="width:400px;height:200px;margin:0px;padding:0px;border:none;position: relative;top:0px;text-align: center;"><img src="../static/img/logo.png" style="display:inline-block;margin-right:20px;border:none;vertical-align:baseline;position:relative;top:10px;"></img><div style="display:inline-block;"><form id="login-popup-form"  action="/login" method="post">'+keystr+'<input  style="display:block; margin:0 auto;position: relative;top:15px;border: 1px solid #ebebeb;"  placeholder="用户名/Email" name="name" type="text"><input style="display: block;margin: 0 auto; position: relative;top: 30px;border: 1px solid #ebebeb;"  placeholder="密码" name="password" type="password"><input style="display: block; margin:0 auto;width: 173px;height: 22px;position:relative;top:45px;color:white;background-color: #428bca;border-radius: 4px;border-width: 0px;" type="submit" value="登录"></form></div></div>';
				new jBox('Modal', {
    attach: $('#myModal'),
    title: 'Pa',
    content: str
});
});
