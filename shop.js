document.addEventListener("DOMContentLoaded", function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Function to add items to cart
  function addToCart(productName, price, image) {
      let existingItem = cart.find(item => item.name === productName);

      if (existingItem) {
          existingItem.quantity += 1; // Increase quantity if item already exists
      } else {
          cart.push({
              name: productName,
              price: parseFloat(price.replace(" USD", "")), // Convert price to number
              image: image,
              quantity: 1
          });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${productName} added to cart!`);
  }

  // Attach event listeners to all "Add to Cart" buttons
  document.querySelectorAll(".btn").forEach(button => {
      button.addEventListener("click", function () {
          let productCard = this.closest(".product-card");
          let productName = productCard.querySelector("h3").textContent;
          let price = productCard.querySelector("p").textContent;
          let image = productCard.querySelector("img").src;

          addToCart(productName, price, image);
      });
  });
});

