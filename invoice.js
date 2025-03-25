document.addEventListener("DOMContentLoaded", function () {
    // Load saved order details
    let orderDetails = JSON.parse(localStorage.getItem("orderDetails"));

    if (orderDetails) {
        document.getElementById("order-date").innerText = orderDetails.date;
        document.getElementById("customer-name").innerText = orderDetails.name;
        document.getElementById("shipping-address").innerText = orderDetails.address;

        let itemsTable = document.getElementById("invoice-items");
        let subtotal = 0;

        orderDetails.items.forEach(item => {
            let row = `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>$${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
            `;
            itemsTable.innerHTML += row;
            subtotal += item.price * item.quantity;
        });

        let tax = subtotal * 0.15;
        let total = subtotal + tax;

        document.getElementById("subtotal").innerText = subtotal.toFixed(2);
        document.getElementById("tax").innerText = tax.toFixed(2);
        document.getElementById("total").innerText = total.toFixed(2);
    }
});

// Cancel Order Function
function cancelOrder() {
    localStorage.removeItem("orderDetails");
    alert("Your order has been canceled.");
    window.location.href = "index.html";
}
