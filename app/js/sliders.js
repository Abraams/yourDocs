function initReviewsSlider() {
	if (!document.querySelector(".reviews__slider")) return false;

	$(".reviews__slider").slick({
		arrows: false,
		dots: true,
		infinite: true,
		speed: 600,
		slidesToShow: 4,
		slidesToScroll: 4,
		edgeFriction: 0.2,
		touchThreshold: 10,
		responsive: [
			{
				breakpoint: 1202,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	});
}
