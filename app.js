var Path = require('path');
var Hapi = require('hapi');
var Inert = require('inert');
var Hoek = require('hoek');
var server = new Hapi.Server();
// var Wreck = require('wreck');
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var nodemailer = require('nodemailer');
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
    { register : require('./modules/ileDolacWody/index.js') },
    { register : require('./modules/ileDodacCukru/index.js') },
    { register : require('./modules/kontakt/index.js') },
    { register : require('./modules/zawartoscAlkoholu/index.js')},
    { register : require('./modules/obliczIBU/index.js') }
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

        reply.view('home/home', {title : 'Kalkulator piwny, obliczanie ilości cukru do refermentacji, alkoholu w piwie itp',barTitle:'Kalkulator piwny wita !'});
        
    } });
});



//contact Form
server.route({ method: 'POST', path: '/contactForm', handler: function(request, reply) {

     var transporter = nodemailer.createTransport({
     host: 'mail5.mydevil.net',
     port: 25,
     auth: {
         user: 'info@beer-calc.pl',
         pass: 'Testosteron1'
     }
     });

     if(!request.payload.contactSubject ){
         request.payload.contactSubject = 'Nie podano tamatu z beer-calc'
     }

     var mailOptions = {
     from: '"'+ request.payload.contactName +'" ' + '<'+ request.payload.contactEmail + '>' + '',
     to: 'igoods24@gmail.com', // list of receivers
     subject: 'Temat wiadomośći: '+ request.payload.contactSubject +' ', // Subject line
    // text: 'Temat wiadomośći: ' + request.payload.contactMessage + '', // plaintext body
     html: '<h3>Wiadomość od: </h3> Imie: ' + request.payload.contactName + ', Mail: ' +  request.payload.contactEmail + '<h3>Temat: </h3>' + request.payload.contactSubject + ' <h3>Treść wiadomośći: </h3>' + request.payload.contactMessage + ''
     };

     transporter.sendMail(mailOptions, function (err, info) {
         if(err){
             console.log(err);
             reply('Hej ' + request.payload.contactName + ' niestety nie udalo sie wysłać Twojej wiadomośći ! Napisz na kraczo@gmail.com');


         } else {
             reply('Hej ' + request.payload.contactName + ' dziękuje za wysłanie wiadomośći ! Pozdrawiam');
         }
     })

    
    
    } });
    

// server.ext('onPostHandler', function (request, reply) {

//     const response = request.response;
//     if (response.isBoom &&
//         response.output.statusCode === 404) {
//         console.log(request.url.path);
//         return reply.file('404.html').code(404);

//     }

//     return reply.continue();
// });


server.start((err) => {

    if (err) {
        throw err;
    }

    console.log('Server running at:', server.info.uri);
});


// var Path = require('path');
// var Hapi = require('hapi');
// var Inert = require('inert');
// var Hoek = require('hoek');
// var server = new Hapi.Server();
// //"use strict";

// server.connection({ port: 3000 });

// /**
//  * Routing Static Pages [JS, Css, Images, etc]
//  */
// server.register(require('inert'), function(err) {
    
//     if (err) {
        
//         throw err;
//     }
    
//     server.route({
//         method : 'GET', path : '/public/{path*}', handler : {
//             directory : {
//                 path : './public',
//                 listing : false,
//                 index : false
//             }
//         }
//     });
    
// });

// /**
//  * Register all Modules as Plugins Here
//  * 
//  */

// var plugins = [
    
//     { register : require('vision') }, //register Vision with others Plugins
//     { register : require('./modules/ileDolacWody/index.js') },
//     { register : require('./modules/ileDodacCukru/index.js') },
//     { register : require('./modules/kontakt/index.js') },
//     { register : require('./modules/zawartoscAlkoholu/index.js') }
// ];


// /**
//  * Routing Views
//  */ 
// server.register(plugins, function (err) {

//     if (err) {
//         throw err;
//     }

//     server.views({
        
//         engines: { html: require('handlebars') },
//         layout : true,
//         path: __dirname + '/views',
//         layoutPath : Path.join(__dirname, './views/layouts') //setting Global Layout
//     });
    
//     /**
//      * Default route
//      */
//     person1 = {
//         name: 'Dawid',
//         email:'dawid@kraczowski.com'
//     };
//     person2 = {
//         name: 'Dawid2',
//         email:'dawid2@kraczowski.com'
//     }
//     person3 = {
//         name: 'Dawid3',
//         email:'dawid3@kraczowski.com'
//     }
//     var list = [person1,person2,person3];

//     server.route({ 
//         method: 'GET', 
//         path: '/', 
//         handler: {
//         view: {
//                 template:'home/home', 
//                 context: {
//                     title:'Kalkulator piwny, obliczanie ilości cukru do refermentacji, alkoholu w piwie itp',
//                     barTitle:'Kalkulator piwny wita !',
//                     list
//                 }
//             }

//     } }); 

// // server.ext('onPostHandler', function (request, reply) {

// //     const response = request.response;
// //     if (response.isBoom &&
// //         response.output.statusCode === 404) {
// //         console.log(request.url.path);
// //         return reply.file('404.html').code(404);

// //     }

// //     return reply.continue();
// // });


// server.start((err) => {

//     if (err) {
//         throw err;
//     }

//     console.log('Server running at:', server.info.uri);
// });


// });

// operacje na bazie danych cwiczenia

//lista
// server.route({ method: 'GET', path: '/c', handler: function(request, reply) {
    
//     db.contactlist.find(function(err, docs) {
//         reply(docs);
//     })

//     } });
// server.route({ method: 'POST', path: '/c', handler: function(request, reply) {
//      db.contactlist.insert(request.payload, function(err, doc) {
//         reply(doc);
//      });
    
//     } });
// server.route({ method: 'DELETE', path: '/c/{id}', handler: function(request, reply) {
//      var id = request.params.id;
//      console.log(id);
//      db.contactlist.remove({_id:mongojs.ObjectId(id)}, function (err, doc) {
//         reply(doc);
//      })
    
//     } });
// server.route({ method: 'GET', path: '/c/{id}', handler: function(request, reply) {
//      var id = request.params.id;
//      console.log(id);
//      db.contactlist.findOne({_id:mongojs.ObjectId(id)}, function (err, doc) {
//         reply(doc);
//      })
    
//     } });

// server.route({ method: 'PUT', path: '/c/{id}', handler: function(request, reply) {
//      var id = request.params.id;
//      console.log(id);
//      console.log(request.payload.name);
//      db.contactlist.findAndModify({
//         query:{_id: mongojs.ObjectId(id)},
//         update:{$set: {name:request.payload.name, email:request.payload.email}},
//         new:true }, function (err, doc) {
//             reply(doc);
//         });
//      }});