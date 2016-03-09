
function sendUsername(){
    username = $('#username').val();
    
  	}

$('#login').on('click', sendUsername);
$('#signUp').on('click', sendUsername);


function signup(){
	// show confirm password
	document.getElementById("hideDiv").style.display="inline";
    // change button to submit
    if(document.getElementById("password2").value.length>=4)
        document.getElementById("signUp").type="submit";
	// 	// write to db

	// 	// jump to public chat

	// }

}

function checkUsername(){
	var hide1=document.getElementById('hide1');
    hide1.innerHTML="";
   
	if(document.getElementById('username').value.trim().length<3){
		hide1.innerHTML="Invalid username: should be at least 3 character long.";
		return false;
	}
	return true;
}

function checkPassword(){
	var hide1=document.getElementById('hide1');
	var login=document.getElementById('login');
	var signUp=document.getElementById('signUp');
	hide1.innerHTML="";
    
	if(document.getElementById('password').value.trim().length<4){
		hide1.innerHTML="Invalid password: should be at least 4 character long.";
		return false;
	}
	if(document.getElementById('username').value.trim().length<3)
		return false;

	login.disabled=""; // enable submit button
	signUp.disabled="";
	return true;
}
