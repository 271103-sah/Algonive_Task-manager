let quantity = 1;

function changeImage(element, price, title) {
  document.getElementById("mainImage").src = element.src;
  document.getElementById("price").innerText = price;
  document.getElementById("title").innerText = title;

  let thumbs = document.querySelectorAll(".thumb");
  thumbs.forEach(img => img.classList.remove("active"));

  element.classList.add("active");
}

function selectSize(el) {
  let sizes = document.querySelectorAll(".sizes span");
  sizes.forEach(s => s.classList.remove("active"));

  el.classList.add("active");
}

function changeQty(val) {
  quantity += val;
  if (quantity < 1) quantity = 1;
  document.getElementById("qty").innerText = quantity;
}

function addToCart() {
  let product = document.getElementById("title").innerText;
  let price = document.getElementById("price").innerText;
  let size = document.querySelector(".sizes .active");

  let sizeText = size ? size.innerText : "No size selected";

  alert(product + " | " + price + " | Size: " + sizeText + " | Qty: " + quantity + " added to cart!");
}
