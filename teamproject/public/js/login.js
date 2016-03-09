function isValid(){
	var hide1=document.getElementById('hide1');
	var hide2=document.getElementById('hide2');
	var hide3=document.getElementById('hide3');

	hide1.innerHTML="";
	hide2.innerHTML="";
	hide3.innerHTML="";

	if(document.getElementById('username').value.trim().length<3)
		return hide1.innerHTML="Invalid username";
	
	
	if(document.getElementById('password').value.trim().length<4)
		return hide2.innerHTML="Invalid password";

	hide3.innerHTML="success";
}