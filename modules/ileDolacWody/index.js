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
          title:'ile wody dolać do piwa aby uzyskac zamierzony stopien gęstości',
          barTitle:'Ilość wody do planowanego BLG'
        });
      }
    },
    {
      method : 'POST',
      path : '/ileDolacWody',
      handler : function(request, reply) {
        if (request.payload.stopienGestosci > request.payload.pozadanyStopienGestosci) {
          let blg1_blg2 = request.payload.stopienGestosci - request.payload.pozadanyStopienGestosci;
          let wynik = parseFloat(request.payload.iloscBrzeczki * blg1_blg2 / request.payload.pozadanyStopienGestosci);
          return reply(Math.round(wynik * 100) / 100);
        } else {
          let cukier1 = (request.payload.iloscBrzeczki * 2.66 * request.payload.stopienGestosci) / (266 - request.payload.stopienGestosci);
          let cukier2 = (request.payload.iloscBrzeczki * 2.66 * request.payload.pozadanyStopienGestosci) / (266 - request.payload.pozadanyStopienGestosci);
          return reply((Math.round((cukier2 - cukier1) * 100) / 100));
        }
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