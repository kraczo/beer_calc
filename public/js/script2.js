$(".header").html("<a href='#menu'></a>Ile cukru aby uzyskać zamierzony stopień nagazowania");
$(document).ready(function(){
      $(".allForm").hide();
      $("#loader").show();

      $(".allForm").load("views/ileDodacCukru/ileDodacCukru.html", function () {
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
                url: '/ileDodacCukru',
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
                console.log('stopienNagazowania= ' + $('input[name="stopienNagazowania"]').val());
                $('#response').empty();
                $( "#response" ).append('-- Należy dodać <b> ' + JSON.stringify(response) + '</b> gramy cukru --');
                }
            });

     });

  });