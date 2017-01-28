/**************************************************
 * Configuring obliczIBU Plugins
 **************************************************/
/**
 * Register Plugins
 */
 "use strict";

var wykorzystanieChmielu = null;

exports.register = function(server, options, next) {
	server.route([
		{
			method : 'GET',
			path : '/obliczIBU',
			handler : function(request, reply) {
				reply.view('obliczanieIBU/obliczIbu', {
					title:'Przelicznik wskaznika IBU podczas gotowania',
					barTitle:'Oblicz IBU !'
				});
			}
		}
		,
		{
			method : 'POST',
			path : '/obliczamyIBU',
			handler : function(request, reply) {
				obliczIbu(request.payload);
				// console.log(request.payload);
				// let blg1_blg2 = request.payload.stopienGestosci - request.payload.pozadanyStopienGestosci;
    //     		let wynik = parseFloat(request.payload.iloscBrzeczki * blg1_blg2 / request.payload.pozadanyStopienGestosci);
        		return reply('Szacowana wartość IBU to <b>' + obliczIbu(request.payload) + '</b>' );
			}
		}
	]);
	
	next();
};

	function obliczIbu(payload) {
		// payload = JSON.parse(payload);
		var iloscBrzeczki = payload.ibuController.iloscBrzeczki;
		// wykorzystanieChmielu = 18.18 + 13.86 * Math.tanh(( payload.ibuController.czasGotowania - 31.32 )/ 18.27 );
		// console.log(wykorzystanieChmielu.toFixed(1));
		// console.log(payload.choices);
		var ibu = null;
		for (var i = 0; i < payload.choices.length; i++) {
			    var object = payload.choices[i];
			    var iloscChmielu = null;
			    var alfakwasy = null;
			    var czasGotowania = null;
			    for (var property in object) {
			        // console.log('item ' + i + ': ' + property + '=' + object[property]);

			        iloscChmielu = object['iloscChmielu']; 
			        alfakwasy = object['alfakwasy'];
			        czasGotowania = object['czasGotowania'];
		    }
		    wykorzystanieChmielu = 18.18 + 13.86 * Math.tanh(( czasGotowania - 31.32 )/ 18.27 );
		    ibu += (iloscChmielu * wykorzystanieChmielu * alfakwasy / iloscBrzeczki)/10;
    // If property names are known beforehand, you can also just do e.g.
    // alert(object.id + ',' + object.Title);
		}
		console.log(ibu.toFixed(1))
		return ibu.toFixed(1);

		// let ibu = (payload.choices[0].iloscChmielu * wykorzystanieChmielu * payload.choices[0].alfakwasy / payload.choices[0].iloscBrzeczki)/10;
		//console.log(Math.round(ibu/10,4));
		// console.log(ibu.toFixed(1))
	}
/**
 * Plugin attributes...
 * we have here the Name and the Version of the plugin
 */
exports.register.attributes = {
	name : 'obliczIBU',
	version : '1.0.0'	
};