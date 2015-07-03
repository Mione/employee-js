(function (mio, document) {
    'use strict';
    //var declaration
    var mio = mio || {},
        firstSearchField = document.querySelector('.search-field'),
        secondSearchField = document.querySelector('.search-field--editable'),
        hamburger = document.querySelector('.hamburger__icon');

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

    //event listeners
    mio.modules.search.addEvListener('firstSearchEvent', coolHandler);
    mio.modules.search.addEvListener('secondSearchEvent', coolHandler);

    hamburger.addEventListener('click', hamburgerClickHandler);

    firstSearchField.addEventListener('keyup', function (e) {
        var searchWord = e.target.value;
        mio.modules.search.trigger('firstSearchEvent', searchWord, mio.tableInstances[0], 'fullName', this);
    });

    secondSearchField.addEventListener('keyup', function (e) {
        var searchWord = e.target.value;
        mio.modules.search.trigger('secondSearchEvent', searchWord, mio.tableInstances[1], 'fullName', this);
    });
}(mio, document));