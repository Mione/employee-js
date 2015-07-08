var mio = mio || {};

mio.modules.persistence = (function (document, localStorage, console) {
    'use strict';

/* ==========================================================================
   Private functions, mostly utility.
   ========================================================================== */
    //get the data from
    //the existing js object mio.data and place it in localstorage
    function dataFromJs(key, obj) {
        localStorage.setItem(key, JSON.stringify(obj));
    }
/* ==========================================================================
   Public functions
   ========================================================================== */
    function init(tableContainer) {
        //get data either from html or default to employees
        //wrong way to do it, no dom interaction should be here, will need to refactor
        var dataSource = document.querySelector(tableContainer).getAttribute('data-source') || 'employees',
            lsData = localStorage.getItem(dataSource),
            temp,
            parsedData = [];
        this.source = dataSource;
        if (lsData) {
            //the data is there, so we just need to parse it and populate the data module.
            temp = JSON.parse(lsData);
            for(var i=0; i < temp.length; i++){
              if (temp[i] != '') {
                parsedData.push(temp[i]);
              }
            }
            console.log(parsedData)
            mio.data[dataSource] = parsedData;
        } else {
            dataFromJs(dataSource, mio.data[dataSource]);
        }
    }

    function add(obj) {
      mio.data[this.source].push(obj);
      console.log(mio.data[this.source])
      dataFromJs(this.source, mio.data[this.source]);
    }

    function remove(obj) {
      
    }

    function update (source, obj) {
        dataFromJs(source, obj);
    }

    return {
        init : init,
        add : add,
        remove : remove,
        update : update
    };
}(window.document, window.localStorage, window.console));


