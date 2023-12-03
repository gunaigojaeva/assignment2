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

      productElement.addEventListener('click', () => {
        openProductDetailsPage(product.id);
    });

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
  function openProductDetailsPage(productId) {
    // Redirect to the product details page with the product ID as a query parameter
    window.location.href = `productDetails.html?productId=${productId}`;
  }
});
