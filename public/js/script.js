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
                if($('input[name="stopienGestosci"]').val() > $('input[name="pozadanyStopienGestosci"]').val())
                $( "#response" ).append('--  Do ' + $('input[name="iloscBrzeczki"]').val() +'L brzeczki należy dolać <span style="font-size:20px;">' + JSON.stringify(response) + ' L wody </span> aby uzyskać gęstość '+ $('input[name="pozadanyStopienGestosci"]').val() +' blg  --');
                else if ($('input[name="stopienGestosci"]').val() < $('input[name="pozadanyStopienGestosci"]').val())
                $( "#response" ).append('--  Do ' + $('input[name="iloscBrzeczki"]').val() +'L </span>brzeczki należy dodać <span style="font-size:20px;">' + JSON.stringify(response) + ' KG cukru </span> aby uzyskać gęstość '+ $('input[name="pozadanyStopienGestosci"]').val() +' blg  --');
                else $( "#response" ).append('Stopień gęstośći brzeczki nie może być taki sam jak stopień pożądanej gęstości');;
                }
            });

     });

  });