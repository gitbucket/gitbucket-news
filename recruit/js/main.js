$('#slides').slick({
    dots: true,
    arrows: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    adaptiveHeight: true
});

$('#slides').on('beforeChange', function(event, slick, current, next){
    $("ul.features > li").removeClass("selected");
    $("ul.features > li").eq(next).addClass("selected");
});

$("ul.features > li").click(function(){
    $("ul.features > li").removeClass("selected");
    $(this).addClass("selected");
    var index = $(this).index();
    $("#slides").slick('slickGoTo', index, false);
});
