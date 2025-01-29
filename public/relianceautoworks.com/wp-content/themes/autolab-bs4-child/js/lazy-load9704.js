(function($) {

	$(document).ready(function() {
		showTopHeros();
	})

	function showTopHeros() {
		var topHeros = [$('#fp-stripe-1.stripe--hero.browser-edge'),$('#inner-stripe-1.stripe--hero.browser-edge'),$('#fp-stripe-1.stripe--hero.in-container .container'),$('#inner-stripe-1.stripe--hero.in-container .container'),$('#blog-stripe-1.stripe--hero.browser-edge'),$('#blog-stripe-1.stripe--hero.in-container .container')]
		$.each(topHeros, function() {
			var bg_image = $(this).data('src');
			$(this).css('background-image', 'url("'+bg_image+'")');
		})
	}
	$(window).on('scroll', function() {
		var bg_elements = [$('.delay-back')];
//
		var top_of_screen = $(window).scrollTop();
		var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
		$.each(bg_elements, function() {
			if($(this).length !== 0) {
				var top_of_element = $(this).offset().top;
				var bottom_of_element = $(this).offset().top + $(this).outerHeight();
				if((bottom_of_screen > (top_of_element-500)) && (top_of_screen < (bottom_of_element+500))) {
					$(this).addClass('load');
				}
			}
		})
		var heros = [$('.stripe--hero:not(#fp-stripe-1):not(#inner-stripe-1):not(#blog-stripe-1).browser-edge'),$('.stripe--hero:not(#fp-stripe-1):not(#inner-stripe-1):not(#blog-stripe-1).in-container .container')];
		$.each(heros, function() {
		var stripes = this;
			$.each(stripes, function() {
				if($(this).attr('data-src')) {
					var top_of_element = $(this).offset().top;
					var bottom_of_element = $(this).offset().top + $(this).outerHeight();
					var bg_image = $(this).data('src');
					if((bottom_of_screen > (top_of_element-500)) && (top_of_screen < (bottom_of_element+500))) {
						$(this).css('background-image', 'url("'+bg_image+'")');
					}
				}
			})
		})
	})
})(jQuery);
