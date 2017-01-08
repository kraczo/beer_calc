/**************************************************
 * Configuring obliczIBU Plugins
 **************************************************/
/**
 * Register Plugins
 */
 "use strict";
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
				var wykorzystanieChmielu = null;
				function obliczUtl() {
					wykorzystanieChmielu = 18.18 + 13.86 * Math.tanh(( request.payload.czasGotowania - 31.32 )/ 18.27 );
					console.log(wykorzystanieChmielu);
				}
				function obliczIbu() {
					let ibu = request.payload.iloscChmielu * wykorzystanieChmielu * request.payload.alfakwasy * 1000 / request.payload.iloscBrzeczki;
					console.log(ibu);
				}
				obliczUtl();
				obliczIbu();
				console.log(request.payload);
				// let blg1_blg2 = request.payload.stopienGestosci - request.payload.pozadanyStopienGestosci;
    //     		let wynik = parseFloat(request.payload.iloscBrzeczki * blg1_blg2 / request.payload.pozadanyStopienGestosci);
        		return reply('wyslano');
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
	name : 'obliczIBU',
	version : '1.0.0'	
};