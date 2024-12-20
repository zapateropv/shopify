const template = document.querySelector('.template');

let cart = JSON.parse(localStorage.getItem('cart')) || [];


const products = async () => {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    
 
    data.products.forEach((product, index) => {
        template.innerHTML += `
        <div class="card-content">
            <div>
                <img src="${product.images[0]}" class="products">
            </div>
            <div>
                <p>${product.title}</p>
            </div>
            <div>
                <img src="/100 JavaScript Projects/image-src/rating-${Math.floor(product.rating) * 10}.png" class="rating">
            </div>
            <div>
                <p class="price">$${product.price}</p>
                <button class="cartBtn" data-index="${index}">Add to Cart</button>
            </div>
        </div>`;
    });

   
    const addToCartButtons = document.querySelectorAll('.cartBtn');
    addToCartButtons.forEach((cartBtn, index) => {
        cartBtn.addEventListener('click', () => {
            const selectedProduct = data.products[index];

         

            const existingProduct = cart.find(item => item.id === selectedProduct.id);

            if (existingProduct) {
                
                existingProduct.quantity += 1;
            } else {
               
                cart.push({
                    id: selectedProduct.id,
                    title: selectedProduct.title,
                    images: selectedProduct.images,
                    quantity: 1,
                    price: selectedProduct.price,
                    options: [0]
                });
            }        

                const total = cart.reduce((acc,item) => acc + item.quantity, 0 )
                console.log(total)

                document.querySelector('.cartQ').innerHTML = total
                localStorage.setItem('cart', JSON.stringify(cart));
        });
    });
};

products();
const total = cart.reduce((acc,item) => acc + item.quantity, 0 )
document.querySelector('.cartQ').innerHTML = total

//CONTACTS

document.querySelector('.Contact').addEventListener('click', () => {
   
    document.querySelector('.contactus').style.visibility = "visible";

    document.querySelectorAll('.template').forEach((element) => {
        element.classList.add('blur');
    });

    document.querySelectorAll('.about').forEach((element) => {
        element.classList.add('blur'); 
    });

    document.querySelectorAll('.questions').forEach((element) => {
        element.classList.add('blur'); 
    });
});

document.querySelector('.x').addEventListener('click', () => {
  
    document.querySelector('.contactus').style.visibility = "hidden";

  
    document.querySelectorAll('.template').forEach((element) => {
        element.classList.remove('blur');
    });

    document.querySelectorAll('.about').forEach((element) => {
        element.classList.remove('blur'); 
    });

    document.querySelectorAll('.questions').forEach((element) => {
        element.classList.remove('blur'); 
    });
});

document.querySelector('.Subscribe').addEventListener('click', () => {
 
    document.querySelector('.contactus').style.visibility = "hidden";
    document.querySelector('form').reset();
  
    document.querySelectorAll('.template').forEach((element) => {
        element.classList.remove('blur');
    });

    document.querySelectorAll('.about').forEach((element) => {
        element.classList.remove('blur'); 
    });

    document.querySelectorAll('.questions').forEach((element) => {
        element.classList.remove('blur'); 
    });
});

//FAQ

document.querySelector('.btn1').addEventListener('click', () => {
    document.querySelector('.faq').classList.toggle("toggle")
})

document.querySelector('.btn2').addEventListener('click', () => {
    document.querySelector('.faq1').classList.toggle("toggle2")
})

document.querySelector('.btn3').addEventListener('click', () => {
    document.querySelector('.faq2').classList.toggle("toggle3")
})


