(function ($) {
	$('.autoshop-youtube-img-wrap').on('click', function () {
		var link = $(this).data('vid');
		var frame = '<iframe class="embed-responsive-item" src="//www.youtube.com/embed/' + link + '?rel=0&autoplay=1"></iframe>';
		$('.autoshop-youtube-vid-wrap').html(frame);
	});
	var ipData;
	function getIPData() {
		$.getJSON('https://ipapi.co/json/', function (data) {
			ipData = data;
		});
	}
	function autoOpsButton() {
		if(autolab.autoops_enabled) {
			$button = $( "a[href$='/schedule/']");
			$button.each(function() {
				$(this).removeAttr('href');
				$(this).on('click', function() {
					AutoOps.show();
				})
			});
		}
	}
	$('.autoshop-partner').on('click', function () {
		var url = window.location.href;
		var partner = $(this).data('partner');
		reportClick('left', partner, url)
	});
	$('.autoshop-partner').contextmenu(function () {
		var url = window.location.href;
		var partner = $(this).data('partner');
		reportClick('right', partner, url)
	});
	function reportClick(click, partner, url) {
		getIPData();
		$.ajaxSetup({
			cache: true
		});
		$.ajax({
			url: 'https://autoshopsolutions.com/wp-admin/admin-ajax.php',
			type: 'get',
			dataType: 'jsonp',
			data: {
				action: 'ajax_autoshop_partner_click',
				data: ipData,
				url: url,
				click: click,
				partner: partner
			},
			success: function (html) {
				console.log('clicked');
			}
		});
	}
	$('.colorbox-link').on('click', function (event) {
		event.preventDefault();
		var url = $(this).attr('href');
		var frame = '<div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="' + url + '" allowfullscreen></iframe></div>';
		$('#asDefFootModal').modal('toggle');
		$('#asDefFootModal .vid-wrap').html(frame);
	});

	$('#asDefFootModal').on('hidden.bs.modal', function () {
		$('#asDefFootModal .vid-wrap').html('');
	});
	function setCookie(name, value, days) {
		var expires = "";
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = "; expires=" + date.toUTCString();
		}
		document.cookie = name + "=" + (value || "") + expires + "; path=/";
	}

	function getCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
		}
		return null;
	}
	function eraseCookie(name) {
		document.cookie = name + '=; Max-Age=-99999999;';
	}
	function fireModal() {
		$('#toolkitModal').modal();
	}
	$(document).ready(function () {
		autoOpsButton();
		$('#tk-cookie-policy-shower').on('click', function () {
			$('#tkcookie-policy').addClass('show');
		});
		$('#dismiss-cookie-details').on('click', function () {
			$('#tkcookie-policy').removeClass('show');
		});
		$('#dismiss-cookie-modal').on('click', function () {
			$('#toolkit-enable-cookie-pop').removeClass('pop');
			setCookie('tkcookiepop', 'popped', 7);
		});
		setTimeout(function () {
			if ($('#toolkitModal').hasClass('force')) {
				fireModal();
			} else {
				var cookie = getCookie('tkmodalpop');
				if (cookie !== 'popped' && $('#toolkitModal').hasClass('enabled')) {
					fireModal();
					setCookie('tkmodalpop', 'popped', 7);
				}
			}
			let cookies_cookie = getCookie('tkcookiepop');
			if (cookies_cookie !== 'popped' && $('#toolkit-enable-cookie-pop').hasClass('enabled')) {
				$('#toolkit-enable-cookie-pop').addClass('pop');
			}
		}, 2000);

		function isElement(element) {
		    return element instanceof Element || element instanceof HTMLDocument;
		}

		let reviewsListWrap = document.getElementsByClassName('stripe--reviews__text-wrap');
		if (reviewsListWrap.length > 0 && autolab.location_count > 1 && reviewsListWrap[0].classList.contains('review-location-all') === true) {
			let buttons = reviewsListWrap[0].getElementsByClassName('btn');
			for(button in buttons) {
				if(buttons[button].innerHTML && buttons[button].innerHTML.includes('Read')) {
					var reviewsListExists = $('#reviews-list-wrap').length;
					if(reviewsListExists == false) {
						buttons[button].dataset.href = buttons[button].href;
						buttons[button].removeAttribute('target');
						buttons[button].removeAttribute('href');
						buttons[button].addEventListener('click', reviewClick);
					} else {
						buttons[button].parentNode.classList.remove('dropdown');
						buttons[button].removeAttribute('data-toggle');
						buttons[button].classList.remove('dropdown-toggle');
						buttons[button].addEventListener('click', reviewClick);
					}
				}
			}
		}

		//Target button and add onclick event listener
		let reviewButton = document.getElementById('review-click');
		if(reviewButton) {
			reviewButton.addEventListener("click", reviewClick);
		}

		function reviewClick(e) {
			console.log('load more reviews');
			let elem = e.target;
			let perField = document.getElementById('review-per-page');
			let pageField = document.getElementById('review-page');
			let per = perField.value;
			let page = pageField.value;
			let offset = page * per;
			let container = document.getElementById('review-list-wrap');
			$.ajaxSetup({
				cache: true
			});
			$.ajax({
				url: autolab.ajaxurl,
				type: 'POST',
				dataType: 'json',
				data: {
					action: 'ajax_pull_reviews',
					offset: offset,
					limit: document.getElementById('review-text-limit').value,
					nonce: autolab.nonce,
				},
				success: function ( reviews ) {
					pageField.value = page + 1;
					if(reviews.length === 10) {
						for(review in reviews) {
							let div = document.createElement('div');
							div.className = 'row';
							div.innerHTML = reviews[review];
							container.appendChild(div);
						}
					} else {
						if(reviews.length > 0) {
							for(review in reviews) {
								let div = document.createElement('div');
								div.className = 'row';
								div.innerHTML = reviews[review];
								container.appendChild(div);
							}
						}
						if(elem.tagName == 'BUTTON') {
							elem.parentNode.classList.add('dropdown');
							elem.setAttribute('data-toggle', 'dropdown');
							elem.classList.add('dropdown-toggle');
						} else {
							elem.href = elem.dataset.href;
							elem.setAttribute('target', '_blank');
						}
						elem.removeAttribute('id');
					}
				},
			});
		}
	});
})(jQuery);
