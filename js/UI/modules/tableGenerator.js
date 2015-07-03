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

        myApp.prototype.init = function () {
          
        }

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

            //variables
            var elementType, elementClassList, elementAttribute, elementValue, parentSelectorName, element, parentSelectors;
            elementType = options.elementType;
            elementClassList = options.elementClassList;
            elementAttribute = options.elementAttribute;
            elementValue = options.elementValue;
            parentSelectorName = options.parentSelector;
            element = document.createElement(elementType);

            //create the actual element
            if (typeof parentSelectorName === 'string') {
                parentSelectors = document.querySelectorAll(parentSelectorName);
            } else {
                parentSelectors = parentSelectorName;
            }
            //add class list if array and single class otherwise, no class of undefined
            if (elementClassList) {
                if (elementClassList.constructor === Array) {
                    var index;
                    for (index in elementClassList) {
                        if (!element.classList.contains(elementClassList[index])) {
                            element.classList.add(elementClassList[index]);
                        }
                    }
                } else {
                    element.classList.add(elementClassList);
                }
            }

            //set element attribute
            if (elementAttribute) {
                element.setAttribute(elementAttribute.name, elementAttribute.value);
            }

            //set element value
            if (elementValue) {
                element.innerHTML = elementValue;
            }

            //append element to all parents
            if (parentSelectors) {
                if (parentSelectors.length > 0) {
                    var i;
                    for (i = 0; i < parentSelectors.length; i = i + 1) {
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

        myApp.prototype.generateData = function (objectList, headerInfo) {
            var baseheaderLen, lastColumn;
            for (var i = 0; i < objectList.length; i++) {
              var base = this.createDomElement({
                  elementType: 'div',
                  elementClassList: 'data-tbl__row'
                }), baseheader = this.createDomElement({
                  elementType: 'ul',
                  elementClassList: [
                    'tbl-row__header',
                    'clearfix'
                  ]
                }), baseContent = this.createDomElement({
                  elementType: 'ul',
                  elementClassList: [
                    'tbl-row__content',
                    'closed'
                  ]
                });

              //let's build the table row header
              for (var key in headerInfo) {
                  if (key) {
                      var elementValue = objectList[i][key],
                          myInput;                
                      var myLi = this.createDomElement({
                        elementType: 'li',
                        elementAttribute: {
                          name: 'data-editable',
                          value: ''
                        },
                        elementValue: elementValue
                      });
                      
                      if (this.options) {
                          if (this.options.editable === true) {
                            myInput = this.createDomElement({
                              elementType: 'input',
                              elementValue: elementValue
                            });
                            myInput.type = "text";
                            myInput.value = elementValue;
                            myLi.childNodes[0].textContent = "";
                            myLi.appendChild(myInput);
                          }
                      }
                      baseheader.appendChild(myLi);
                }
              }
              baseheaderLen  = baseheader.children.length;
              lastColumn = baseheader.children[baseheaderLen - 1];
              lastColumn.classList.add('toolbox');
              this.createToolbox(lastColumn);

              //let's build the table row hidden content
              for(var key in objectList[i].details) {
                  if (key) {
                      var myHiddenLi = this.createDomElement({
                        elementType: 'li',
                        elementAttribute: {
                          name: 'data-editable',
                          value: ''
                        },
                        elementValue:'<span class = \'key \'>' + key + ':&nbsp;</span>' + '<span class=\'value\'>'+objectList[i].details[key]+'</span>'
                      });
                      baseContent.appendChild(myHiddenLi);
                  }
              }
              
              base.appendChild(baseheader);
              base.appendChild(baseContent);
              this.dataTable.appendChild(base);
            }
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

        myApp.prototype.createToolbox = function (parent) {
              var toolboxControlls = '<span class="toolbox__pencil"></span>' + '<span class="toolbox__arrow toolbox__arrow--closed"></span>',
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
