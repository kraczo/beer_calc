/**************************************************
 * Configuring ileDodacCukru Plugins
 **************************************************/
/**
 * Register Plugins
 */
 "use strict";
exports.register = function(server, options, next) {
	server.route([
		
		{
			method : 'GET',
			path : '/ileDodacCukru',
			handler : { 
				view: {
				template:'ileDodacCukru/ileDodacCukru', 
				context: {
					title:'Ile dodac cukru aby uzyskac zamierzony stopien nagazowania',
					barTitle:'Potrzebna ilość cukru do refermentacji'
				}
			}
			}
		},
		{
			method : 'POST',
			path : '/ileDodacCukru',
			handler : function(request, reply) {
				let stopienNagazowania = request.payload.stopienNagazowania - obliczStopienNagazowania(request.payload.temperaturaBrzeczki);
        		let wynik = request.payload.rodzajCukru * request.payload.iloscBrzeczki * stopienNagazowania;
        		return reply(Math.round(wynik));
			}
		}
	]);
	
	next();
};

/**
 * Plugin attributes...
 * we have here the Name and the Version of the plugin
 */
exports.register.attributes = {
	
	name : 'ileDodacCukru',
	version : '1.0.0'	
};

function obliczStopienNagazowania(temperatura) {
	let tempF = temperatura * 1.8 + 32;

	let stNag = 3.0378 - 5.0062e-2 * tempF + 2.6555e-4 * tempF * tempF;
	return stNag;
}