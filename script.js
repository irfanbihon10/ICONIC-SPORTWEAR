console.log("ICONIC SPORTWEAR website loaded successfully!");


// ========================================
// PRODUCT DATA
// ========================================

const productData = {

    barcelona: {
        name: "Barcelona Home Kit",
        price: "৳ 1200",
        stock: 12,
        image: "images/jersey1.jpg",
        description:
            "Barcelona Home Kit with comfortable fabric and stylish design. Perfect for football fans."
    },

    "real-madrid": {
        name: "Real Madrid Home Kit",
        price: "৳ 800",
        stock: 8,
        image: "images/jersey3.jpg",
        description:
            "Real Madrid Home Kit designed for comfort, style and everyday football wear."
    },

    "man-city": {
        name: "Man City Home Kit",
        price: "৳ 1000",
        stock: 10,
        image: "images/jersey4.jpg",
        description:
            "Man City Home Kit with a modern design and comfortable fabric for passionate fans."
    },

    argentina: {
        name: "Argentina Home Kit",
        price: "৳ 1000",
        stock: 7,
        image: "images/jersey2.jpg",
        description:
            "Argentina Home Kit made for supporters who want comfort and style."
    },

    bangladesh: {
        name: "Bangladesh Home Kit",
        oldPrice: "৳ 1600",
        price: "৳ 1280",
        discount: "20% OFF",
        stock: 15,
        image: "images/jersey5.jpg",
        description:
            "Bangladesh Home Kit with a comfortable fabric and stylish national team design."
    }

};


// ========================================
// GET PRODUCT ID
// ========================================

const productId =
    new URLSearchParams(window.location.search).get("product");


// ========================================
// STOCK MANAGEMENT
// ========================================

function getStock(id) {

    const savedStock =
        localStorage.getItem("stock_" + id);

    if (savedStock !== null) {
        return parseInt(savedStock);
    }

    return productData[id].stock;
}


function setStock(id, stock) {

    localStorage.setItem(
        "stock_" + id,
        stock
    );
}


// ========================================
// SHOW PRODUCT DETAILS
// ========================================

if (productId && productData[productId]) {

    const product =
        productData[productId];


    const productName =
        document.getElementById("productName");

    const productPrice =
        document.getElementById("productPrice");

    const productDescription =
        document.getElementById("productDescription");

    const productImage =
        document.getElementById("productImage");

    const oldPrice =
        document.getElementById("productOldPrice");

    const discount =
        document.getElementById("productDiscount");


    if (productName) {
        productName.textContent =
            product.name;
    }


    if (productPrice) {
        productPrice.textContent =
            product.price;
    }


    if (productDescription) {
        productDescription.textContent =
            product.description;
    }


    if (productImage) {

        productImage.src =
            product.image;

        productImage.alt =
            product.name;
    }


    if (oldPrice) {

        oldPrice.textContent =
            product.oldPrice || "";
    }


    if (discount) {

        discount.textContent =
            product.discount || "";
    }

}


// ========================================
// ORDER BUTTON
// ========================================

const orderButton =
    document.getElementById("orderButton");


if (
    orderButton &&
    productId &&
    productData[productId]
) {

    orderButton.href =
        "order.html?product=" +
        productId;

}


// ========================================
// SEARCH PRODUCTS
// ========================================

const products = {

    "barcelona home kit": "barcelona",

    "real madrid home kit": "real-madrid",

    "man city home kit": "man-city",

    "argentina home kit": "argentina",

    "bangladesh home kit": "bangladesh"

};


// ========================================
// LIVE SEARCH
// ========================================

const searchInput =
    document.getElementById("searchInput");

const suggestions =
    document.getElementById("suggestions");


if (searchInput && suggestions) {

    searchInput.addEventListener(
        "input",
        function () {

            const searchValue =
                searchInput.value
                    .trim()
                    .toLowerCase();


            suggestions.innerHTML = "";


            if (searchValue === "") {

                suggestions.style.display =
                    "none";

                return;
            }


            let found = false;


            for (let productName in products) {

                if (
                    productName.includes(searchValue)
                ) {

                    found = true;


                    const suggestion =
                        document.createElement("div");


                    suggestion.className =
                        "suggestion-item";


                    suggestion.textContent =
                        productName
                            .split(" ")
                            .map(function (word) {

                                return (
                                    word.charAt(0).toUpperCase() +
                                    word.slice(1)
                                );

                            })
                            .join(" ");


                    suggestion.addEventListener(
                        "click",
                        function () {

                            const id =
                                products[productName];


                            window.location.href =
                                "details.html?product=" +
                                id;

                        }
                    );


                    suggestions.appendChild(
                        suggestion
                    );

                }

            }


            if (found) {

                suggestions.style.display =
                    "block";

            } else {

                suggestions.style.display =
                    "none";
            }

        }
    );


    document.addEventListener(
        "click",
        function (event) {

            if (
                !event.target.closest(
                    ".search-wrapper"
                )
            ) {

                suggestions.style.display =
                    "none";
            }

        }
    );

}


// ========================================
// SEARCH BUTTON
// ========================================

function searchProduct() {

    const input =
        document.getElementById("searchInput");


    if (!input) {
        return;
    }


    const searchValue =
        input.value
            .trim()
            .toLowerCase();


    if (searchValue === "") {

        alert(
            "Please enter a product name."
        );

        return;
    }


    let matchedProduct = null;


    for (let productName in products) {

        if (
            productName.includes(searchValue) ||
            searchValue.includes(productName)
        ) {

            matchedProduct =
                products[productName];

            break;
        }

    }


    if (matchedProduct) {

        window.location.href =
            "details.html?product=" +
            matchedProduct;

    } else {

        alert(
            "Product Not Available!"
        );
    }

}


// ========================================
// SHOW SELECTED JERSEY ON ORDER PAGE
// ========================================

const selectedJersey =
    document.getElementById("selectedJersey");

const availableStock =
    document.getElementById("availableStock");


if (
    selectedJersey &&
    productId &&
    productData[productId]
) {

    const product =
        productData[productId];

    const currentStock =
        getStock(productId);


    selectedJersey.textContent =
        product.name;


    if (availableStock) {

        availableStock.textContent =
            currentStock + " Pieces";

    }

}


// ========================================
// QUANTITY LIMIT
// ========================================

const quantityInput =
    document.getElementById("quantity");


if (
    quantityInput &&
    productId &&
    productData[productId]
) {

    const currentStock =
        getStock(productId);


    quantityInput.max =
        currentStock;

}


// ========================================
// ORDER FORM
// ========================================

const orderForm =
    document.getElementById("orderForm");


if (orderForm) {

    orderForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "customerName"
                ).value;


            const size =
                document.getElementById(
                    "size"
                ).value;


            const quantity =
                parseInt(
                    document.getElementById(
                        "quantity"
                    ).value
                );


            // Check product

            if (
                !productId ||
                !productData[productId]
            ) {

                alert(
                    "Please select a jersey from the Details page."
                );

                return;
            }


            // Get current stock

            const currentStock =
                getStock(productId);


            // Check stock

            if (quantity > currentStock) {

                alert(
                    "Only " +
                    currentStock +
                    " pieces are available!"
                );

                return;
            }


            if (quantity < 1) {

                alert(
                    "Please enter a valid quantity."
                );

                return;
            }


            // Reduce stock

            const newStock =
                currentStock - quantity;


            setStock(
                productId,
                newStock
            );


            const jerseyName =
                productData[productId].name;


            // Show order message

            document.getElementById(
                "orderMessage"
            ).textContent =

                "Thank you, " +
                name +
                "! Your order for " +
                quantity +
                " " +
                jerseyName +
                " (Size: " +
                size +
                ") has been received.";


            // Update stock on page

            if (availableStock) {

                availableStock.textContent =
                    newStock + " Pieces";

            }


            // Update quantity limit

            if (quantityInput) {

                quantityInput.max =
                    newStock;

            }


            // Clear form

            orderForm.reset();


            // If stock becomes zero

            if (newStock === 0) {

                if (availableStock) {

                    availableStock.textContent =
                        "Out of Stock";

                }

                if (quantityInput) {

                    quantityInput.disabled =
                        true;

                }

            }

        }
    );

}


// ========================================
// CONTACT FORM
// ========================================

const contactForm =
    document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "contactName"
                ).value;


            document.getElementById(
                "contactMessage"
            ).textContent =

                "Thank you, " +
                name +
                "! Your message has been submitted successfully.";


            contactForm.reset();

        }
    );

}
// ========================================
// SHOPPING CART
// ========================================

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


// Add To Cart

const addToCart =
    document.getElementById("addToCart");


if (addToCart) {

    addToCart.addEventListener(
        "click",
        function () {

            if (
                !productId ||
                !productData[productId]
            ) {
                return;
            }


            const product =
                productData[productId];


            const currentStock =
                getStock(productId);


            if (currentStock <= 0) {

                alert("This product is out of stock!");

                return;
            }


            const existingProduct =
                cart.find(
                    item =>
                        item.id === productId
                );


            if (existingProduct) {

                if (
                    existingProduct.quantity >=
                    currentStock
                ) {

                    alert(
                        "You cannot add more than the available stock."
                    );

                    return;
                }

                existingProduct.quantity++;

            } else {

                cart.push({

                    id: productId,

                    name: product.name,

                    price: product.price,

                    image: product.image,

                    quantity: 1

                });

            }


            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );


            updateCartCount();


            alert(
                product.name +
                " added to cart!"
            );

        }
    );

}


// ========================================
// CART COUNT
// ========================================

function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount");


    if (!cartCount) {
        return;
    }


    let totalItems = 0;


    cart.forEach(function (item) {

        totalItems += item.quantity;

    });


    cartCount.textContent =
        totalItems;
}


updateCartCount();


// ========================================
// DISPLAY CART
// ========================================

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");


if (cartItems) {

    displayCart();

}


function displayCart() {

    cartItems.innerHTML = "";

    let total = 0;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                🛒 Your cart is empty.
                <br><br>
                Add some jerseys to your cart!
            </div>
        `;

        cartTotal.textContent =
            "৳ 0";

        return;
    }


    cart.forEach(function (item, index) {

        const price =
            parseInt(
                item.price
                    .replace("৳", "")
                    .trim()
            );


        const itemTotal =
            price * item.quantity;


        total += itemTotal;


        cartItems.innerHTML += `

            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div class="cart-item-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        ৳ ${price}
                    </p>

                </div>


                <div class="cart-quantity">

                    <button
                        onclick="decreaseCart(${index})">
                        −
                    </button>

                    <strong>
                        ${item.quantity}
                    </strong>

                    <button
                        onclick="increaseCart(${index})">
                        +
                    </button>

                </div>


                <button
                    class="remove-cart"
                    onclick="removeFromCart(${index})">

                    Remove

                </button>

            </div>

        `;

    });


    cartTotal.textContent =
        "৳ " + total;
}


// ========================================
// INCREASE CART
// ========================================

function increaseCart(index) {

    const item =
        cart[index];


    const currentStock =
        getStock(item.id);


    if (
        item.quantity >=
        currentStock
    ) {

        alert(
            "No more stock available!"
        );

        return;
    }


    item.quantity++;


    saveCart();

}


// ========================================
// DECREASE CART
// ========================================

function decreaseCart(index) {

    if (
        cart[index].quantity > 1
    ) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }


    saveCart();

}


// ========================================
// REMOVE FROM CART
// ========================================

function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();

}


// ========================================
// SAVE CART
// ========================================

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartCount();


    if (cartItems) {

        displayCart();

    }

}