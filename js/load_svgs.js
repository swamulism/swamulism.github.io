$(function() {
    $('.bodymovin').each(function() {
        var element = $(this);
        var animation = bodymovin.loadAnimation({
            container: element[0],
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: element.data('icon')
        });
    });
});



// var x = document.getElementsByClassName("bodymovin");
// var i;
// for (i = 0; i < x.length; i++) {
//   var animation = bodymovin.loadAnimation({
//     container: x[0],
//     renderer: 'svg',
//     loop: true,
//     autoplay: true,
//     path: x[0].getAttribute("data-icon")
// });
// }
