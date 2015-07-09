/* ==========================================================================
    table generator module.
    mio.modules.tableGenerator {object}
   ========================================================================== */
var mio = mio || {};

mio.modules.tableGenerator =
    (function (document) {
        'use strict';
        var myApp = function (myTable, options) {
            if (myTable) {
                this.selector = document.querySelector(myTable);
            } else {
                this.selector = document;
            }

            //constructor variables
            this.options = options;
            this.tableRoot = document.querySelector(myTable) || document.querySelector('.data-tbl');
            try {
                this.dataTable = this.selector.querySelector('.table__content-wrapper');
            } catch (e) {
                this.selector = document;
                this.dataTable = this.selector.querySelector('.table__content-wrapper');
            }

            this.dataSource = this.getDataSource(this.tableRoot);
            this.tableData = mio.data[this.dataSource];
            this.headerInfo = this.getTblHeaderInfo();
            this.generateData(this.tableData, this.headerInfo);
            this.resizeColumns(this.headerInfo);
            //events

            this.config = {
                tableRoot : document.querySelector(myTable) || document.querySelector('.data-tbl'),
                options : options,
                dataSource : this.getDataSource(this.tableRoot),
                tableData : mio.data[this.dataSource]
            };

            this.dataTable.addEventListener('click', this.toolboxClickHandler.bind(this));
        };

        myApp.prototype.getDataSource = function (container) {
            var returnSource = container.getAttribute('data-source');
            if (returnSource) {
                return returnSource;
            }
            return 'employees';
        };

        myApp.prototype.resizeColumns = function (number) {
            var len, columns, i;
            len = Object.keys(number).length;
            columns = this.selector.querySelectorAll('.tbl-row__header li, .data-tbl__header li');
            for (i = 0; i < columns.length; i = i + 1) {
                columns[i].style.width = 100 / len + "%";
            }
        };

        myApp.prototype.createDomElement = function (options) {
            var element,
                parentSelectors;
            element = document.createElement(options.elementType);
            //create the actual element
            if (typeof options.parentSelectorName === 'string') {
                parentSelectors = document.querySelectorAll(options.parentSelectorName);
            } else {
                parentSelectors = options.parentSelectorName;
            }
            //add class list if array and single class otherwise, no class of undefined
            if (options.elementClassList) {
                if (options.elementClassList.constructor === Array) {
                    for (var index in options.elementClassList) {
                        if (!element.classList.contains(options.elementClassList[index])) {
                            element.classList.add(options.elementClassList[index]);
                        }
                    }
                } else {
                    element.classList.add(options.elementClassList);
                }
            }
            if (options.elementAttribute) {
              for(var attrIndex in options.elementAttribute){
                  if (options.elementAttribute[attrIndex].hasOwnProperty) {
                        element.setAttribute(options.elementAttribute[attrIndex].name, options.elementAttribute[attrIndex].value);
                  }
              }
            }
            if (options.elementValue){
              if (options.elementType === 'input') {
                  console.log(element);
                  console.log(options.elementValue);
              }
              options.elementType === 'input'? element.value = options.elementValue : element.innerHTML = options.elementValue;

            }
            if (parentSelectors) {
                if (parentSelectors.length > 0) {
                    for (var i = 0; i < parentSelectors.length; i = i + 1) {
                        parentSelectors[i].appendChild(element);
                    }
                } else {
                    parentSelectors.appendChild(element);
                }
            } else {
                //in this case no parent given, so it's safe to assume we'll need to return the element
                return element;
            }
            return false;
        };

        myApp.prototype.createColumn = function (headerInfo, obj, index, key){
            var elementValue = obj,
                myInput;
            var myLi = this.createDomElement({
              elementType: 'li',
              elementAttribute:[{name: 'data-editable', value: ''}, {name: 'data-row', value : index}, {name: 'data-column', value : key}]
            });
            myInput = this.createDomElement({
              elementType: 'input',
              elementValue: elementValue[key],
              elementClassList: 'editable-input',
              elementAttribute: {name: 'type', value: 'text'}
              });

            myLi.appendChild(myInput);
            return myLi;
        };

        myApp.prototype.createRow = function (rowsObject, columnStructure, parent){
              var that = this,
                  lastColumn;
              rowsObject.filter(function (obj, index){
                var rowBase = that.createDomElement({elementType: 'div', elementClassList: 'data-tbl__row'}),
                    rowVisibleData = that.createDomElement({elementType: 'ul', elementClassList: ['tbl-row__header','clearfix' ]});
                    //not doing this one for now.
                    //rowHiddenData = this.createDomElement({elementType: 'ul', elementClassList: ['tbl-row__content','closed']});
                for(var key in columnStructure){
                  if (columnStructure.hasOwnProperty(key)) {
                      rowVisibleData.appendChild(that.createColumn(columnStructure, obj, index, key));
                  }
                }
                lastColumn = rowVisibleData.lastChild;
                lastColumn.classList.add('toolbox');
                that.createToolbox(lastColumn, index);
                rowBase.appendChild(rowVisibleData);
                parent.appendChild(rowBase);
              });
        };

        myApp.prototype.generateData = function (objectList, headerInfo) {
              this.createRow(objectList, headerInfo, this.dataTable);
        };

        myApp.prototype.getTblHeaderInfo = function () {
              //we need to link the value and the order with the table header.
              var headerWrapper = this.selector.querySelector('.data-tbl__header ul'), headerInfo = {};
              for (var i = 0; i < headerWrapper.children.length; i++) {
                headerInfo[headerWrapper.children[i].getAttribute('data-description')] = i;
              }
              return headerInfo;
        };

        myApp.prototype.findParent = function (startElement, targetParentClass) {
              while((startElement = startElement.parentElement) && !startElement.classList.contains(targetParentClass)){}
              return startElement;
        };

        myApp.prototype.createToolbox = function (parent, rowIndex) {
              var toolboxControlls = '<span class = "toolbox__delete" data-row = '+rowIndex+'></span><span class="toolbox__arrow toolbox__arrow--closed"></span>',
                  toolbox;
              toolbox = this.createDomElement({
                  elementType: 'div',
                  elementClassList: 'toolbox__controlls',
                  elementValue: toolboxControlls,
                  parentSelector: parent
                });
        };

        myApp.prototype.toolboxClickHandler = function (ev, secDiv) {
              if (ev.target.classList.contains('toolbox__arrow')) {
                var parent = this.findParent(ev.target, 'data-tbl__row'),
                  rowDetails = parent.children[1];
                  this.toggleRowDetails(rowDetails, ev.target);
                ev.stopPropagation();
              }
        };

        myApp.prototype.toggleRowDetails = function (element, clickedArrow) {
        
              if (clickedArrow.classList.contains('toolbox__arrow--closed')) {
                  clickedArrow.classList.remove('toolbox__arrow--closed');
                  clickedArrow.classList.add('toolbox__arrow--open');
                  element.classList.remove('closed');
                  element.classList.add('open');
              }
              else{
                  clickedArrow.classList.add('toolbox__arrow--closed');
                  clickedArrow.classList.remove('toolbox__arrow--open');
                  element.classList.add('closed');
                  element.classList.remove('open');
              }
        };
                
        return myApp;

}(window.document));
