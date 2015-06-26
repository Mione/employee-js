(function () {
    'use strict';
        //var declaration
    var $arrowToggle = document.querySelectorAll('.toolbox__arrow'),//supported since ie8 so better than getElementsByClassName
        $editToggle = document.querySelectorAll('.toolbox__pencil'),
        $dataTable = document.querySelector('.data-tbl'),
        $hamburger = document.querySelector('.hamburger__icon'),
        dataSource = getDataSource($dataTable),
        tableData = window.data[dataSource],
        inEditMode = false,
        headerInfo = getTblHeaderInfo();
    generateData(tableData, headerInfo);


    //function declarations
    
    function getDataSource(container){
      var returnSource = container.getAttribute('data-source');
      if (returnSource) {
        return returnSource;
      }
      else{
        return "employees";
      }
    }
    
    function createDomElement(options){
      //vars
      var elementType = options['elementType'],
      elementClassList = options['elementClassList'],
      elementAttribute = options['elementAttribute'],
      elementValue = options['elementValue'],
      parentSelectorName = options['parentSelector'],
      element = document.createElement(elementType),
      parentSelectors;//create the actual element
      if (typeof parentSelectorName == 'string') {
        parentSelectors = document.querySelectorAll(parentSelectorName);
      }
      else{
        parentSelectors = parentSelectorName;

      }
      //add class list if array and single class otherwise, no class of undefined
      if(elementClassList){
        if(elementClassList.constructor === Array){
          for(var index in elementClassList){
            if (!element.classList.contains(elementClassList[index])) {
              element.classList.add(elementClassList[index]);
            }
          }
        }
        else{
          element.classList.add(elementClassList);
        }
      }
      
      //set element attribute
      if (elementAttribute)	{element.setAttribute(elementAttribute.name,elementAttribute.value);}
      
      //set element value
      if (elementValue)	element.innerHTML = elementValue;

      //append element to all parents
      if (parentSelectors) {
        if (parentSelectors.length>0) {
          for(var i = 0;i<parentSelectors.length;i++){
            parentSelectors[i].appendChild(element);
          }
        }
        else{
            parentSelectors.appendChild(element);
        }
      }
      else{
        //in this case no parent given, so it's safe to assume we'll need to return the element..
        return element;
      }
      return false;
    }
    
    function generateData(objectList, headerInfo) {
      var headerCount = Object.keys(headerInfo).length;
      for(var i=0;i<objectList.length;i++)
      {
          var base = createDomElement({elementType: 'div', elementClassList: 'employee-tbl__row'}),
            baseheader = createDomElement({elementType: 'ul', elementClassList: ['tbl-row__header', 'clearfix']}),
            baseContent = createDomElement({elementType: 'ul', elementClassList: ['tbl-row__content', 'closed']});
            for(var key in headerInfo){
             /* var innerValue;
              if (key === 'date') {
                var test = createToolbox();
                innerValue =  objectList[i][key];              debugger;
              }
              else{
                innerValue = objectList[i][key];
              }*/

              var myLi = createDomElement({elementType: 'li',
                               elementAttribute:{	name:'data-editable', value: ''},
                               elementValue : objectList[i][key]
                               });
              if (key === 'date') {
                myLi.classList.add('toolbox');
                createToolbox(myLi);
              }
              baseheader.appendChild(myLi);
            }
            base.appendChild(baseheader);
            $dataTable.appendChild(base);
      }
    }
    
    function getTblHeaderInfo (){
      //we need to link the value and the order with the table header.
      var headerWrapper = document.querySelector('.data-tbl__header ul'), headerInfo = {};
      for (var i = 0;i < headerWrapper.children.length;i++) {
            headerInfo[headerWrapper.children[i].getAttribute('data-description')] = i;
      }
      return headerInfo;
    }
    
    function createToolbox(parent){
       var toolboxControlls = "<span class=\"toolbox__pencil\"></span>"+
                      "<span class=\"toolbox__arrow toolbox__arrow--closed\"></span>",
                      toolbox = createDomElement({elementType: 'div', elementClassList:'toolbox__controlls', elementValue : toolboxControlls, parentSelector: parent});
    }
    
    function arrowClickHandler() {
    }
    
    function pencilClickHandler() {
    }
    
    function hamburgerClickHandler(ev) {
      var itemList = this.parentElement.getElementsByTagName('ul')[0];// || document.querySelector('.nav__hamburger ul');
      if (this.classList.contains('nav__hamburger--offset')) {
        this.classList.remove('nav__hamburger--offset');
        itemList.classList.remove('visible-menu');
      }
      else{
        this.classList.add('nav__hamburger--offset');
        itemList.classList.add('visible-menu');
      }
    }
    
    //events
    $hamburger.addEventListener('click', hamburgerClickHandler);
}());