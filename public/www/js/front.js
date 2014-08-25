$(document).ready(function(){

	$("footer button").click(function(){
		$("#shadow, #form-box").fadeIn(800);
	});

	$("#form-box img, #shadow").click(function(){
		$("#shadow, #form-box").fadeOut(800);
	});

});