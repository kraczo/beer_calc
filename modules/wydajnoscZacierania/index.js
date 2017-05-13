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
      path : '/wydajnoscZacierania',
      handler : function(request, reply) {
        reply.view('wydajnoscZacierania/wydajnoscZacierania', {
          title:'Obliczanie wydajnosci zasypy, zacierania, filtracji.',
          barTitle:'Wydajnosc zacierania'
        });
      }
    },
    {
      method : 'POST',
      path : '/wydajnoscZacierania',
      handler : function(request, reply) {
          let res = request.payload;
          let ciezarWlasciwy = 260/(260 - res.gestoscBrzeczki);
          let wydajnoscZacierania = (ciezarWlasciwy * res.iloscBrzeczki * res.gestoscBrzeczki)/res.zasyp;
          var result = {
            ciezarWlasciwy: ciezarWlasciwy.toFixed(2),
            wydajnoscZacierania: wydajnoscZacierania.toFixed(1)
          }
        //   let cukier1 = (request.payload.iloscBrzeczki * 2.66 * request.payload.stopienGestosci) / (266 - request.payload.stopienGestosci);
        //   let cukier2 = (request.payload.iloscBrzeczki * 2.66 * request.payload.pozadanyStopienGestosci) / (266 - request.payload.pozadanyStopienGestosci);
          // return reply((Math.round((cukier2 - cukier1) * 100) / 100));
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
  
  name : 'wydajnoscZacierania',
  version : '1.0.0'  
};