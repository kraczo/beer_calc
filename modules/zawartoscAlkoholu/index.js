/**************************************************
 * Configuring zawartoscAlkoholu Plugins
 **************************************************/
/**
 * Register Plugins
 */
 "use strict";
exports.register = function(server, options, next) {
	server.route([
		
		{
			method : 'GET',
			path : '/zawartoscAlkoholu',
			handler : function(request, reply) {
				reply.view('zawartoscAlkoholu/zawartoscAlkoholu', {
					title:'Kalkulator obliczania zawartości alkoholu w gotowym piwie',
					barTitle:'Zawartość alkoholu w piwie'
				});
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
	
	name : 'zawartoscAlkoholu',
	version : '1.0.0'	
};