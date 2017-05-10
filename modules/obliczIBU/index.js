/**************************************************
 * Configuring obliczIBU Plugins
 **************************************************/
/**
 * Register Plugins
 */
"use strict";

var wykorzystanieChmielu = null;

exports.register = function(server, options, next) {
	server.route([{
		method: 'GET',
		path: '/obliczIBU',
		handler: function(request, reply) {
			reply.view('obliczanieIBU/obliczIbu', {
				title: 'Kalkulator, przelicznik wskaźnika IBU podczas gotowania',
				barTitle: 'Oblicz IBU !'
			});
		}
	}, {
		method: 'POST',
		path: '/obliczamyIBU',
		handler: function(request, reply) {
			console.log(request.payload.method)
			if(request.payload.method.value == 'Ragera')
				return reply(obliczIbu(request.payload));
			else if(request.payload.method.value == 'Tinsetha')
				return reply(obliczIbu2(request.payload));
		}
	}]);

	next();
};

function obliczIbu(payload) {

	var iloscBrzeczki = payload.ibuController.iloscBrzeczki;
	var gestoscBrzeczki = payload.ibuController.gestoscBrzeczki;
	var gestoscBrzeczkiOG = 260/(260 - gestoscBrzeczki);
	console.log('gestoscBrzeczkiOG = ' + gestoscBrzeczkiOG);
	var ibuResponseObject = {};
	var ibu = null;
	var ibuSingleHop = [];
	var testOG;

	if(gestoscBrzeczkiOG > 1.05) {
		console.log('gestoscBrzeczkiOG wieszka od 1.05');
		testOG = (gestoscBrzeczkiOG - 1.05) / 0.2;
	}
	else testOG = 0;

	console.log('testOG = ' + testOG);

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
		console.log(payload.choices)

		console.log(testOG);
		var drugaSkladnia = iloscBrzeczki * ( 1 + testOG);
		console.log('drugaSkladnia = ' + drugaSkladnia);
		wykorzystanieChmielu = 18.18 + 13.86 * Math.tanh((czasGotowania - 31.32) / 18.27);
		var pierwszaSkladnia = (iloscChmielu * wykorzystanieChmielu * alfakwasy)/10;
		console.log('pierwszaSkladnia = ' + pierwszaSkladnia);
		console.log('wykorzystanieChmielu = ' + wykorzystanieChmielu)
		ibuSingleHop[i] = pierwszaSkladnia / drugaSkladnia;
		ibuSingleHop[i] = ibuSingleHop[i].toFixed(1);

		ibu += pierwszaSkladnia / drugaSkladnia;

		ibuResponseObject = {
		'ibuSingleHop': ibuSingleHop,
		'ibu': ibu.toFixed(2)
		}
	}
	console.log('suma ' + ibu);
	
	return ibuResponseObject;

}

function obliczIbu2(payload) {

	var iloscBrzeczki = payload.ibuController.iloscBrzeczki;
	var gestoscBrzeczki = payload.ibuController.gestoscBrzeczki;
	var gestoscBrzeczkiOG = 260/(260 - gestoscBrzeczki);
	var ibuResponseObject = {};
	var ibu = null;
	var ibuSingleHop = [];

	for (var i = 0; i < payload.choices.length; i++) {
		var object = payload.choices[i];
		var iloscChmielu = null;
		var alfakwasy = null;
		var czasGotowania = null;

		for (var property in object) {
			iloscChmielu = object['iloscChmielu'];
			alfakwasy = object['alfakwasy'];
			czasGotowania = object['czasGotowania'];
		}
		console.log(payload.choices)
		wykorzystanieChmielu = (1.65 * Math.pow(0.000125,gestoscBrzeczkiOG - 1)) * ( (1 - Math.exp(-0.04 * czasGotowania)) /4.15 );
		var pierwszaSkladnia = wykorzystanieChmielu * alfakwasy / 100;
		var drugaSkladnia = iloscChmielu * 1000 / iloscBrzeczki;
		ibuSingleHop[i] = wykorzystanieChmielu * alfakwasy / 100 * iloscChmielu * 1000 / iloscBrzeczki;
		ibuSingleHop[i] = ibuSingleHop[i].toFixed(1);
		ibu += pierwszaSkladnia * drugaSkladnia;
		ibuResponseObject = {
		'ibuSingleHop': ibuSingleHop,
		'ibu': ibu.toFixed(2)
		}
	}
	console.log('suma ' + ibu);
	
	return ibuResponseObject;

}
/**
 * Plugin attributes...
 * we have here the Name and the Version of the plugin
 */
exports.register.attributes = {
	name: 'obliczIBU',
	version: '1.0.0'
};