var mio = mio || {};

mio.modules.search  = (function () {
    'use strict';

    var handlers = {},
        searchWhere,
        searchWhat;

    var listen = function (name, callback) {
        if (!(name in handlers)) {
          handlers[name] = [];
        }
        handlers[name].push(callback);
    };

    var fire = function (name, searchValue, searchWhere, column, context){
        for (var i = 0; i < handlers[name].length; i++) {
            handlers[name][i].call(context, searchValue, searchWhere, column);
        }
    };
    
    return{
      addEvListener : listen,
      trigger : fire
    };
}());
