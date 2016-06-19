$(document).ready(function(){
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
                $('#response').empty();
                $( "#response" ).append('--  Do ' + $('input[name="iloscBrzeczki"]').val() +'L brzeczki należy dolać ' + JSON.stringify(response) + 'L aby uzyskać gęstość '+ $('input[name="pozadanyStopienGestosci"]').val() +' blg  --');
                }
            });

     });

  });