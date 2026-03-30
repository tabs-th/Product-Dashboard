"use strict"; // Best practice to prevent silent bugs

const apiUrl = "https://www.course-api.com/javascript-store-products";

// Step 3: Promise-Based Fetch using .then()
// Demonstrates understanding of basic Promise chaining
function fetchProductsThen() {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        })
        .then(products => {
            console.log("--- Products from .then() ---");
            products.forEach(product => console.log(product.fields.name));
        })
        .catch(error => handleError(error));
}

// Step 4: Async/Await Fetch with try/catch
// Demonstrates a more modern, readable approach as seen in professor's "Async/Await" article
async function fetchProductsAsync() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        handleError(error);
    }
}

// Step 5: Display products in the UI
function displayProducts(products) {
    const container = document.querySelector("#product-container");
    
    // Take the first 5 products as per Step 5 requirements
    const featuredProducts = products.slice(0, 5);
    
    container.innerHTML = featuredProducts.map(product => {
        const { name, price, image } = product.fields;
        // Price is usually in cents in these APIs, converting to dollars
        const formattedPrice = (price / 100).toFixed(2);
        const imageUrl = image[0].url;

        return `
            <div class="product-card">
                <img src="${imageUrl}" alt="${name}">
                <h3>${name}</h3>
                <p>$${formattedPrice}</p>
            </div>
        `;
    }).join("");
}

// Step 6: Reusable Error Handler
// Per "Handling Bugs" article: Always surface errors, never let them fail silently.
function handleError(error) {
    console.error("An error occurred:", error.message);
    const container = document.querySelector("#product-container");
    container.innerHTML = `<p class="error-message">Sorry, we couldn't load the products. (${error.message})</p>`;
}

// Step 7: Execution
fetchProductsThen();
fetchProductsAsync();