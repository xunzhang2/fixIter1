// function init(){
// var button=$('#changestatus');
// var list=$('#statuslist');
// console.log(button.innerHTML);
// button.mouseover(function(){
// 	list.style.display='';
// 	console.log("hover");
// });
// }
// $(document).ready(init());

function showList(){
	list=document.getElementById("statuslist");
	list.style.display='inline';
	console.log("mouseover");
}

function hideList(){
list.style.display='none';
	console.log("mouseout");
}