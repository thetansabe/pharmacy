$(document).ready(function() {

    // Set product quantity in modal
    $('.quantity-right-plus').click(function(e) {
        e.preventDefault();
        let quantity = parseInt($('#quantity').val());
        $('#quantity').val(quantity + 1);
    });

    $('.quantity-left-minus').click(function(e) {
        e.preventDefault();
        let quantity = parseInt($('#quantity').val());
        if(quantity > 0) {
            $('#quantity').val(quantity - 1);
        }
    });

    // Add to cart alert
    $('.add-to-cart').click(() => {
        $('.add-to-cart-alert').fadeIn(1000);
        $('.add-to-cart-alert').delay(3000).fadeOut(1000);
    });

    // Read more btn product description
    $('.desc-collapse-text').click(() => {
        let x = $('.desc-collapse-text');
        if (x.text() == 'Hide...') {
            x.html('Read more...');
        }
        else {
            x.html('Hide...');
        }
    });

});