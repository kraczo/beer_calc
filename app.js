var Path = require('path');
var Hapi = require('hapi');
var Inert = require('inert');
var Hoek = require('hoek');
var server = new Hapi.Server();
// var Wreck = require('wreck');
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var nodemailer = require('nodemailer');
var fs = require('fs');
//"use strict";

server.connection({
    port: 3000
});


/**
 * Routing Static Pages [JS, Css, Images, etc]
 */
server.register(require('inert'), function(err) {

    if (err) {

        throw err;
    }

    server.route({
        method: 'GET',
        path: '/public/{path*}',
        handler: {
            directory: {
                path: './public',
                listing: false,
                index: false
            }
        }
    });

});

/**
 * Register all Modules as Plugins Here
 * 
 */

var plugins = [

    {
        register: require('vision')
    }, //register Vision with others Plugins
    {
        register: require('./modules/ileDolacWody/index.js')
    }, {
        register: require('./modules/ileDodacCukru/index.js')
    }, {
        register: require('./modules/kontakt/index.js')
    }, {
        register: require('./modules/zawartoscAlkoholu/index.js')
    }, {
        register: require('./modules/obliczIBU/index.js')
    }
];


/**
 * Routing Views
 */
server.register(plugins, function(err) {

    if (err) {
        throw err;
    }

    server.views({

        engines: {
            html: require('handlebars')
        },
        layout: true,
        path: __dirname + '/views',
        layoutPath: Path.join(__dirname, './views/layouts') //setting Global Layout
    });

    /**
     * Default route
     */
    server.route({
        method: 'GET',
        path: '/',
        handler: function(request, reply) {

            reply.view('home/home', {
                title: 'Kalkulator piwny, obliczanie ilości cukru do refermentacji, alkoholu w piwie itp',
                barTitle: 'Kalkulator piwny wita !'
            });

        }
    });
    //kudos
    var countSum = null;
    fs.readFile('./kudosCount.js', (err, data) => {
        if (err) throw err;
        countSum = parseInt(data.toString());
    });
    server.route([{
        method: 'POST',
        path: '/kudos',
        handler: function(request, reply) {
            // console.log(request.payload.countRemove)
            if (request.payload != null && request.payload.count != null) {
                var tempCountSum = parseInt(request.payload.count);
                countSum += tempCountSum
                    // var counter = request.payload.count.parseInt();
                fs.writeFile('kudosCount.js', countSum, (err) => {
                    if (err) throw err;
                    console.log('It\'s saved!');
                });
            } else if (request.payload != null && request.payload.countRemove != null) {
                var tempCountSum = parseInt(request.payload.countRemove);
                countSum -= tempCountSum;
                fs.writeFile('kudosCount.js', countSum, (err) => {
                    if (err) throw err;
                    console.log('It\'s saved!');
                });
            }
            // countSum = countSum + 1;
            // let blg1_blg2 = request.payload.stopienGestosci - request.payload.pozadanyStopienGestosci;
            //          let wynik = parseFloat(request.payload.iloscBrzeczki * blg1_blg2 / request.payload.pozadanyStopienGestosci);
            return reply(countSum);
        }
    }]);

    // end kudos//

});



//contact Form
server.route({
    method: 'POST',
    path: '/contactForm',
    handler: function(request, reply) {

        var transporter = nodemailer.createTransport({
            host: 'mail5.mydevil.net',
            port: 25,
            auth: {
                user: 'info@beer-calc.pl',
                pass: 'Testosteron1'
            }
        });

        if (!request.payload.contactSubject) {
            request.payload.contactSubject = 'Nie podano tamatu z beer-calc'
        }

        var mailOptions = {
            from: '"' + request.payload.contactName + '" ' + '<' + request.payload.contactEmail + '>' + '',
            to: 'igoods24@gmail.com', // list of receivers
            subject: 'Temat wiadomośći: ' + request.payload.contactSubject + ' ', // Subject line
            // text: 'Temat wiadomośći: ' + request.payload.contactMessage + '', // plaintext body
            html: '<h3>Wiadomość od: </h3> Imie: ' + request.payload.contactName + ', Mail: ' + request.payload.contactEmail + '<h3>Temat: </h3>' + request.payload.contactSubject + ' <h3>Treść wiadomośći: </h3>' + request.payload.contactMessage + ''
        };

        transporter.sendMail(mailOptions, function(err, info) {
            if (err) {
                console.log(err);
                reply('Hej ' + request.payload.contactName + ' niestety nie udalo sie wysłać Twojej wiadomośći ! Napisz na kraczo@gmail.com');


            } else {
                reply('Hej ' + request.payload.contactName + ' dziękuje za wysłanie wiadomośći ! Pozdrawiam');
            }
        })



    }
});


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