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

			return reply(obliczIbu(request.payload));
		}
	}]);

	next();
};

function obliczIbu(payload) {

	var iloscBrzeczki = payload.ibuController.iloscBrzeczki;
	var ibuResponseObject = {};
	var ibu = null;
	var ibuSingleHop = [];

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
		wykorzystanieChmielu = 18.18 + 13.86 * Math.tanh((czasGotowania - 31.32) / 18.27);
		ibuSingleHop[i] = Math.round((iloscChmielu * wykorzystanieChmielu * alfakwasy / iloscBrzeczki) / 10);

		ibu += (iloscChmielu * wykorzystanieChmielu * alfakwasy / iloscBrzeczki) / 10;

		ibuResponseObject = {
		'ibuSingleHop': ibuSingleHop,
		'ibu': ibu.toFixed(1)
		}
	}
	console.log('suma ' + ibu.toFixed(1));
	
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