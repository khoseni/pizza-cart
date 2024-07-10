let quantities = {
  small: 0,
  medium: 0,
  large: 0
};

const prices = {
  small: 49.00,
  medium: 89.00,
  large: 129.00
};

// Function to increment quantity
function incrementQuantity(size) {
  quantities[size]++;
  updateQuantityDisplay(size);
  updateTotalPrice();
  updateCheckoutButton();
}

// Function to decrement quantity
function decrementQuantity(size) {
  if (quantities[size] > 0) {
      quantities[size]--;
      updateQuantityDisplay(size);
      updateTotalPrice();
      updateCheckoutButton();
  }
}

// Function to update quantity display
function updateQuantityDisplay(size) {
  document.getElementById(size + 'Quantity').textContent = quantities[size];
}

// Function to update total price
function updateTotalPrice() {
  let totalPrice = 0;
  totalPrice += quantities.small * prices.small;
  totalPrice += quantities.medium * prices.medium;
  totalPrice += quantities.large * prices.large;

  // Update total price display
  document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);

  // Update checkout button visibility
  updateCheckoutButton();
}

// Function to update checkout button visibility
function updateCheckoutButton() {
  const checkoutButton = document.getElementById('checkoutButton');
  if (quantities.small > 0 || quantities.medium > 0 || quantities.large > 0) {
      checkoutButton.style.display = 'inline-block';
  } else {
      checkoutButton.style.display = 'none';
  }
}

// Function for checkout button
function checkout() {
  const paymentSection = document.getElementById('paymentSection');
  paymentSection.style.display = 'block';
}

// Function to handle payment
function pay() {
  const totalAmount = parseFloat(document.getElementById('totalPrice').textContent);
  const paymentAmount = parseFloat(document.getElementById('paymentAmount').value);

  if (isNaN(paymentAmount) || paymentAmount <= 0) {
      showAlertWithTimeout("Please enter a valid payment amount.", 'paymentAlert');
      return;
  }

  if (paymentAmount < totalAmount) {
      showAlertWithTimeout("Insufficient amount.", 'paymentAlert');
  } else {
      const change = paymentAmount - totalAmount;
      showAlertWithTimeout(`Payment successful! Amount: R${paymentAmount.toFixed(2)}. Your change is: R${change.toFixed(2)}`, 'paymentAlert');

      // Delay for 5 seconds before resetting the order
      setTimeout(function() {
          resetOrder();
      }, 5000);
  }
}



// Function to show alert with timeout
function showAlertWithTimeout(message, alertId) {
  const paymentAlert = document.getElementById(alertId);
  paymentAlert.textContent = message;
  paymentAlert.style.display = 'block';

  setTimeout(function() {
      paymentAlert.style.display = 'none';
      paymentAlert.textContent = '';
  }, 5000);
}

// Function to reset quantities and hide payment section
function resetOrder() {
  quantities = {
      small: 0,
      medium: 0,
      large: 0
  };
  updateQuantityDisplay('small');
  updateQuantityDisplay('medium');
  updateQuantityDisplay('large');
  updateTotalPrice();

  // Clear payment amount input
  document.getElementById('paymentAmount').value = '';

  // Hide payment section
  const paymentSection = document.getElementById('paymentSection');
  paymentSection.style.display = 'none';

  // Clear payment alert message
  const paymentAlert = document.getElementById('paymentAlert');
  paymentAlert.textContent = '';
  paymentAlert.style.display = 'none';

  // Hide checkout button
  const checkoutButton = document.getElementById('checkoutButton');
  checkoutButton.style.display = 'none';
}
