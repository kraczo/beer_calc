$(document).ready(function(){
	// $(".header").html("<a href='#menu'></a>Kalkulator piwny wita !");
	$.ajax({
      beforeSend:function(){
      	$(".content").hide();
      $("#loader").show();
  },
  success: function(){

        $("#loader").fadeOut('fast', function() {
          $(".content").fadeIn('fast');
        });
  }
});
});