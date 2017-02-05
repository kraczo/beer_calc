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
					title:'Kalkulator nagazowania piwa podczas refermentacji.',
					barTitle:'Oblicz potrzebną ilość cukru do refermentacji'
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
        		if(request.payload.poczatkoweBlg){
				 return reply('-- Należy dodać <b> ' + Math.round(wynik) + '</b> gram cukru i rozrobić w ' + iloscWodyDlaCukru(request.payload.poczatkoweBlg,wynik) +' ml wody --');
				}
				else
        		return reply('-- Należy dodać <b> ' + Math.round(wynik) + '</b> gram cukru --');
			}
		}
	]);;
	
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

function iloscWodyDlaCukru(gestoscBrzeczki,gramyCukru){
// sprawdzenie
	// let gramyCukru2 = 100;
	// let pojemnoscWodyMl = 990;
	// let wynik22 = gramyCukru*(1/((pojemnoscWodyMl+gramyCukru)/1000)/10);
	// console.log(wynik22);
// koniec sprawdzenia

	let gestoscBrzeczkiPoczatkowej = gestoscBrzeczki/100;
//w jakiej ilosci wody rozrobic cukier
	let iloscWody = gramyCukru/gestoscBrzeczkiPoczatkowej - gramyCukru;
	return Math.round(iloscWody);

}