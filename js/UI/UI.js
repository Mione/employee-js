(function ($) {
    'use strict';
    $(document).ready(function () {
    //var declaration
        var $arrowToggle = $('.toolbox__arrow'),
            $editToggle = $('.toolbox__pencil'),
            inEditMode = false;
        //functions
        function openRow () {
          $this = $(this);
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
                        $li = $('<li>'),
                        $input = $('<input>').attr({
                            type : 'text',
                            value : text,
                            name : 'editableInput'
                        });
                    $li.attr('data-editable', '');
                    $input.appendTo($li);
                    $($details[index]).replaceWith($li);
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