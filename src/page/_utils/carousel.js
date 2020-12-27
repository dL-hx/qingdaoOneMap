$(function () {

    var count = 0;

    $('.arrow-right').click(function () {
        count++;


        if (count == $('.slider li').length) {
            count = 0;
        }
        //让count渐渐的显示，其他兄弟渐渐的隐藏
        $('.slider li').eq(count).fadeIn().siblings('li').fadeOut();
    });

    $('.arrow-left').click(function () {
        count--;

        if (count == -1) {
            count = $('.slider li').length - 1;
        }
        //让count渐渐的显示，其他兄弟渐渐的隐藏
        $('.slider li').eq(count).fadeIn().siblings('li').fadeOut();
    });

});