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

//mmenu

//$('#mm-1').addClass('mm-subopened').removeClass('mm-current');
//$('#mm-2').addClass('mm-current').removeClass('mm-opened');


$('#menu a').each(function(){
    var href = $(this).attr('href');

    if ( window.location.href.indexOf(href) > 8 ){
        $(this).parent('li').addClass('mm-selected');
    }
	

});


	
});


