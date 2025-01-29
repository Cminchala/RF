(function($) {

$(document).ready(function() {
	containerWidth();
});

$(document).resize( () => {
	containerWidth();
})

$(window).resize(function() {
	containerWidth();
});

$(window).scroll(function() {
	containerWidth();
});



function containerWidth() {
	const $container = $('.container.js-hybrid-contain');
	if($container.length > 0) {
		var containWidth;
		var width = $(window).width();
		if(width > 991) {
			if(!$container.hasClass('js-preset')) {
				console.log('here');
				$container.addClass('js-preset');
				containWidth = parseInt($container.css('max-width').slice(0,-2));
				$container.css('max-width', ((width - containWidth) / 2) + containWidth );
			} else {
				console.log('next');
				containWidth = parseInt($('.container:not(.js-hybrid-contain)').css('max-width').slice(0,-2));
				$container.css('max-width', ((width - containWidth) / 2) + containWidth );
			}
		} else {
			containWidth = parseInt($('.container:not(.js-hybrid-contain)').css('max-width').slice(0,-2));
			$container.css('max-width', containWidth);
		}
	}
}



})(jQuery);
