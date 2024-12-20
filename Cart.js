import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
let displayCheckout = document.querySelector('.checkout-container');


const dateNow = dayjs()
const newDate = dateNow.add( 7, 'day')
const newDate1 = dateNow.add( 3, 'day')
const newDate3 = dateNow.add( 1, 'day')

const formattedDate = newDate.format('dddd, MMMM D')
const formattedDate2 = newDate1.format('dddd, MMMM D')
const formattedDate3 = newDate3.format('dddd, MMMM D')

let storedCart = JSON.parse(localStorage.getItem('cart')) || [];


let totalItems = storedCart.reduce((acc, item) => acc + item.quantity, 0);
let totalPrice = storedCart.map((item) => item.quantity * item.price)
let totalCartPrice = totalPrice.reduce((acc, item) => acc + item,0)




const loopCart = () => {
    storedCart.forEach((item) => {
   
        displayCheckout.innerHTML += 
        `<div class="product-details">
            <div class="product-image">
                <p id="theDate" class="theDate">Delivery date: Tuesday, October 22</p>              
                <img src="${(item.images && item.images.length > 0) ? item.images[0] : 'default_image.jpg'}" alt="Product">
            </div>
            <div class="product-description">
                <p class="title">${item.title}</p>
                <p class="price">$${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <button class="update-btn">Update</button>
                <button class="delete-btn" data-delete-id="${item.id}">Delete</button>
            </div>
            <div class="delivery-options">
                <h2>Choose a delivery option:</h2>
                <div class="option">
                    <input type="radio"  id="option1" class="option1" name=${item.id} data-option1= ${item.id}>
                    <label for="option1">${formattedDate}</label>
                    <span>Free shipping</span>
                </div>
                <div class="option">
                    <input type="radio"  id="option2" class="option2" name=${item.id} data-option2= ${item.id}> 
                    <label for="option2">${formattedDate2}</label>
                    <span>$4.99 - Shipping</span>
                </div>
                <div class="option">
                    <input type="radio"  id="option3" class="option3" name=${item.id} data-option3= ${item.id}>
                    <label for="option3">${formattedDate3}</label>
                    <span>$9.99 - Shipping</span>
                </div>
            </div>
        </div> `      
        ;
    });
  
  
    document.querySelector('.parentDiv').innerHTML += `<div class="orderSum">
    <div>
        <p>Order Summary</p>
    </div>
    <div class="items">
        <p class="totalItems">Items (${totalItems}):</p>
        <p class="totalPrice">$${totalCartPrice.toFixed(2)}</p>
    </div>
    <div class="shipping">
        <p>Shipping & handling:</p>
        <p class="shippingTotal">$0.00</p>
    </div>
    <div class="Beforetax">
        <p>Total before tax:</p>
        <p class="beforeTax">$${totalCartPrice.toFixed(2)}</p>
    </div>
    <div class="Aftertax">
        <p>Estimated tax (10%):</p>
        <p class="afterTax">$${(totalCartPrice /10).toFixed(2)}</p>
    </div>
    <div class="total">
        <p>Order total:</p>
        <p class="orderTotal">$${((totalCartPrice / 10 ) + (totalCartPrice)).toFixed(2)}</p>
    </div>
    <div class="orderBtn">
        <button class="orderButton">Place your Order</button>
    </div>`

};

loopCart()




const option1 = document.querySelectorAll('.option1');
const option2 = document.querySelectorAll('.option2');
const option3 = document.querySelectorAll('.option3');
const theDate = document.querySelectorAll('.theDate');

let firstOption = Array.from(option1)
let secondOption = Array.from(option2)
let thirdOption = Array.from(option3)


const deleteButton = document.querySelectorAll('.delete-btn')
const displayShipping = document.querySelector('.shippingTotal')
const beforeTax = document.querySelector('.beforeTax')
const afterTax = document.querySelector('.afterTax')
const orderTotal = document.querySelector('.orderTotal')

const calculateShip = () => {

    storedCart.forEach((item => {

        let productShip = storedCart.reduce((acc, item) => acc + (item.options.length > 0 ? item.options[item.options.length - 1] : 0), 0);
        
        displayShipping.innerHTML = `$${productShip.toFixed(2)}`
        
        let totalBeforeTax = totalCartPrice + productShip;
        beforeTax.innerHTML = `$${totalBeforeTax.toFixed(2)}`;
    
        let estimatedTax = totalBeforeTax * 0.10; 
        afterTax.innerHTML = `$${estimatedTax.toFixed(2)}`;

        let orderTotalAmount = totalBeforeTax + estimatedTax; 
        orderTotal.innerHTML = `$${orderTotalAmount.toFixed(2)}`;

    }))

}


firstOption.forEach((item, index) => {
    item.addEventListener('click', () => {

    const deleteId = item.dataset.option1
    storedCart.forEach((product) => {
   
    if(deleteId == product.id){
     
        
      
        console.log(deleteId,product.id)
        if (product.options.length > 0) {
            product.options.pop(); 
        }
        product.options.push(0); 
        calculateShip()
        console.log(storedCart)
    }
       
})  
     theDate[index].textContent = `Delivery date: ${formattedDate}`;
        
    });
    
   
});


secondOption.forEach((item, index) => {
    item.addEventListener('click', () => {

    const deleteId = item.dataset.option2
    storedCart.forEach((product) => {
   
    if(deleteId == product.id){
     
        
        console.log(deleteId,product.id)
        if (product.options.length > 0) {
            product.options.pop(); 
        }
        product.options.push(4.99); 
        console.log(storedCart)
        calculateShip()
    }
       
})  
     theDate[index].textContent = `Delivery date: ${formattedDate}`;
        
    });
    
   
});


const totalCart = storedCart.reduce((acc,item) => acc + item.quantity, 0 )
document.querySelector('.cartQ').innerHTML = totalCart




thirdOption.forEach((item, index) => {
    item.addEventListener('click', () => {

    const deleteId = item.dataset.option3
    storedCart.forEach((product) => {
   
    if(deleteId == product.id){
     
        
        console.log(deleteId,product.id)
        if (product.options.length > 0) {
            product.options.pop(); 
        }
        product.options.push(9.99); 
        console.log(storedCart)
        calculateShip()
    }
       
})  
     theDate[index].textContent = `Delivery date: ${formattedDate}`;
        
    });
    
   
});



const handleDelete = () => {
    deleteButton.forEach((deleteBtn) => {
        deleteBtn.addEventListener('click', () => {
            const deleteId = deleteBtn.dataset.deleteId

            storedCart.forEach((item) => {
                if(item.id == deleteId) {
                    storedCart = storedCart.filter((item) => item.id != deleteId);
                    localStorage.setItem('cart', JSON.stringify(storedCart))

                    const productDetail = deleteBtn.closest('.product-details');
                    if (productDetail) {
                        productDetail.style.display = "none"; 
                    }
                    
                    totalCartPrice = Math.abs(totalCartPrice - (item.price * item.quantity));
                    document.querySelector('.totalPrice').innerHTML = `$${totalCartPrice.toFixed(2)}`

                    totalItems -= item.quantity
                    document.querySelector('.totalItems').innerHTML = `Items (${totalItems}):`
                   
                    let productShip = storedCart.reduce((acc, item) => acc + (item.options.length > 0 ? item.options[item.options.length - 1] : 0), 0); 
                    displayShipping.innerHTML = `$${productShip}`

                }
              
            })
            firstOption.shift()
             
            console.log(storedCart)

           
            let productShip = storedCart.reduce((acc, item) => acc + (item.options.length > 0 ? item.options[item.options.length - 1] : 0), 0); 
            let beforeTax1 = totalCartPrice + productShip
            
            beforeTax.innerHTML = `$${beforeTax1.toFixed(2)}`

            const tax = beforeTax1 * 0.10
            afterTax.innerHTML = `$${tax.toFixed(2)}`

            const total = tax + beforeTax1
            orderTotal.innerHTML = `$${total.toFixed(2)}`

            const totalCart = storedCart.reduce((acc,item) => acc + item.quantity, 0 )
            document.querySelector('.cartQ').innerHTML = totalCart

        })
    })

}

handleDelete()    

//order Button

const orderButton = document.querySelector('.orderButton');
const loader = document.querySelector('.spinner')
const card = document.querySelector('.card')

const handleOrderButton = () => {
    orderButton.addEventListener('click', () => {
        loader.style.visibility = "visible";
        

        document.querySelectorAll('.checkout-container').forEach((element) => {
            element.classList.add('blur');
        });
        
        document.querySelectorAll('.about').forEach((element) => {
            element.classList.add('blur'); 
        });
    
        document.querySelectorAll('.parentDiv').forEach((element) => {
            element.classList.add('blur'); 
        });

        setTimeout(() => {
            loader.style.visibility = "hidden";
            card.style.visibility = "visible"
        }, 1500); 
        
    })
   
}

document.querySelector('.cross-icon').addEventListener('click', () => {
 

        
        card.style.visibility = "hidden"
       
    
    document.querySelectorAll('.checkout-container').forEach((element) => {
        element.classList.remove('blur');
    });
    document.querySelectorAll('.about').forEach((element) => {
        element.classList.remove('blur');
    });
    document.querySelectorAll('.parentDiv').forEach((element) => {
        element.classList.remove('blur');
    });
})


handleOrderButton()

document.querySelector('.Contact').addEventListener('click', () => {
   
    document.querySelector('.contactus').style.visibility = "visible";

    document.querySelectorAll('.checkout-container').forEach((element) => {
        element.classList.add('blur');
    });
    
    document.querySelectorAll('.about').forEach((element) => {
        element.classList.add('blur'); 
    });

    document.querySelectorAll('.parentDiv').forEach((element) => {
        element.classList.add('blur'); 
    });
});

document.querySelector('.x').addEventListener('click', () => {
  
    document.querySelector('.contactus').style.visibility = "hidden";

  
    document.querySelectorAll('.checkout-container').forEach((element) => {
        element.classList.remove('blur');
    });
    document.querySelectorAll('.about').forEach((element) => {
        element.classList.remove('blur');
    });
    document.querySelectorAll('.parentDiv').forEach((element) => {
        element.classList.remove('blur');
    });



});




 
   