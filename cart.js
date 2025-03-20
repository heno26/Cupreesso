// الحصول على عناصر HTML
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const cartItemsContainer = document.getElementById("cart-items");
const clearCartButton = document.getElementById("clear-cart");
const cartIcon = document.getElementById("cart-icon");
const cartContainer = document.getElementById("cart-container");

// وظيفة لإضافة منتج إلى السلة
function addToCart(productName, productPrice) {
    let existingProduct = cart.find(product => product.name === productName);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        const product = {
            name: productName,
            price: parseFloat(productPrice),
            quantity: 1
        };
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

// تحديث عرض السلة
function updateCart() {
    cartCount.textContent = cart.length;

    let total = 0;
    cartItemsContainer.innerHTML = "";

    cart.forEach((product, index) => {
        total += product.price * product.quantity;

        const li = document.createElement("li");
        li.innerHTML = `
            ${product.name} - $${product.price.toFixed(2)} 
            <button class="btn btn-sm btn-secondary decrease" data-index="${index}">-</button>
            <span class="quantity">${product.quantity}</span>
            <button class="btn btn-sm btn-secondary increase" data-index="${index}">+</button>
            <button class="btn btn-sm btn-danger remove" data-index="${index}">❌</button>
        `;

        cartItemsContainer.appendChild(li);
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// وظيفة لزيادة الكمية
function increaseQuantity(index) {
    cart[index].quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

// وظيفة لنقصان الكمية
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

// وظيفة لحذف منتج معين من السلة
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

// وظيفة لمسح جميع المنتجات من السلة
clearCartButton.addEventListener("click", () => {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
});

// عرض وإخفاء السلة عند الضغط على الأيقونة
cartIcon.addEventListener("click", () => {
    cartContainer.style.display = cartContainer.style.display === "block" ? "none" : "block";
});

// إضافة أحداث النقر إلى الأزرار داخل السلة
cartItemsContainer.addEventListener("click", (event) => {
    const index = event.target.getAttribute("data-index");
    if (event.target.classList.contains("increase")) {
        increaseQuantity(index);
    } else if (event.target.classList.contains("decrease")) {
        decreaseQuantity(index);
    } else if (event.target.classList.contains("remove")) {
        removeFromCart(index);
    }
});

// إضافة حدث لكل زر "Add to Cart"
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", (e) => {
        const productName = e.target.getAttribute("data-name");
        const productPrice = e.target.getAttribute("data-price");

        addToCart(productName, productPrice);
    });
});

// تحديث السلة عند تحميل الصفحة
updateCart();
// التأكد من تحميل الصفحة قبل تشغيل الكود
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contact-form");

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault(); // منع إعادة تحميل الصفحة

        // الحصول على القيم المدخلة
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        if (name && email && message) {
            alert("✅ Thank you, " + name + "! Your message has been sent successfully.");
            contactForm.reset(); // إعادة تعيين الحقول بعد الإرسال
        } else {
            alert("⚠️ Please fill in all fields before submitting.");
        }
    });
});
