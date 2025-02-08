const axios = require('axios');

const API_BASE_URL = "http://localhost:3001";


const cart = [
  { product: 'cornflakes', quantity: 2 },
  { product: 'weetabix', quantity: 1 }
];

let cartContents = [];
let subtotal = 0;

async function getProductPrice(productName) {
  try {
    const url = `${API_BASE_URL}/products/${productName}`;
    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data.price;
    } else {
      console.error(`Unexpected status code: ${response.status}`);
      return 0;
    }
  } catch (error) {
    console.error(`Error fetching price for ${productName}:`, error.response ? error.response.data : error.message);
    return 0;
  }
}

async function addToCart() {
  for (const item of cart) {
    const price = await getProductPrice(item.product);
    if (price !== 0) {
      cartContents.push({ product: item.product, quantity: item.quantity, price });
      subtotal += price * item.quantity;
    }
  }
  return cartContents;
}

function calculateTax(subtotal) {
  return subtotal * 0.125; 
}

function printCartSummary() {

  cartContents.forEach(item => {
    console.log(`Cart contains ${item.quantity} x ${item.product}`);
  });


  const tax = calculateTax(subtotal);
  const total = subtotal + tax;
  console.log(`\nSubtotal = ${subtotal.toFixed(2)}`);
  console.log(`Tax = ${tax.toFixed(2)}`);
  console.log(`Total = ${total.toFixed(2)}`);
}

async function main() {
  await addToCart();
  printCartSummary();
}

main();
