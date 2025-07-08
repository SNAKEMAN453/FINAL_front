// Fetch menu data from a public API (TheMealDB for demo)
const menuContainer = document.getElementById('menu-items');

async function fetchMenu() {
    try {
        // Fetch pizza and burger items from TheMealDB
        const pizzaRes = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Pizza');
        const burgerRes = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef');
        const pizzaData = await pizzaRes.json();
        const burgerData = await burgerRes.json();

        // Combine and limit to a few items each
        const pizzas = (pizzaData.meals || []).slice(0, 3);
        const burgers = (burgerData.meals || []).filter(meal => meal.strMeal.toLowerCase().includes('burger')).slice(0, 3);

        const menuItems = [
            ...pizzas.map(item => ({
                name: item.strMeal,
                image: item.strMealThumb,
                price: `$${(8 + Math.random() * 6).toFixed(2)}`,
                desc: 'Classic pizza with a retro twist.'
            })),
            ...burgers.map(item => ({
                name: item.strMeal,
                image: item.strMealThumb,
                price: `$${(7 + Math.random() * 5).toFixed(2)}`,
                desc: 'Juicy burger, diner-style!'
            }))
        ];

        renderMenu(menuItems);
    } catch (e) {
        // Fallback demo data
        renderMenu([
            { name: 'Retro Margherita', image: '', price: '$9.99', desc: 'Classic cheese & tomato pizza.' },
            { name: 'Pepperoni Supreme', image: '', price: '$11.49', desc: 'Pepperoni, cheese, and more.' },
            { name: 'Classic Cheeseburger', image: '', price: '$8.99', desc: 'Beef patty, cheese, and pickles.' },
            { name: 'Double Patty Burger', image: '', price: '$10.99', desc: 'Two patties, double the fun.' },
        ]);
    }
}

function renderMenu(items) {
    menuContainer.innerHTML = '';
    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'menu-item';
        div.innerHTML = `
            ${item.image ? `<img src="${item.image}" alt="${item.name}" style="width:100%;border-radius:8px;margin-bottom:10px;">` : ''}
            <h3>${item.name} <span class="price">${item.price}</span></h3>
            <p>${item.desc}</p>
        `;
        menuContainer.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', fetchMenu);
