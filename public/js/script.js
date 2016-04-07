$(".header").html("<a href='#menu'></a>Zacieranie");
$(document).ready(function(){
      $(".form-style-5").hide();
      $("#loader").show();

      $(".form-style-5").load("zacieranie.html", function () {
        $("#loader").fadeOut('slow', function() {
          $(".form-style-5").fadeIn('slow');
        });
      });

    $('#form1').parsley();

    $('#form1').on('submit',function(e) {

    e.preventDefault();

            $.ajax({
                type: "POST",
                url: '/zacieranie',
                data: $('form').serialize(),
                beforeSend: function() {
                $('#response').hide();
                $('#loader').show();
            },
            complete: function(){
                $('#loader').hide();
                $('#response').show();
            },
            success: function(response) {
                console.log(JSON.stringify(response));
                $( "#response" ).append(JSON.stringify(response));
                }
            });

     });

  });