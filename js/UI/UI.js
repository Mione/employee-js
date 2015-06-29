function myApp (document) {
    'use strict';
    //var declaration
    var $arrowToggle = document.querySelectorAll('.toolbox__arrow'),//supported since ie8 so better than getElementsByClassName
    $toolboxControlls = document.querySelectorAll('.toolbox__controlls');
    this.$dataTable = document.querySelector('.table__content-wrapper');
    this.$hamburger = document.querySelector('.hamburger__icon');
    this.dataSource = this.getDataSource(this.$dataTable);
    this.tableData = window.data[this.dataSource],
    this.inEditMode = false,
    this.headerInfo = this.getTblHeaderInfo();
    this.generateData(this.tableData, this.headerInfo);
//function declarations

//events
    this.$hamburger.addEventListener('click', this.hamburgerClickHandler);
    this.$dataTable.addEventListener('click', this.toolboxClickHandler.bind(this));

}

myApp.prototype.getDataSource = function (container) {
    var returnSource = container.getAttribute('data-source');
    if (returnSource) {
        return returnSource;
    } else {
      return 'employees';
    }
};

myApp.prototype.createDomElement = function (options) {
        //variables
        var elementType = options.elementType,
            elementClassList = options.elementClassList,
            elementAttribute = options.elementAttribute,
            elementValue = options.elementValue,
            parentSelectorName = options.parentSelector,
            element = document.createElement(elementType),
            parentSelectors;
          //create the actual element
        if (typeof parentSelectorName === 'string') {
            parentSelectors = document.querySelectorAll(parentSelectorName);
        } else {
            parentSelectors = parentSelectorName;
        }
          //add class list if array and single class otherwise, no class of undefined
        if (elementClassList) {
            if (elementClassList.constructor === Array) {
                for (var index in elementClassList) {
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
        if (elementValue)
          element.innerHTML = elementValue;
        //append element to all parents
        if (parentSelectors) {
          if (parentSelectors.length > 0) {
            for (var i = 0; i < parentSelectors.length; i++) {
              parentSelectors[i].appendChild(element);
            }
          } else {
            parentSelectors.appendChild(element);
          }
        } else {
          //in this case no parent given, so it's safe to assume we'll need to return the element..
          return element;
        }
        return false;
};

myApp.prototype.generateData = function (objectList, headerInfo) {
      var headerCount = Object.keys(headerInfo).length;
      for (var i = 0; i < objectList.length; i++) {
        console.log('data tbl row is generated');
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

          var myLi = this.createDomElement({
            elementType: 'li',
            elementAttribute: {
              name: 'data-editable',
              value: ''
            },
            elementValue: objectList[i][key]
          });
          /*if (key === 'date') {
            myLi.classList.add('toolbox');
            createToolbox(myLi);
          }*/
          
          baseheader.appendChild(myLi);
        }
        var baseheaderLen  = baseheader.children.length, lastColumn;
        lastColumn = baseheader.children[baseheaderLen - 1];
        lastColumn.classList.add('toolbox');
        this.createToolbox(lastColumn);
        
        //let's build the table row hidden content
        for(var key in objectList[i].details) {
          var myLi = this.createDomElement({
            elementType: 'li',
            elementAttribute: {
              name: 'data-editable',
              value: ''
            },
            elementValue:'<span class = \'key \'>' + key + ':&nbsp;</span>' + '<span class=\'value\'>'+objectList[i].details[key]+'</span>'
          });
          baseContent.appendChild(myLi);
        }
        
        base.appendChild(baseheader);
        base.appendChild(baseContent);
        this.$dataTable.appendChild(base);
      }
};

myApp.prototype.getTblHeaderInfo = function () {
      //we need to link the value and the order with the table header.
      var headerWrapper = document.querySelector('.data-tbl__header ul'), headerInfo = {};
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
      toolbox = this.createDomElement({
          elementType: 'div',
          elementClassList: 'toolbox__controlls',
          elementValue: toolboxControlls,
          parentSelector: parent
        });
};

myApp.prototype.toolboxClickHandler = function (ev, secDiv) {
console.log(ev);
console.log(this);
      if (ev.target.classList.contains('toolbox__arrow')) {
        var parent = this.findParent(ev.target, 'data-tbl__row'),
          rowDetails = parent.children[1];
          this.toggleRowDetails(rowDetails, ev.target);
        event.stopPropagation();
      }
};

myApp.prototype.hamburgerClickHandler = function (ev) {
      var $this = this, itemList = $this.parentElement.getElementsByTagName('ul')[0];
      // || document.querySelector('.nav__hamburger ul');
      if ($this.classList.contains('nav__hamburger--offset')) {
        $this.classList.remove('nav__hamburger--offset');
        itemList.classList.remove('visible-menu');
      } else {
        $this.classList.add('nav__hamburger--offset');
        itemList.classList.add('visible-menu');
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
var app = new myApp(document);
console.log(app)