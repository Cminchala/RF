(function($) {

//	https://owlcarousel2.github.io/OwlCarousel2/

$('.owl-carousel:not(#autolabOwlReviewSlider)').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
})

$(document).ready(function(){
	var $reviewResponseItems = '';
	if($(window).width() >= 992) {
		$reviewResponseItems = 1;
	} else if($(window).width() >=768) {
		$reviewResponseItems = 1;
	} else {
		$reviewResponseItems = 1;
	}
	var $itemMargin = '';

	$('#autolabOwlReviewSlider.owl-carousel').owlCarousel({
		loop:$('.owl-carousel .item').length > $reviewResponseItems ? true:false,
		margin:$itemMargin,
		nav:$('.owl-carousel .item').length > $reviewResponseItems ? true:false,
		navText: ['<i class="fal fa-chevron-left"></i>','<i class="fal fa-chevron-right"></i>'],
		autoplay:true,
		stagePadding:$itemMargin,
		slideTransition: 'linear',
        autoplayTimeout: 6000,
        autoplaySpeed: 6000,
		autoplayHoverPause:true,
		responsive:{
			0:{
				items:$reviewResponseItems
			},
		}
	});
});

})(jQuery);
