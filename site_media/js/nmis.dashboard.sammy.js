(function($) {
  Sammy = Sammy || {};
  Sammy.Title = function() {
    this.setTitle = function(title) {
      if (!$.isFunction(title)) {
        this.title_function = function(additional_title) {
          return [title, additional_title].join(' ');
        }
      } else {
        this.title_function = title;
      }
    };
    this.helper('title', function() {
      var new_title, 
            o_title = $.makeArray(arguments).join(' ');
      if (this.app.title_function) {
        new_title = this.app.title_function(new_title);
      }
      document.title = new_title;
      $('#page-title').text(o_title);
    });
  };
})(jQuery);


var SetResizer = (function($, resizeSelector, excludeSelector, extraPadding){
	var resizeElem = $(resizeSelector),
		excludeElem = $(excludeSelector);
	
	function ResizePage(){
		var windowHeight = $(window).height(),
			totalHeight = windowHeight - extraPadding;
		
		excludeElem.each(function(){
			totalHeight -= $(this).height();
		});
		resizeElem.css({'height':totalHeight})
	}
	$(window).resize(ResizePage);
	$(function(){
		resizeElem.css({'overflow':'auto'});
		$(document.body).css({'overflow':'hidden'})
		$(window).trigger('resize')
	});
});

var urls = {
    activity: '#/activity',
    freqTables: '#/frequency-tables',
    map: '#/map'
}
var dashboard = (function($){
    $(function(){
        var menu = $('#menu .fwidth').empty();
        menu.append($('<li />').html($("<a />", {href:urls.activity}).html("Activity")))
        menu.append($('<li />').html($("<a />", {href:urls.freqTables}).html("Frequency Tables")))
        menu.append($('<li />').html($("<a />", {href:urls.map}).html("Map")))
    })
    
    var dashboard = $.sammy("#main-content", function(){
        this.use(Sammy.Storage);
        this.store('mystore', {type: 'cookie'});
        this.use(Sammy.Title);
        this.setTitle(function(title){
            return ["Baseline Data Collection: ", title].join("");
        });
        this.get("#/", function(context){
            this.$element().html($('#dashboard').html());
        })
    });
    $(function(){
        dashboard.run("#/");
    });
    return dashboard;
})(jQuery)
