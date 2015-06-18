(function ($) {
  $(document).ready(function () {
    //var declaration
    var $arrowToggle = $('.toolbox__arrow');
    
    //functions
    
    //events
    $arrowToggle.on('click', function () {
      var $this = $(this), isOpen;
      var $details = $this.closest('.tbl-row__header').siblings('.tbl-row__content');

      if ($details.hasClass('closed')) {
        $details.show('fast');
        $details.removeClass('closed');
        $details.addClass('open');
      }
      else
        if ($details.hasClass('open')) {
              $details.hide('fast');
              $details.removeClass('open');
              $details.addClass('closed');
        }
      })
    
    });
  }(window.jQuery));