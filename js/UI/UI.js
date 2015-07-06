(function (mio, document) {
    'use strict';
    //var declaration
    var mio = mio || {},
        firstSearchForm = document.querySelector('.table-filter'),
        secondSearchForm = document.querySelector('.table-filter--editable'),
        hamburger = document.querySelector('.hamburger__icon'),
        loader = document.querySelector('.loading');
    mio.config = {};
    mio.tableInstances = [];
    mio.tableInstances.push(new mio.modules.tableGenerator('.data-tbl'));
    mio.tableInstances.push(new mio.modules.tableGenerator('.editable-table', {editable : true}));

    //function declaration
    function coolHandler(word, where, column) {
        var columnIndex = where.headerInfo[column],
            rows = where.tableRoot.querySelectorAll('.data-tbl__row');
        for (var i = 0; i <where.tableData.length;i++){
          if (where.tableData[i][column].toLowerCase().indexOf(word.toLowerCase()) !== -1) {
              rows[i].style.display = "block";
          }
          else{
            rows[i].style.display = "none";
          }
        }
    }
    
    //we will be receiving an array following split, for ex: full name,
    //should be able to search for full and for name, as opposed to an exact match "full name"..
    function inHeader(stringArray, table) {
      var found = {};
      found.exists = false;
      for(var i = 0; i < stringArray.length; i++){
        for(var key in table.headerInfo){
          var columns = table.dataTable.querySelectorAll('.data-tbl__header li');
          //look inside the table headerinfo keys
          if (key.toLowerCase().indexOf(stringArray[i]) != -1) {
              var foundColumn = table.headerInfo[key];
              //table.headerInfo.lookIn = key;
              columns[foundColumn].classList.add('column-found');
              found.exists = true;
              found.column  = key;
          } else{
            columns[table.headerInfo[key]].classList.remove("column-found");
          }
        }
      }
      return found;
    }
    
    function errorHandler() {
        
    }
    
    function hamburgerClickHandler(ev) {
        var $this = ev.target, itemList = $this.parentElement.getElementsByTagName('ul')[0];
        // || document.querySelector('.nav__hamburger ul');
        if ($this.classList.contains('nav__hamburger--offset')) {
            $this.classList.remove('nav__hamburger--offset');
            itemList.classList.remove('visible-menu');
        } else {
            $this.classList.add('nav__hamburger--offset');
            itemList.classList.add('visible-menu');
        }
    }
    
    function throwError(reason){
      var errorPlaceholder = document.querySelector('.error'),
          errorInnerBody = document.querySelector('.error__body');
      errorPlaceholder.style.display = "block";
      errorInnerBody.textContent = reason;
      setTimeout(function(){
          errorPlaceholder.style.display = "none";
      }, 3500);
    }
    
    function validate(string) {
        // validates the string agains common special characters and also checks if we have multiple spaces and replaces
        //them with one.
        var myString = string.replace(/[&\\#,@+()$~%.!_|'":*?\^<>{}]/g, '').replace(/  +/g, ' ').split(' ');

        //if we have stuff like one letter search
        for(var i  = 0; i < myString.length; i++) {
          myString[i] = myString[i].toLowerCase();
          //trailing spaces and one letters..
          if (myString[i].length < 2 ) {
              myString.splice(i,1);
          }
        }
        if (myString.length === 0) {
          throwError('validation error');
          return false;
        }
        return myString;
    }
    
    function findInHeader (e) {
        var searchWord = validate(e.target.value);
        //inheader will return true but also color the column if found
        if (searchWord) {
            if (inHeader(searchWord, mio.tableInstances[1])) {
              return inHeader(searchWord, mio.tableInstances[1]).column;
                //mio.modules.search.trigger('secondSearchEvent', searchWord, mio.tableInstances[1], 'fullName', this);
            }else{
              throwError('key not found in table header');
            }
        }else{
            throwError('validation error');
        }
        return false;
    }
    function showLoader(){
      loader.style.display = "block";
    }
    function hideLoader() {
        setTimeout(function(){
            loader.style.display = "none";
          }, 500);
    }

    //event listeners
    mio.modules.search.addEvListener('firstSearchEvent', coolHandler);
    mio.modules.search.addEvListener('secondSearchEvent', coolHandler);

    hamburger.addEventListener('click', hamburgerClickHandler);

    firstSearchForm.addEventListener('keyup', function (e) {
      if (e.target.className == 'search-field') {
        var searchWord = e.target.value;
        mio.modules.search.trigger('firstSearchEvent', searchWord, mio.tableInstances[0], 'fullName', this);
      }
    });
    
    secondSearchForm.addEventListener('submit', function (e){
      e.preventDefault();
    });

    //TODO will need to have a clear way of determining which table we are servicing.
    //for now all are hardcoded..
    secondSearchForm.addEventListener('keydown', function (e) {
      if (e.target.className == 'search-field--editable') {
        if (e.keyCode === 186) {
            mio.modules.search.column = findInHeader(e);
        }
        if (e.keyCode === 13) {
          //as it turns out preventDefault here does nothing :|
            if (mio.modules.search.column) {
                var record = e.target.value.substring(e.target.value.indexOf(':'));
                record = validate(record);
                console.log(record);
                if (record) {
                  showLoader();
                  hideLoader();
                  mio.modules.search.trigger('secondSearchEvent', record[0], mio.tableInstances[1], mio.modules.search.column, this);
                }
                else{
                  //we basically have an issue, either can't find the record or the search was done wrong.
                  //should show the error handler and show all table list.
                  throwError('Query incorrect or no records found.');
                  mio.modules.search.trigger('secondSearchEvent', "", mio.tableInstances[1], mio.modules.search.column, this);
                }
            }
            else{
              throwError('An error has occurred, please try again and make sure your query is correct.');
            }
        }
      }
    });
    
    secondSearchForm.addEventListener('keydown', function (e){

    });
    
}(mio, document));