/**************************************************
 * Configuring kontakt Plugins
 **************************************************/
/**
 * Register Plugins
 */
 "use strict";
exports.register = function(server, options, next) {
	server.route([
		{
			method : 'GET',
			path : '/kontakt',
			handler : function(request, reply) {
				reply.view('onas/kontakt/kontakt', {
					title:'Masz pytania, sugestie a moze jakis pomysł ? Napisz do nas !',
					barTitle:'Napisz do nas !'
				});
			}
		}
		,
		{
			method : 'POST',
			path : '/kontakt',
			handler : function(request, reply) {
				console.log(request);
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
	
	name : 'kontakt',
	version : '1.0.0'	
};