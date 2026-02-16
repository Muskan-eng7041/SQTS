document.addEventListener("DOMContentLoaded", () => {
  const images = [
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=80",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvqEFsZCSXBqfgAqAeMi_T3m0iMl4d0lzLDw&s",
    "https://media.istockphoto.com/id/1400194993/photo/cappuccino-art.jpg?s=612x612&w=0&k=20&c=_nYOcyQ15cYEeUYgUzkC5qG946nkCwU06NiWKt1s8SE=",
    "https://wp-headless.elca-cloud.com/glion/wp-content/uploads/sites/2/2025/05/Food-and-beverage-industry-trends-Header.jpg",
    "https://thumbs.dreamstime.com/b/abstract-people-coffee-shop-text-cafe-front-mirror-soft-focus-mirro-50997496.jpg",
    "https://images.unsplash.com/photo-1525193612562-0ec53b0e5d7c?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlJTIwc2hvcCUyMHRhYmxlfGVufDB8fDB8fHww",
    "https://industrialoutlook.in/wp-content/uploads/2023/01/Food.webp",
    "https://images.unsplash.com/photo-1769775529747-107551aec610?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhZmUlMjBjb2ZmZWV8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1600&q=80",
    "https://www.tutorialspoint.com/food_and_beverage_services/images/garnishing.jpg",
    "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1600&q=80"
  ];

  let index = 0;
  const hero = document.querySelector(".hero");

  function changeBg() {
    hero.style.backgroundImage = `url(${images[index]})`;
    index = (index + 1) % images.length;
  }

  changeBg();
  setInterval(changeBg, 4000);
});
function openCart() {
  document.getElementById("navMenu").classList.add("d-none");
  document.getElementById("cartMenu").classList.remove("d-none");
}

function closeCart() {
  document.getElementById("cartMenu").classList.add("d-none");
  document.getElementById("navMenu").classList.remove("d-none");
}

function showMenu(type, btn) {
  document.getElementById("beverages").classList.add("d-none");
  document.getElementById("food").classList.add("d-none");

  document.getElementById(type).classList.remove("d-none");

  document.querySelectorAll(".menu-tabs button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  if (window.innerWidth < 768) {
    closeCart();
  }

}
let cart = {};
let total = 0;

function changeQty(btn, value) {
  let card = btn.closest(".menu-card");
  let name = card.querySelector("h5").innerText;
  let price = parseInt(card.querySelector("span").innerText.replace("₹", ""));
  let qtySpan = btn.parentElement.querySelector(".qty");
  let qty = parseInt(qtySpan.innerText);

  qty = qty + value;
  if (qty < 0) qty = 0;
  qtySpan.innerText = qty;

  if (qty === 0) {
    delete cart[name];
  } else {
    cart[name] = { price, qty };
  }
  if (window.innerWidth < 768 && value === 1) {
    openCart();
  }
  updateCart();
}

function updateCart() {
  let cartBox = document.getElementById("cartItems");
  let totalBox = document.getElementById("cartTotal");
  let countBox = document.getElementById("cartCount");

  cartBox.innerHTML = "";
  total = 0;
  let count = 0;

  for (let item in cart) {
    let row = document.createElement("div");
    row.classList.add("cart-row");
    row.innerHTML = `
      <span>${item} x ${cart[item].qty}</span>
      <span>₹${cart[item].price * cart[item].qty}</span>
    `;
    cartBox.appendChild(row);

    total += cart[item].price * cart[item].qty;
    count += cart[item].qty;
  }

  totalBox.innerText = total;
  countBox.innerText = count;
}
function saveCart(){
  localStorage.setItem("beanCart", JSON.stringify(cart));
}

function loadCart(){
  let data = localStorage.getItem("beanCart");
  if(data){
    cart = JSON.parse(data);
    updateCart();
  }
}
loadCart();
document.querySelector(".btn-dark").addEventListener("click", ()=>{
  if(total === 0){
    alert("Your cart is empty 😅");
  } else {
    alert("Order placed! Total ₹" + total);
    cart = {};
    updateCart();
  }
});




