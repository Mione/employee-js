/* ==========================================================================
    table generator module.
    mio.modules.tableGenerator {object}
   ========================================================================== */
var mio = mio || {};

mio.modules.tableGenerator =
    (function (document) {
        'use strict';

        function init(myTable) {
            var tableRoot = document.querySelector(myTable) || document.querySelector('.data-tbl');
            var dataTable = tableRoot.querySelector('.table__content-wrapper');
            var dataSource = getDataSource(tableRoot);
            var tableData = mio.data[dataSource];
            var headerInfo = getTblHeaderInfo(tableRoot);
            bindEvents(tableData, headerInfo, dataTable, tableRoot);
        }

        function bindEvents (tableData, headerInfo, dataTable, tableRoot){
            generateData(tableData, headerInfo, dataTable);
            resizeColumns(headerInfo, tableRoot);
            dataTable.addEventListener('click', toolboxClickHandler);
        }

        function getDataSource (container) {
            var returnSource = container.getAttribute('data-source');
            if (returnSource) {
                return returnSource;
            }
            return 'employees';
        }

        function resizeColumns (number, tableRoot) {
            var len, columns, i;
            len = Object.keys(number).length;
            columns = tableRoot.querySelectorAll('.tbl-row__header li, .data-tbl__header li');
            for (i = 0; i < columns.length; i = i + 1) {
                columns[i].style.width = 100 / len + "%";
            }
        }

        function createDomElement (options) {
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
                  element.value = options.elementValue;
              } else{
               element.innerHTML = options.elementValue;
              }
            }
            if (parentSelectors) {
                if (parentSelectors.length > 1) {
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
        }

        function createColumn (obj, index, key){
            var elementValue = obj;
            var myInput;

            var myLi = createDomElement({
              elementType: 'li',
              elementAttribute:[{name: 'data-editable', value: ''}, {name: 'data-row', value : index}, {name: 'data-column', value : key}]
            });

            myInput = createDomElement({
              elementType: 'input',
              elementValue: elementValue[key],
              elementClassList: 'editable-input',
              elementAttribute: [{name: 'type', value: 'text'}]
              });

            myLi.appendChild(myInput);
            return myLi;
        }

        function createRow (obj, columnStructure, parent, index){
              var rowBase = createDomElement({elementType: 'div', elementClassList: 'data-tbl__row'});
              var rowVisibleData = createDomElement({elementType: 'ul', elementClassList: ['tbl-row__header','clearfix' ]});

                //rowHiddenData = this.createDomElement({elementType: 'ul', elementClassList: ['tbl-row__content','closed']});
                for(var key in columnStructure){
                  if (columnStructure.hasOwnProperty(key)) {
                      rowVisibleData.appendChild(createColumn(obj, index, key));
                  }
                }

                createToolbox(rowVisibleData.lastChild, index);
                rowBase.appendChild(rowVisibleData);
                parent.appendChild(rowBase);
        }

        function generateData (objectList, headerInfo, tableContent) {
              objectList.filter(function (obj, index){
                  createRow(obj, headerInfo, tableContent, index);
              });
        }

        function getTblHeaderInfo (tableRoot) {
              //we need to link the value and the order with the table header.
              var headerWrapper = tableRoot.querySelector('.data-tbl__header ul'), headerInfo = {};
              for (var i = 0; i < headerWrapper.children.length; i++) {
                headerInfo[headerWrapper.children[i].getAttribute('data-description')] = i;
              }
              return headerInfo;
        }

        function findParent (startElement, targetParentClass) {
              while((startElement = startElement.parentElement) && !startElement.classList.contains(targetParentClass)){}
              return startElement;
        }

        function createToolbox (parent, rowIndex) {
              var toolboxControlls = '<span class = "toolbox__delete" data-row = '+rowIndex+'></span><span class="toolbox__arrow toolbox__arrow--closed"></span>',
                  toolbox;
              toolbox = createDomElement({
                  elementType: 'div',
                  elementClassList: 'toolbox__controlls',
                  elementValue: toolboxControlls,
                  parentSelectorName: parent
                });
              parent.classList.add('toolbox');
        }

        function toolboxClickHandler (ev, secDiv) {
              if (ev.target.classList.contains('toolbox__arrow')) {
                var parent = findParent(ev.target, 'data-tbl__row'),
                  rowDetails = parent.children[1];
                  toggleRowDetails(rowDetails, ev.target);
                ev.stopPropagation();
              }
        }

        function toggleRowDetails (element, clickedArrow) {
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
        }
        return {
          init:init,
          generateData: generateData,
          createRow: createRow,
          getHeaderInfo : getTblHeaderInfo,
          createToolbox : createToolbox,
          findParent : findParent,
          createColumn : createColumn,
          getDataSource : getDataSource
          };

}(window.document));
