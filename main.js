document.addEventListener("DOMContentLoaded", function () {
  // API Integration
  const apiUrl = "https://dummyjson.com/products";
  const productContainer = document.getElementById("productContainer");
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");

  // Search functionality on input change
  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value;
    const selectedCategory = categoryFilter.value;
    fetchProducts(searchTerm, selectedCategory);
  });

  categoryFilter.addEventListener("change", function () {
    const searchTerm = searchInput.value;
    const selectedCategory = categoryFilter.value;
    fetchProducts(searchTerm, selectedCategory);
  });

  // Initial fetch and display of products
  fetchProducts();

  function fetchProducts(searchTerm = "", selectedCategory = "all") {
    // Fetch data from the API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        // Filter products based on search term
        const filteredProducts = data.products.filter((product) => {
          const matchesSearchTerm =
            product.title.includes(searchTerm) ||
            product.description.includes(searchTerm) ||
            product.category.includes(searchTerm);

          const matchesCategory =
            selectedCategory === "all" || product.category === selectedCategory;
          return matchesSearchTerm && matchesCategory;
        });

        // Display filtered products
        displayProducts(filteredProducts);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  function displayProducts(product) {
    productContainer.innerHTML = "";
    product.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.classList.add("product");

      productElement.addEventListener("click", () => {
        openProductDetailsPage(product.id);
      });

      // Display product information
      productElement.innerHTML = `
                <h2>${product.title}</h2>
                <p>Description: ${product.description}</p>
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
