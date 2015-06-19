(function ($) {
    'use strict';
    $(document).ready(function () {
    //var declaration
        var $arrowToggle = $('.toolbox__arrow'),
            $editToggle = $('.toolbox__pencil'),
            inEditMode = false;
        //functions
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
                $details = $this.closest('.tbl-row__header').siblings('.tbl-row__content').find('.row-content__details');
            if (inEditMode === false) {
                var $listItems = $.makeArray($details.children()),
                    $base = $('<ul>');
                $base.addClass('row-content__details');
                $.each($listItems, function (index, item) {
                    var text = $(item).text(),
                        $li = $('<li>'),
                        $input = $('<input>').attr({
                            type : 'text',
                            value : text,
                            name : 'editableInput'
                        });
                    $input.appendTo($li);
                    $li.appendTo($base);
                });
                $details.empty();
                $details.replaceWith($base);
                inEditMode = true;
            } else {
                var editableInputs = $("[name = 'editableInput']");
                $.each(editableInputs, function (index, item) {
                    var value = $(item).val();
                    $(item).replaceWith(value);
                });
                inEditMode = false;
            }
        });
    });
}(window.jQuery));