(function ($) {
    'use strict';
    $(document).ready(function () {
      
        //var declaration
        var $arrowToggle = $('.toolbox__arrow'),
            $editToggle = $('.toolbox__pencil'),
            inEditMode = false,
            $toolboxControlls = $(".employee-tbl"),
            employees = window.data.employees;
            generateData(employees);
        //functions
        //TODO continue with building the data.
        function createLi(innerText, attr, attrVal, parent) {
            var createdLi = $('<li>');
            createdLi.attr("data-editable",attrVal);
            createdLi.text(innerText);
            createdLi.appendTo(parent);
        }
        
        function generateData(list) {
            var parentContainer = $(".employee-tbl");
            $.each(list, function (key, value) {
                var base = $('<div>').addClass('employee-tbl__row'),
                    baseheader = $('<ul>').addClass('tbl-row__header'),
                    baseContent = $('<ul>').addClass('tbl-row__content closed'),
                    toolbox = "<li class=\"toolbox\">"+
                    "<div data-editable = \"date\" class=\"toolbox__date\">" + value["Date of booking"] + "</div>"+
                    "<div class=\"toolbox__controlls\">"+
                      "<span class=\"toolbox__pencil\"></span>"+
                      "<span class=\"toolbox__arrow toolbox__arrow--closed\"></span>"+
                    "</div>"+
                  "</li>";
                
                createLi(value["Full Name"], "data-editable", "", baseheader);
                createLi(value["Job Title"], "data-editable", "", baseheader);
                createLi(value["Grade"], "data-editable", "", baseheader);
                createLi(value["Allocation status"], "data-editable", "", baseheader);
                createLi(value["Project"], "data-editable", "", baseheader);
                $(toolbox).appendTo(baseheader);
                
                createLi(value["Full Name"], "data-editable", "", baseContent);
                createLi(value["Job Title"], "data-editable", "", baseContent);
                createLi(value["Full Name"], "data-editable", "", baseContent);
                createLi(value["Job Title"], "data-editable", "", baseContent);
                baseheader.appendTo(base);
                baseContent.appendTo(base);
                base.appendTo(parentContainer);
            });
        }
        
        function isDate($obj) {
            if ($obj.data('editable') === 'date') {
                return 'date';
            } else {
                return 'text';
            }
        }
        //events
        $toolboxControlls.on('click', '.toolbox__arrow', function () {
            var $this = $(this),
                $details = $this.closest('.tbl-row__header').siblings('.tbl-row__content');
            if ($this.hasClass('toolbox__arrow--closed')) {
                $this.removeClass('toolbox__arrow--closed');
                $this.addClass('toolbox__arrow--open');
                $details.show('fast');
                $details.removeClass('closed');
                $details.addClass('open');
            } else {
                $this.removeClass('toolbox__arrow--open');
                $this.addClass('toolbox__arrow--closed');
                $details.hide('fast');
                $details.removeClass('open');
                $details.addClass('closed');
            }
        });
        $toolboxControlls.on('click', '.toolbox__pencil', function () {
            var $this = $(this),
                $details = $this.closest('.employee-tbl__row').find('[data-editable]');
            if (inEditMode === false) {
                $.each($details, function (index, item) {

                    var text = $(item).text(),
                        type = isDate($(item));
                    //debugger;
                    var $input = $('<input>').attr({
                            type : type,
                            value : text,
                            name : 'editableInput'
                        });
                    $($details[index]).html($input);
                });
                inEditMode = true;
            } else {
                $.each($details, function (index, item) {
                    var value = $(item).find('input').val();
                    $(item).find('input').replaceWith(value);

                });
                inEditMode = false;
            }
        });
    });
}(window.jQuery));