document.addEventListener("DOMContentLoaded", function() {
    // Get references to the HTML elements
    const productList = document.getElementById("product-list");
    const addProductForm = document.getElementById("add-product-form");
    const findProductForm = document.getElementById("find-product-form");

    document.querySelector("#load-all-items").addEventListener("click", getAllProducts)

    // Function to fetch all products and render them on the page
    function getAllProducts() {
        fetch("http://localhost:8080/api/products")
            .then(response => response.json())
            .then(products => {
                // Clear the existing product list
                productList.innerHTML = "";

                // Render each product as a list item
                products.forEach(product => {
                    const listItem = document.createElement("li");
                    listItem.textContent = `${product.name} - Price: ${product.price} - Weight: ${product.weight}`;
                    productList.appendChild(listItem);
                });
            });
    }

    // Function to add a new product
    function addProduct(event) {
        event.preventDefault();

        const nameInput = document.getElementById("name-input");
        const priceInput = document.getElementById("price-input");
        const weightInput = document.getElementById("weight-input");

        const product = {
            name: nameInput.value,
            price: parseFloat(priceInput.value),
            weight: parseFloat(weightInput.value)
        };

        fetch("http://localhost:8080/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        })
        .then(response => response.json())
        .then(newProduct => {
            // Display the newly added product
            const listItem = document.createElement("li");
            listItem.textContent = `${newProduct.name} - Price: ${newProduct.price} - Weight: ${newProduct.weight}`;
            productList.appendChild(listItem);

            // Clear the input fields
            nameInput.value = "";
            priceInput.value = "";
            weightInput.value = "";
        });
    }

    // Function to find a product by name
    function findProduct(event) {
        event.preventDefault();

        const searchInput = document.getElementById("search-input");
    const productName = searchInput.value;

    fetch(`http://localhost:8080/api/products/${productName}`)
        .then(response => response.json())
        .then(product => {
            // Clear the input field
            searchInput.value = "";

            // Render the found product or display an error message
            if (product) {
                const listItem = document.createElement("li");
                listItem.textContent = `${product.name} - Price: ${product.price} - Weight: ${product.weight}`;
                productList.innerHTML = "";
                productList.appendChild(listItem);
            } else {
                productList.innerHTML = "<li>Product not found</li>";
            }
        });
}


// Event listeners for form submissions
addProductForm.addEventListener("submit", addProduct);
findProductForm.addEventListener("submit", findProduct);

// Fetch all products on page load
getAllProducts()

})