$(document).ready(function(){

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
                $( "#response" ).append('-- Należy dodać <b> ' + JSON.stringify(response) + '</b> gram cukru --');
                }
            });

     });

  });


// login: pppoe11519.7wx3b3
// hasło: gg1pCk