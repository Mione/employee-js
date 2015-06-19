(function ($) {
    'use strict';
    $(document).ready(function () {
    //var declaration
        var $arrowToggle = $('.toolbox__arrow');

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
    });
}(window.jQuery));