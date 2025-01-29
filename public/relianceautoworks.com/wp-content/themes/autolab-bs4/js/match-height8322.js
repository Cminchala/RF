(function($) {

$(document).ready(function() {
	matchheights();
	matchTallest();
	setTimeout(function() {
		matchheights();
		matchTallest();
	}, 1000);
});

$(window).resize(function() {
	matchheights();
	matchTallest();
});

$(window).scroll(function() {
	matchheights();
});


function matchheights() {
	$('.match-height').each(function() {
		var matcher = $(this).data('match');
		var match = $(matcher).height();
		var plus = $(this).data('plus');
		var min = $(this).data('min');
		var divide = $(this).data('divide')
		if($(this).height() < match) {
			if(min) {
				if($(window).width() > min) {
					if(plus) {
						match = match + plus;
					}
					if (divide) {
						match = match / divide;
					}
					$(this).height(match);
				}
			} else {
				if(plus) {
					match = match + plus;
				}
				if (divide) {
					match = match / divide;
				}
				$(this).height(match);
			}
		} else {
			
		}
	});
}

function matchTallest() {
	$('.match-tallest').each(function() {
		var match = $(this).data('match');
		$(match).each(function() {
				$(this).css("height", 'unset');
		});
	});
	$('.match-tallest').each(function() {
		var match = $(this).data('match');
		var height = 0;
		$(match).each(function() {
			if($(this).height() > height) {
				height = $(this).height();
			}
		});
		$(this).height(height);
	});
}
	
})(jQuery);