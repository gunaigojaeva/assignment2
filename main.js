document.addEventListener("DOMContentLoaded", function () {
  // API Integration
  const apiUrl = "https://dummyjson.com/products";

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      //Data Display
      displayProducts(data.products);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  function displayProducts(product) {
    const productContainer = document.getElementById("productContainer");
    product.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.classList.add("product");

      // Display product information
      productElement.innerHTML = `
                <h2>${product.title}</h2>
                <p>Price: ${product.price}$</p>
                <p>Discount: ${product.discountPercentage}%</p>
                <p>Category: ${product.category}</p>
                <p>Stock: ${product.stock}</p>
                <img src="${product.thumbnail}" alt="${product.title}">
            `;

      productContainer.appendChild(productElement);
    });
  }
});
