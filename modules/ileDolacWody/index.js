/**************************************************
 * Configuring ileDolacWody Plugins
 **************************************************/
/**
 * Register Plugins
 */
 "use strict";
exports.register = function(server, options, next) {
	server.route([
		
		{
			method : 'GET',
			path : '/ileDolacWody',
			handler : function(request, reply) {
				reply.view('ileDolacWody/ileDolacWody', {
					title:'ile dolac wody aby uzyskac zamierzony stopien gęstości',
					barTitle:'Ilość wody do planowanego BLG'
				});
			}
		},
		{
			method : 'POST',
			path : '/ileDolacWody',
			handler : function(request, reply) {
				let blg1_blg2 = request.payload.stopienGestosci - request.payload.pozadanyStopienGestosci;
        		let wynik = parseFloat(request.payload.iloscBrzeczki * blg1_blg2 / request.payload.pozadanyStopienGestosci);
        		return reply(Math.round(wynik * 100)/100);
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
	
	name : 'ileDolacWody',
	version : '1.0.0'	
};