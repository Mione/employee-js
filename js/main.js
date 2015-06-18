(function ($) {
  $(document).ready(function () {
    //var declaration
    var $arrowToggle = $('.toolbox__arrow');
    
    //functions
    
    //events
    $arrowToggle.on('click', function () {
      var $this = $(this), isOpen, $rowContent = $('.tbl-row__content');
        if ($this.hasClass('.toolbox__arrow--open')) {
          $rowContent.removeClass('open');
          $rowContent.addClass('closed');
        }
      })
    
    });
  }(window.jQuery));