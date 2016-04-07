var Path = require('path');
var Hapi = require('hapi');
var Inert = require('inert');
var Hoek = require('hoek');
var server = new Hapi.Server();
//"use strict";

server.connection({ port: 3000 });

/**
 * Routing Static Pages [JS, Css, Images, etc]
 */
server.register(require('inert'), function(err) {
    
    if (err) {
        
        throw err;
    }
    
    server.route({
        method : 'GET', path : '/public/{path*}', handler : {
            directory : {
                path : './public',
                listing : false,
                index : false
            }
        }
    });
    
});

/**
 * Register all Modules as Plugins Here
 * 
 */

var plugins = [
    
    { register : require('vision') }, //register Vision with others Plugins
    { register : require('./modules/zacieranie/index.js') } 
];

/**
 * Routing Views
 */ 
server.register(plugins, function (err) {

    if (err) {
        throw err;
    }

    server.views({
        
        engines: { html: require('handlebars') },
        layout : true,
        path: __dirname + '/views',
        layoutPath : Path.join(__dirname, './views/layouts') //setting Global Layout
    });
    
    /**
     * Default route
     */
    server.route({ method: 'GET', path: '/', handler: function(request, reply) {
        
        reply.view('home/home', {title : 'Home'});
        
    } });
});

server.ext('onPostHandler', function (request, reply) {

    const response = request.response;
    if (response.isBoom &&
        response.output.statusCode === 404) {
        console.log(request.url.path);
        return reply.file('404.html').code(404);

    }

    return reply.continue();
});


server.start((err) => {

    if (err) {
        throw err;
    }

    console.log('Server running at:', server.info.uri);
});


