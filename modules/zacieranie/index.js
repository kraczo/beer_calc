/**************************************************
 * Configuring Zacieranie Plugins
 **************************************************/
/**
 * Register Plugins
 */
exports.register = function(server, options, next) {
	server.route([
		
		{
			method : 'GET',
			path : '/zacieranie',
			handler : function(request, reply) {
				reply.view('zacieranie/zacieranie', {title:'Zacieranie'});
			}
		},
		{
			method : 'POST',
			path : '/zacieranie',
			handler : function(request, reply) {
				var suma = request.payload.number_1 * request.payload.number_1;
        		// console.log(request.payload);
        		// console.log(suma);
        		return reply(suma);
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
	
	name : 'Zacieranie',
	version : '1.0.0'	
};