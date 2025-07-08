const menuContainer = document.getElementById('menu-items');
const loadBurgersBtn = document.getElementById('load-burgers');
const loadPizzasBtn = document.getElementById('load-pizzas');

let allPizzas = [];
let allBurgers = [];
let pizzasLoaded = 0;
let burgersLoaded = 0;
const LOAD_COUNT = 3;

async function fetchMenuData() {
    try {
        const pizzaRes = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Pizza');
        const burgerRes = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef');
        const pizzaData = await pizzaRes.json();
        const burgerData = await burgerRes.json();
        allPizzas = (pizzaData.meals || []).map(item => ({
            name: item.strMeal,
            image: item.strMealThumb,
            price: `$${(8 + Math.random() * 6).toFixed(2)}`,
            desc: 'Classic pizza with a retro twist.'
        }));
        allBurgers = (burgerData.meals || [])
            .filter(meal => meal.strMeal.toLowerCase().includes('burger'))
            .map(item => ({
                name: item.strMeal,
                image: item.strMealThumb,
                price: `$${(7 + Math.random() * 5).toFixed(2)}`,
                desc: 'Juicy burger, diner-style!'
            }));
        if (allPizzas.length === 0 && allBurgers.length === 0) throw new Error('No data');
        pizzasLoaded = 0;
        burgersLoaded = 0;
        renderMenu();
    } catch (e) {

        allPizzas = [
            { name: 'Retro Margherita', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80', price: '$9.99', desc: 'Classic cheese & tomato pizza.' },
            { name: 'Pepperoni Supreme', image: 'image/peperoni.jfif', price: '$11.49', desc: 'Pepperoni, cheese, and more.' },
            { name: 'Veggie Delight', image: 'image/veggie.jfif', price: '$10.49', desc: 'Loaded with fresh veggies.' },
            { name: 'BBQ Chicken Pizza', image: 'image/bbq-chicken-pizza.webp', price: '$12.49', desc: 'BBQ chicken, onions, and cheese.' }
        ];
        allBurgers = [
            { name: 'Classic Cheeseburger', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80', price: '$8.99', desc: 'Beef patty, cheese, and pickles.' },
            { name: 'Double Patty Burger', image: 'image/double-cheeeck.jpg', price: '$10.99', desc: 'Two patties, double the fun.' },
            { name: 'Bacon Burger', image: 'image/bacon-burger.jfif', price: '$11.49', desc: 'Crispy bacon and cheese.' },
            { name: 'Veggie Burger', image: 'image/veggie-burger.jpg', price: '$9.49', desc: 'A healthy veggie patty.' }
        ];
        pizzasLoaded = 0;
        burgersLoaded = 0;
        renderMenu();
    }
}

function renderMenu() {
    menuContainer.innerHTML = '';
    if (allPizzas.length > 0) {
        const pizzaTitle = document.createElement('h3');
        pizzaTitle.textContent = 'Pizzas';
        pizzaTitle.style = 'width:100%;color:#00bcd4;font-size:1.5rem;margin:20px 0 10px 0;text-align:left;font-family:Comic Sans MS,Pacifico,cursive;';
        menuContainer.appendChild(pizzaTitle);
        allPizzas.slice(0, pizzasLoaded + LOAD_COUNT).forEach(item => {
            const div = document.createElement('div');
            div.className = 'menu-item';
            div.innerHTML = `
                ${item.image ? `<img src="${item.image}" alt="${item.name}">` : ''}
                <h3>${item.name} <span class="price">${item.price}</span></h3>
                <p>${item.desc}</p>
            `;
            menuContainer.appendChild(div);
        });
    }

    if (allBurgers.length > 0) {
        const burgerTitle = document.createElement('h3');
        burgerTitle.textContent = 'Burgers';
        burgerTitle.style = 'width:100%;color:#ff4081;font-size:1.5rem;margin:30px 0 10px 0;text-align:left;font-family:Comic Sans MS,Pacifico,cursive;';
        menuContainer.appendChild(burgerTitle);
        allBurgers.slice(0, burgersLoaded + LOAD_COUNT).forEach(item => {
            const div = document.createElement('div');
            div.className = 'menu-item';
            div.innerHTML = `
                ${item.image ? `<img src="${item.image}" alt="${item.name}">` : ''}
                <h3>${item.name} <span class="price">${item.price}</span></h3>
                <p>${item.desc}</p>
            `;
            menuContainer.appendChild(div);
        });
    }
}

loadBurgersBtn.addEventListener('click', () => {
    if (burgersLoaded + LOAD_COUNT < allBurgers.length) {
        burgersLoaded += LOAD_COUNT;
    } else {
        burgersLoaded = allBurgers.length - LOAD_COUNT;
    }
    renderMenu();
});

loadPizzasBtn.addEventListener('click', () => {
    if (pizzasLoaded + LOAD_COUNT < allPizzas.length) {
        pizzasLoaded += LOAD_COUNT;
    } else {
        pizzasLoaded = allPizzas.length - LOAD_COUNT;
    }
    renderMenu();
});

document.addEventListener('DOMContentLoaded', fetchMenuData);

const contactForm = document.querySelector('.contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const messageInput = document.getElementById('message');
const togglePasswordBtn = document.getElementById('togglePassword');

function showError(input, message) {
    let error = input.parentElement.querySelector('.error-msg');
    if (!error) {
        error = document.createElement('div');
        error.className = 'error-msg';
        error.style.color = '#8b2f3c';
        error.style.fontSize = '0.9em';
        error.style.marginTop = '4px';
        input.parentElement.appendChild(error);
    }
    error.textContent = message;
}
function clearError(input) {
    const error = input.parentElement.querySelector('.error-msg');
    if (error) error.remove();
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validatePassword(password) {
    return /^(?=.*\d).{6,}$/.test(password);
}

if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            togglePasswordBtn.textContent = 'Hide';
        } else {
            passwordInput.type = 'password';
            togglePasswordBtn.textContent = 'Show';
        }
    });
}

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        let valid = true;
        if (!nameInput.value.trim()) {
            showError(nameInput, 'Name is required');
            valid = false;
        } else {
            clearError(nameInput);
        }
        if (!emailInput.value.trim()) {
            showError(emailInput, 'Email is required');
            valid = false;
        } else if (!validateEmail(emailInput.value.trim())) {
            showError(emailInput, 'Enter a valid email');
            valid = false;
        } else {
            clearError(emailInput);
        }
        if (!passwordInput.value.trim()) {
            showError(passwordInput, 'Password is required');
            valid = false;
        } else if (!validatePassword(passwordInput.value.trim())) {
            showError(passwordInput, 'At least 6 characters and a number');
            valid = false;
        } else {
            clearError(passwordInput);
        }
        if (!messageInput.value.trim()) {
            showError(messageInput, 'Message is required');
            valid = false;
        } else {
            clearError(messageInput);
        }
        if (!valid) {
            e.preventDefault();
        }
    });
}

const burgerBtn = document.getElementById('burger-btn');
const mainNav = document.getElementById('main-nav');
if (burgerBtn && mainNav) {
    burgerBtn.addEventListener('click', function() {
        burgerBtn.classList.toggle('active');
        mainNav.classList.toggle('open');
        burgerBtn.setAttribute('aria-expanded', mainNav.classList.contains('open'));
    });
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                burgerBtn.classList.remove('active');
                mainNav.classList.remove('open');
                burgerBtn.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', function() {
    if (window.scrollY > 200) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

const cookieNotice = document.getElementById('cookieNotice');
const acceptCookiesBtn = document.getElementById('acceptCookies');
if (cookieNotice && acceptCookiesBtn) {
    cookieNotice.style.display = 'block';
    acceptCookiesBtn.addEventListener('click', function() {
        cookieNotice.style.display = 'none';
    });
}
