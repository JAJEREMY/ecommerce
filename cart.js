document.addEventListener("DOMContentLoaded", function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartContainer = document.getElementById("cart-items");
  let totalPriceContainer = document.getElementById("cart-total");

  function updateCart() {
      let totalPrice = 0;
      cartContainer.innerHTML = ""; // Clear the cart table before repopulating

      if (cart.length === 0) {
          cartContainer.innerHTML = "<tr><td colspan='5'>Your cart is empty.</td></tr>";
          totalPriceContainer.textContent = "$0.00";
          return;
      }

      cart.forEach((item, index) => {
          let itemTotal = item.price * item.quantity;
          totalPrice += itemTotal;

          let row = document.createElement("tr");
          row.innerHTML = `
              <td><img src="${item.image}" alt="${item.name}" class="cart-img"> ${item.name}</td>
              <td>$${item.price.toFixed(2)}</td>
              <td>
                  <button class="qty-btn" data-index="${index}" data-action="decrease">-</button>
                  <span>${item.quantity}</span>
                  <button class="qty-btn" data-index="${index}" data-action="increase">+</button>
              </td>
              <td>$${itemTotal.toFixed(2)}</td>
              <td><button class="remove-btn" data-index="${index}">Remove</button></td>
          `;

          cartContainer.appendChild(row);
      });

      totalPriceContainer.textContent = `$${totalPrice.toFixed(2)}`;
      localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Event listener for increasing and decreasing quantity
  document.addEventListener("click", function (event) {
      if (event.target.classList.contains("qty-btn")) {
          let index = event.target.getAttribute("data-index");
          let action = event.target.getAttribute("data-action");

          if (action === "increase") {
              cart[index].quantity++;
          } else if (action === "decrease" && cart[index].quantity > 1) {
              cart[index].quantity--;
          }

          updateCart();
      }
  });

  // Event listener for removing items
  document.addEventListener("click", function (event) {
      if (event.target.classList.contains("remove-btn")) {
          let index = event.target.getAttribute("data-index");
          cart.splice(index, 1);
          updateCart();
      }
  });

  // Initial cart load
  updateCart();
});
