// Fetch menu data from a public API (TheMealDB for demo)
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
        // Fallback demo data
        allPizzas = [
            { name: 'Retro Margherita', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80', price: '$9.99', desc: 'Classic cheese & tomato pizza.' },
            { name: 'Pepperoni Supreme', image: 'https://images.unsplash.com/photo-1548365328-8b849e6c7b77?auto=format&fit=crop&w=400&q=80', price: '$11.49', desc: 'Pepperoni, cheese, and more.' },
            { name: 'Veggie Delight', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', price: '$10.49', desc: 'Loaded with fresh veggies.' },
            { name: 'BBQ Chicken Pizza', image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80', price: '$12.49', desc: 'BBQ chicken, onions, and cheese.' }
        ];
        allBurgers = [
            { name: 'Classic Cheeseburger', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80', price: '$8.99', desc: 'Beef patty, cheese, and pickles.' },
            { name: 'Double Patty Burger', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', price: '$10.99', desc: 'Two patties, double the fun.' },
            { name: 'Bacon Burger', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=400&q=80', price: '$11.49', desc: 'Crispy bacon and cheese.' },
            { name: 'Veggie Burger', image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80', price: '$9.49', desc: 'A healthy veggie patty.' }
        ];
        pizzasLoaded = 0;
        burgersLoaded = 0;
        renderMenu();
    }
}

function renderMenu() {
    menuContainer.innerHTML = '';
    // Pizzas
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
    // Burgers
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
