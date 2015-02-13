$(document).ready(function(){

	$("footer button").click(function(){
		$("#shadow, #form-box").fadeIn(800);
	});

	$("#form-box img, #shadow").click(function(){
		$("#shadow, #form-box").fadeOut(800);
		$("#curtain-invite").css('right', '-465px');
	});

	$("#curtain-invite").click(function(){
		$("#shadow").fadeIn(800);
		$(this).css('right', 0);
	});

	$(".scroll").click(function(event){
		event.preventDefault();
        //$('.colapse.in').fadeOut(400);
		$('html,body').animate({scrollTop:$(this.hash).offset().top-100}, 1000);
	});

});