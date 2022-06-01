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

    
    
    
    
    
///LOI VO////////////////////////////////////////////////////////////////
    const home = document.querySelector('section#content')
    if (home) {
        function addToCart(productId, quantity) {
            const bodyFetchData = {
                userId: 1,
                product_id: productId,
                quantity,
            }

            fetch('http://localhost:3000/cart/addToCart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(bodyFetchData)
            })
            .then(res => res.json())
            .then(response => {
                console.log(response)
                if (response.code === 0) {
                    //thong bao them vao gio hang thanh cong
                    //update lai cái số kế bên icon giỏ hàng
                    $('.add-to-cart').click()
                }
            })
        }
    }



    const cart = document.querySelector('section#cart-content')
    if (cart) {
        const bodyFetchData = {
            user_id: 1
        }
        fetch('http://localhost:3000/cart/getItems', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyFetchData)
        })
        .then(res => res.json())
        .then(response => {
            console.log(response)
            if (response.code === 0) {
                const table = document.querySelector('table#shoppingCart')
                const content = table.querySelector('tbody')
                content.innerHTML = ``;

                response.data.forEach(product => {
                    const product_id = product.product_id;
                    //fetch de doc thong tin chi tiet cua san pham
                    const infor = {
                        user_id: product.user_id,
                        product_id: product.product_id
                    }
                    content.innerHTML += `<tr>
                    <td data-th="Product">
                        <div class="row">
                            <div class="col-md-4 col-sm-5">
                                <img src="images/product.png" alt="" class="img-fluid rounded mb-2 shadow">
                            </div>
                            <div class="col-md-8 mt-sm-2 col-sm-7">
                                <h4>Product Name</h4>
                                <p class="font-weight-light">Brand & Name</p>
                            </div>
                        </div>
                    </td>
                    <td data-th="Price">$49.00</td>
                    <td data-th="Quantity">
                        <input onchange=updateHandler(event,${JSON.stringify(infor)}) type="number" class="form-control form-control-lg text-center" value="${product.quantity}" min="1">
                    </td>
                    <td class="actions" data-th="">
                        <div class="text-right">
                            <button onclick = deleteHandler(${JSON.stringify(infor)}) class="btn btn-white btn-md mb-2">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>`
                })
            }
        })


        
    }
});


function updateHandler(e,infor) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    const quantity = target.value;
    const bodyFetchData = {
        user_id: infor.user_id,
        product_id: infor.product_id,
        quantity: quantity
    }
    fetch('http://localhost:3000/cart/updateCart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyFetchData)
    })
    .then(res => res.json())
    .then(response => {
        console.log(response)
        if (response.code === 0) {
            console.log('cap nhat thanh cong')
        }
    })
}

function deleteHandler(infor) {
    const bodyFetchData = {
        user_id: infor.user_id,
        product_id: infor.product_id
    }
    fetch('http://localhost:3000/cart/deleteFromCart', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyFetchData)
    })
    .then(res => res.json())
    .then(response => {
        console.log(response)
        if (response.code === 0) {
            console.log('xoa san pham ra khoi gio hang thanh cong')
            //thong bao
            location.reload()
        }
    })
}