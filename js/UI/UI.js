(function (mio, document) {
    'use strict';
    //var declaration
    var mio = mio || {},
        firstSearchForm = document.querySelector('.table-filter'),
        secondSearchForm = document.querySelector('.table-filter--editable'),
        hamburger = document.querySelector('.hamburger__icon'),
        loader = document.querySelector('.loading'),
        editableInputs,
        deleteBtns,
        addBtn = document.querySelector('.btn--add-record');
    mio.config = {};
    mio.tableInstances = [];
    //mio.tableInstances.push(new mio.modules.tableGenerator('.data-tbl'));
    //re-populate data, this time with localstorage
    mio.modules.persistence.init('.editable-table');
    mio.tableInstances.push(new mio.modules.tableGenerator('.editable-table', {editable : true}));

//console.log(editableInput);
    editableInputs = document.querySelectorAll("[data-editable] > input");
    deleteBtns = document.querySelectorAll('.toolbox__delete');
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

    function createRow(obj, headerInfo, parent){
      var base = document.createElement('div');
      base.className = "data-tbl__row";
      var row = document.createElement('ul');
      row.className = ("tbl-row__header");
      row.classList.add('clearfix');
      var colNr = Object.keys(headerInfo).length;
      for(var key in headerInfo){
        var myLi = document.createElement('li'),
          myInput = document.createElement('input');
        myLi.setAttribute('data-editable','');
        myLi.setAttribute('data-row', mio.tableInstances[0].tableData.length-1);
        myLi.setAttribute('data-column', key);
        myLi.style.width = 100/ colNr +"%";
        myInput.type = "text";
        myInput.placeholder = "Add data";
        myInput.className = "editable-input";
        myLi.appendChild(myInput);
        row.appendChild(myLi);
      }
      base.appendChild(row);
      parent.appendChild(base);
    }

    function inputEdit (e){
        var parentElement = e.target.parentElement,
            rowIndex = parentElement.getAttribute('data-row'),
            rowColumn = parentElement.getAttribute('data-column'),
            value = e.target.value;
            //holly... but in the end it's just : select the data we need based on source key (employees), the row index, and the keyname
        mio.data[mio.modules.persistence.source][rowIndex][rowColumn] = value;
        mio.modules.persistence.update(mio.modules.persistence.source, mio.data[mio.modules.persistence.source]);
    }

    function deleteRow (i){
      return function () {
        //closures, have your cake, and eat it too
        var parentElement = deleteBtns[i].parentElement,
            rowIndex = parentElement.parentElement.getAttribute('data-row');
        mio.data[mio.modules.persistence.source][rowIndex] = "";
        //go to the div .data-tbl__row and remove it using the latest dom specification: remove();
        parentElement.parentElement.parentElement.parentElement.style.display = "none";
        mio.modules.persistence.update(mio.modules.persistence.source, mio.data[mio.modules.persistence.source]);
        console.log(mio.data[mio.modules.persistence.source]);
      };
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
            if (inHeader(searchWord, mio.tableInstances[0])) {
              return inHeader(searchWord, mio.tableInstances[0]).column;
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
          }, 2500);
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
                  mio.modules.search.trigger('secondSearchEvent', record[0], mio.tableInstances[0], mio.modules.search.column, this);
                }
                else{
                  //we basically have an issue, either can't find the record or the search was done wrong.
                  //should show the error handler and show all table list.
                  throwError('Query incorrect or no records found.');
                  mio.modules.search.trigger('secondSearchEvent', "", mio.tableInstances[0], mio.modules.search.column, this);
                }
            }
            else{
              throwError('An error has occurred, please try again and make sure your query is correct.');
            }
        }
      }
    });
    
    addBtn.addEventListener('click', function (){
      var root = document.querySelector('.editable-table .table__content-wrapper');
      var emptyObj = {
        allocationStatus: "Add data",
        dateOfBooking: "10/05/2025",
        details:{"Date of Start": "12/03/2015", "Delivery Unit": "Add data", "Line manager": "Add data", "Project Manager": "Add data"},
        fullName: "Add data",
        grade: "Add data",
        jobTitle: "Add data",
        project: "Add data"
        };
      mio.modules.persistence.add(emptyObj);
      createRow(emptyObj, mio.tableInstances[0].headerInfo, root);
    });
    document.querySelector('body').addEventListener('keyup', function (e) {
      if (e.target.classList.contains('editable-input')) {
        inputEdit(e);
      }
    });
    
    for(var i = 0; i < deleteBtns.length; i++){
        deleteBtns[i].addEventListener('click', deleteRow(i));
    }
}(mio, document));