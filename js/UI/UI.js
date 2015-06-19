(function ($) {
    'use strict';
    $(document).ready(function () {
        //var declaration
        var $arrowToggle = $('.toolbox__arrow'),
            $editToggle = $('.toolbox__pencil'),
            inEditMode = false,
            employees = window.data;
        //functions
        //TODO continue with building the data.
        function generateData(list) {
            $.each(list, function (index, item) {
                var base = $('<div>').addClass('employee-tbl__row clearfix'),
                    baseheader = $('<ul>').addClass('tbl-row__header'),
                    baseContent = $('<ul>').addClass('tbl-row__content closed'),
                    $li = $('<li>').attr('data-editable', '').text();
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
        $arrowToggle.on('click', function () {
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
        $editToggle.on('click', function () {
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