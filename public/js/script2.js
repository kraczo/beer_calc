// ile dodac cukru i w jakiej ilosci wody rozrobic
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
                $('#response').empty();
                $("#response").append(response);
                }
            });

     });

  });


// login: pppoe11519.7wx3b3
// hasło: gg1pCk