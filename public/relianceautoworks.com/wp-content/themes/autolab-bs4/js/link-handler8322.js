(function($) {

$(document).ready(function() {
	removeOpener();
});

$(window).resize(function() {
});

$(window).scroll(function() {
});


////////////////////////////////////////////////////////////////////
// Checks and Operates Functions from Custom Common
////////////////////////////////////////////////////////////////////

function removeOpener() {
	var $links;
	$links = $('a[target="_blank"]');
	$.each($links, function() {
		if($(this).attr('rel') !== 'noopener') {
			$(this).attr('rel', 'noopener');
		}
	})
}

})(jQuery);
