/* ==========================================================================
   module declaration
   mio.clicker {object} part of namespace mio {object}
   @Description: module to give an example of closures on the implementation
                of a div clicker with no ID's or classes. 
   ========================================================================== */

var mio = mio || {};

mio.modules = mio.modules || {};

mio.modules.clicker =
      (function () {
        'use strict';
        var myDiv = document.querySelectorAll('main div'),
            counter = new Array(5);
        function handler(i) {
            return function () {
                counter[i] = counter[i] + 1;
                myDiv[i].innerHTML = "clicks: " + counter[i];
            };
        }

        function bindEvents() {
          for (var i= 0; i < myDiv.length; i++) {
            counter[i]= 0;
            myDiv[i].innerHTML = "clicks: " + counter[i];
            myDiv[i].addEventListener('click', handler(i));
          }
        }
        
        function publicInit() {
          bindEvents();
        }
        
        return {
          init:publicInit,
          moduleName: 'clicker'
        };
      }());
      
if (mio.isRequired(mio.modules.clicker.moduleName)) {
    mio.modules.clicker.init();
}