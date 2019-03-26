// Screen bug fixed in dashboard page

try {
    checkForScreen();
    $(window).resize(function () {
        checkForScreen();
    });

    function checkForScreen() {
        $('#toolbar').css('max-height', $('.no-gutters').height() - $('#no-toolbar').height() + 1);
    }
} catch (e) {

}


// AOS initialize
try {
    AOS.init();
    var rellax = new Rellax('.rellax');
} catch(e) {

}


// global vars

var paintSets = JSON.parse($('#paintSets').text());
var paints = JSON.parse($('#paints').text());
var clicked = false;

// hover effects in splash

$(".inner").hover(function () {
    if(!clicked) {
        $(".inner").addClass('bg-danger');
        $(".middle").removeClass('bg-danger');
        $(".outer").removeClass('bg-danger');
    }
});

$(".middle").hover(function () {
    if(!clicked) {
        $(".inner").removeClass('bg-danger');
        $(".middle").addClass('bg-danger');
        $(".outer").removeClass('bg-danger');
    }
});

$(".outer").hover(function () {
    if(!clicked) {
        $(".inner").removeClass('bg-danger');
        $(".middle").removeClass('bg-danger');
        $(".outer").addClass('bg-danger');
    }
});

$(".outer").mouseleave(function () {
    if(!clicked)
        $(".outer").removeClass('bg-danger');
});

$(".inner").mouseleave(function () {
    if(!clicked) {
        $(".inner").removeClass('bg-danger');
        $(".middle").addClass('bg-danger');
        $(".outer").removeClass('bg-danger');
    }
});

$(".middle").mouseleave(function () {
    if(!clicked) {
        $(".inner").removeClass('bg-danger');
        $(".middle").removeClass('bg-danger');
        $(".outer").addClass('bg-danger');
    }
});

// splash to home page transform

$(document).click(function (e) {
    $el = $(e.target);
    if ($el.hasClass('clickme')) {
        if(!clicked) {
            $(".circle_s").toggleClass('sizePlus');
            clicked = true;
            $(".inner").addClass('bg-danger');
            $(".middle").removeClass('bg-danger').removeClass('animate-flicker');
            $(".outer").removeClass('bg-danger');
            setInterval(function () {
                $(".sec").remove();
                $(".nonSplash").removeClass('d-none');
                setInterval(function() {
                    $(".after-splash-content").addClass('opacityPlus');
                    setInterval(function () {
                        $(".name-header").addClass('opacityPlus');
                        setInterval(function () {
                            $(".quote-header").addClass('opacityPlus');
                            setInterval(function () {
                                $('.guguls').addClass('opacityPlus');
                            },700)
                        }, 700)
                    },700);
                },700);

            },3500);
        }
    } else {
        $(".circle_s").removeClass('sizePlus');
    }
});

// init controller

var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onEnter", duration: "200%"}});

// build parallax scrolling
new ScrollMagic.Scene({triggerElement: "#parallax1"})
    .setTween("#parallax1 > div", {y: "80%", ease: Linear.easeNone})
    .addTo(controller);

new ScrollMagic.Scene({triggerElement: "#parallax2"})
    .setTween("#parallax2 > div", {y: "80%", ease: Linear.easeNone})
    .addTo(controller);

new ScrollMagic.Scene({triggerElement: "#parallax3"})
    .setTween("#parallax3 > div", {y: "80%", ease: Linear.easeNone})
    .addTo(controller);


// build section wipes

$(function () {

    var controller = new ScrollMagic.Controller();

    var timelineMax = new TimelineMax();
    for(var i=0;i<paintSets.length;i++) {
        timelineMax.from("section.panel2.room" + i, 1, {xPercent: 100});
    }


    new ScrollMagic.Scene({
        triggerElement: "#pinContainer2",
        triggerHook: "onLeave",
        duration: "300%"
    })
        .setPin("#pinContainer2")
        .setTween(
            timelineMax
        )
        .addTo(controller);

});


// build leaf floating


$(function () { // wait for document ready
    var flightpath = {
        entry : {
            curviness: 1.25,
            autoRotate: true,
            values: [
                {x: 100,	y: -20},
                {x: 300,	y: 10}
            ]
        },
        looping : {
            curviness: 1.25,
            autoRotate: true,
            values: [
                {x: 510,	y: 60},
                {x: 620,	y: -60},
                {x: 500,	y: -100},
                {x: 380,	y: 20},
                {x: 500,	y: 60},
                {x: 580,	y: 20},
                {x: 620,	y: 15}
            ]
        },
        leave : {
            curviness: 1.25,
            autoRotate: true,
            values: [
                {x: 660,	y: 20},
                {x: 800,	y: 130},
                {x: $(window).width() + 300,	y: -100}
            ]
        }
    };
    // init controller
    var controller = new ScrollMagic.Controller();

    // create tween
    var tween = new TimelineMax()
        .add(TweenMax.to($("#plane"), 1.2, {css:{bezier:flightpath.entry}, ease:Power1.easeInOut}))
        .add(TweenMax.to($("#plane"), 2, {css:{bezier:flightpath.looping}, ease:Power1.easeInOut}))
        .add(TweenMax.to($("#plane"), 1, {css:{bezier:flightpath.leave}, ease:Power1.easeInOut}));

    // build scene
    var scene = new ScrollMagic.Scene({triggerElement: "#trigger", duration: 300, offset: 2200})
        .setPin("#target")
        .setTween(tween)
        .addTo(controller);
});

// build open and close door

// define images
var images = [
    "static/door-close.png",
    "static/door-open.png"
];

// TweenMax can tween any property of any object. We use this object to cycle through the array
var obj = {curImg: 0};

// create tween
var tween = TweenMax.to(obj, 0.5,
    {
        curImg: images.length - 1,	// animate propery curImg to number of images
        roundProps: "curImg",				// only integers so it can be used as an array index
        repeat: 0,									// repeat 1 times
        immediateRender: true,			// load first image automatically
        ease: Linear.easeNone,			// show every image the same ammount of time
        onUpdate: function () {
            $("#myimg").attr("src", images[obj.curImg]); // set the image source
        }
    }
);

// init controller
var controller = new ScrollMagic.Controller();

// build scene
var scene = new ScrollMagic.Scene({triggerElement: "#trigger", duration: 300, offset: 2100})
    .setTween(tween)
    .addTo(controller);

// handle form change
$("form.move input[name=duration]:radio").change(function () {
    scene.duration($(this).val());
});


// captions for slides handling...

for(let i=0;i<paintSets.length;i++) {
    let titles = [];
    let caps = [];
    let holyObject = {};
    for (let k = 0; k < paints.length; k++) {
        if (paints[k].set === paintSets[i]._id) {
            holyObject[paints[k].image] = {name: paints[k].name, caption: paints[k].caption}
        }
    }
    $('#carouselExampleControls'+i).on('slid.bs.carousel',function(){
        let src = $('#carouselExampleControls'+i+' .active img').attr('src');
        $('.carousel-caption-'+i+' h2').text(holyObject[src].name);
        $('.carousel-caption-'+i+' p').text(holyObject[src].caption);
    });
}

for(let j=0;j<paintSets.length;j++) {
    document.getElementsByClassName('bg'+j).style.backgroundColor = paintSets[j].color;
}







