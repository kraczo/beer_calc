/**************************************************
 * Configuring wydajnoscZacierania Plugins
 **************************************************/
/**
 * Register Plugins
 */
 "use strict";
exports.register = function(server, options, next) {
  server.route([
    
    {
      method : 'GET',
      path : '/korektaReflektometr',
      handler : function(request, reply) {
        reply.view('korektaReflektometr/korektaReflektometr', {
          title:'Obliczanie korekty zmierzonej reflektometrem brzeczki.',
          barTitle:'Korekta reflektometr'
        });
      }
    },
    {
      method : 'POST',
      path : '/korektaReflektometr',
      handler : function(request, reply) {
          let res = request.payload;
          let fg = 1.001843 - (0.002318474*res.poczatkowaGestosc) - (0.000007775*res.poczatkowaGestosc*res.poczatkowaGestosc) - (0.000000034*res.poczatkowaGestosc*res.poczatkowaGestosc*res.poczatkowaGestosc) + (0.00574*res.koncowaGestosc) + (0.00003344*res.koncowaGestosc*res.koncowaGestosc) + (0.000000086*res.koncowaGestosc*res.koncowaGestosc*res.koncowaGestosc);
          let sg = 1.0480;
          let blg = -205.347*(Math.pow(fg,2))+668.72*fg-463.37;
          let ri = 1.33302+(0.001427193*res.poczatkowaGestosc)+(0.000005791157*res.poczatkowaGestosc*res.poczatkowaGestosc);
          let wynikRzeczywisty = 194.5935+(129.8*sg)+(410.8815*ri*ri-ri*790.8732);
          // console.log(fg);
          // console.log(blg);
          // console.log(ri)
          // console.log(wynikRzeczywisty);
          var result = {
            // fg: fg.toFixed(2),
            blg: blg.toFixed(2)
          }
          return reply(result);
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
  
  name : 'korektaReflektometr',
  version : '1.0.0'  
};