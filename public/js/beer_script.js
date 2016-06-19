$(document).ready(function(){
  $('#form1').parsley();
  $('#form1').on('reset',function(e) { $('#response').empty(); });
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