$(".header").html("<a href='#menu'></a>ile wody aby uzyskać zamierzone BLG");
$(document).ready(function(){
      $(".allForm").hide();
      $("#loader").show();

      $(".allForm").load("ileDolacWody.html", function () {
        $("#loader").fadeOut('fast', function() {
          $(".allForm").fadeIn('fast');
        });
      });

    $('#form1').parsley();
    $('#form1').on('reset',function(e) { $('#response').empty(); });

    $('#form1').on('submit',function(e) {

    e.preventDefault();
    
            $.ajax({
                type: "POST",
                url: '/ileDolacWody',
                data: $('form').serialize(),
                beforeSend: function() {
                $('#response').hide();
                $('#loader2').show();
                $('#response').val('');
            },
            complete: function(){
                $('#loader2').hide();
                $('#response').show();
            },
            success: function(response) {
                console.log($('input[name="iloscBrzeczki"]').val());
                $('#response').empty();
                $( "#response" ).append('--  Do ' + $('input[name="iloscBrzeczki"]').val() +'L brzeczki należy dolać ' + JSON.stringify(response) + 'L aby uzyskać gęstość '+ $('input[name="pozadanyStopienGestosci"]').val() +' blg  --');
                }
            });

     });

  });