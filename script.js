const cart = []; // Initialize an empty shopping cart array

// Function to add an item to the cart
function addToCart(productName, price) {
    const product = cart.find(item => item.productName === productName);

    if (product) {
        product.quantity++;
    } else {
        cart.push({ productName, price, quantity: 1 });
    }

    updateCart(); // Call the function to update the cart display
}

// Function to remove an item from the cart
function removeFromCart(productName) {
    const index = cart.findIndex(item => item.productName === productName);

    if (index !== -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1);
        }

        updateCart();
    }
}

// Function to update the cart display
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement("li");
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className = "remove";
        removeButton.onclick = () => removeFromCart(item.productName);

        cartItem.textContent = `${item.productName} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;

        cartItem.appendChild(removeButton);
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    const cartTotal = document.getElementById("cart-total");
    cartTotal.textContent = total.toFixed(2);
}

// Event listener for checkout button (you can replace this with your own functionality)
const checkoutButton = document.getElementById("checkout-button");
checkoutButton.addEventListener("click", () => {
    alert("Checkout functionality is not implemented in this example.");
});

// Function to display search results based on the location
function showSearchResults(location) {
    const propertyList = document.querySelector(".property-list");
    propertyList.innerHTML = "";

    const filteredProperties = propertiesData.filter(property => property.location === location);

    if (filteredProperties.length === 0) {
        propertyList.innerHTML = "<p>No properties found for this location.</p>";
    } else {
        filteredProperties.forEach(property => {
            const propertyDiv = document.createElement("div");
            propertyDiv.classList.add("property");

            // Create property content
            const propertyImage = document.createElement("img");
            propertyImage.src = property.image;
            propertyImage.alt = property.name;

            const propertyName = document.createElement("h3");
            propertyName.textContent = property.name;

            const propertyPrice = document.createElement("p");
            propertyPrice.textContent = `Price: $${property.price}`;

            // Append elements to the property container
            propertyDiv.appendChild(propertyImage);
            propertyDiv.appendChild(propertyName);
            propertyDiv.appendChild(propertyPrice);

            propertyList.appendChild(propertyDiv);
        });
    }
}

// Get the location from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const locationParam = urlParams.get("location");

if (locationParam) {
    // Update the displayed location
    document.getElementById("location").textContent = locationParam;

    // Show search results for the specified location
    showSearchResults(locationParam);
}
</script>

// Add this code to the end of your script.js file

