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

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function handleAddCart(button){
    const div = button.parentElement.parentElement.querySelector('.card-body')
    const product_id = parseInt(div.getAttribute('product_id'))

    //button.style.display = 'none'

    //tien hanh xu li them cart
    const user_id= parseInt(getCookie('user_id'))

    fetch('/shopping-cart/addToCart', {
        method: 'post',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({user_id, product_id, quantity: 1})
    })
    .then(res => res.json())
    .then(console.log)
}

function formatCurrency(price) {
    return price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
}

window.addEventListener('DOMContentLoaded', async e => {
    const user_id= parseInt(getCookie('user_id')) || -1

    const layout = document.querySelector('#user-layout')
    const cart = document.querySelector('#cart-content')

    if(layout){
        const span_quan = document.querySelector('#shopping-cart_quantity')
        fetch('/shopping-cart/getItems', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({user_id})
        })
        .then(response => response.json())
        .then(result => {
            let quantity = 0
            result.data.forEach(obj => {
                quantity += obj.quantity
                
            })

            span_quan.innerHTML = quantity
        })

        if(user_id !== -1){
            document.querySelector('#login_logout').innerHTML = `
            <a class='nav-link' href='/logout' id = "logout_href">
                <i class='fa-solid fa-key mr-1 m-color d-none-sm'></i>
                Logout
            </a>
            `
        }

        document.querySelector('#logout_href').addEventListener('click', e => {
            e.preventDefault()
            //console.log('allo')
            fetch('/logout', {
                method: 'post',
            })
            .then(res => res.json())
            .then(data => {
                if(data.code === 0) 
                    window.location.href = '/'
            })
        })
    }
    
    if(cart){
        if(user_id === -1){
            document.querySelector('#not_logged_in').innerHTML = 'Please log in'
            document.querySelector('#cart-content').innerHTML = ''
            return
        }

        const productListIds = await fetch('/shopping-cart/getItems', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({user_id})
        })
        .then(response => response.json())
        .then(result => {
            let list = []
            result.data.forEach(obj => {
                list.push({product_id: obj.product_id, quantity: obj.quantity} )
            })

            return list
        })
        .then(last => {return last})

        const tbody = document.querySelector('#cart-content_tbody')
        tbody.innerHTML = ``

        let total = 0
        let numberOfProducts = 0
        productListIds.forEach(productObj => {
            fetch('/shopping-cart/renderItem',{
                method: 'post',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({product_id: productObj.product_id})
            })
            .then(res => res.json())
            .then(result => {
                
                result.data.forEach(obj => {
                    total += obj.price * productObj.quantity
                    numberOfProducts += productObj.quantity
                    const content = `
                    <tr>
                        <td data-th="Product">
                            <div class="row">
                                <div class="col-md-4 col-sm-5">
                                    <img src="${obj.image}" alt="" class="img-fluid rounded mb-2 shadow">
                                </div>
                                <div class="col-md-8 mt-sm-2 col-sm-7">
                                    <h4>${obj.name}</h4>
                                    <p class="font-weight-light">${obj.category}</p>
                                </div>
                            </div>
                        </td>
                        <td data-th="Price">${formatCurrency(obj.price)}</td>
                        <td data-th="Quantity">
                            <input 
                                type="number" 
                                class="form-control form-control-lg text-center" 
                                value="${productObj.quantity}" min="1"
                                id = "product_quantity-input"
                            >
                        </td>
                        <td class="actions" data-th="" >
                            <div class="text-right">
                                <button 
                                    class="btn btn-white btn-md mb-2" 
                                    onclick = "deleteItemFromCart(this)"
                                    product_id = "${obj.product_id}" 
                                    user_id = "${user_id}"
                                >
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>`
                    tbody.innerHTML += content
                    
                    //console.log(obj)
                })
                document.querySelector('#cart-content_total').innerText = formatCurrency(total)
                //document.querySelector('#shopping-cart_quantity').innerText = numberOfProducts
            })
        })

    }
    
    
})

function deleteItemFromCart(btn){
    const product_id = parseInt(btn.getAttribute('product_id'))
    const user_id = parseInt(btn.getAttribute('user_id'))

    fetch('/shopping-cart/deleteFromCart', {
        method: 'delete',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({user_id, product_id})
    })
    .then(res => res.json())
    .then(data => {
        location.reload()
    })
}
