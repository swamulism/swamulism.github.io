// var animation = bodymovin.loadAnimation({
//     container: document.getElementById('deliveryAnimation'),
//     renderer: 'svg',
//     loop: true,
//     autoplay: true,
//     path: 'alert.json'
// })


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