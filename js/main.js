/* ==========================================================================
   namespace declaration
   @uiSchool - to hold all other modules as required.
   ========================================================================== */
var mio = mio || {};

mio.modules = {};

mio.requiredModules = ['tableGenerator', 'clicker'];

mio.isRequired = function (moduleName) {
    for (var i = 0; i< mio.requiredModules.length; i++) {
      if (moduleName === mio.requiredModules[i]) {
        return true;
      }
    }
};
