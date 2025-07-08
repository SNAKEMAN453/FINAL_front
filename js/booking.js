document.addEventListener('DOMContentLoaded', function() {
    const tablesGrid = document.querySelector('.tables-grid');
    if (!tablesGrid) return;

    const bookedTables = new Set();
    while (bookedTables.size < 4) {
        bookedTables.add(Math.floor(Math.random() * 12) + 1);
    }
    for (let i = 1; i <= 12; i++) {
        const card = document.createElement('div');
        card.className = 'table-card';
        let isBooked = bookedTables.has(i);
        card.innerHTML = `
            <div class="table-number">${i}</div>
            <button class="book-btn">${isBooked ? 'Booked' : 'Book'}</button>
        `;
        if (isBooked) {
            card.classList.add('booked');
        } else {
            const bookBtn = card.querySelector('.book-btn');
            bookBtn.addEventListener('click', function() {
                bookBtn.textContent = 'Booked';
                bookBtn.disabled = true;
                card.classList.add('booked');
                const cancelBtn = document.createElement('button');
                cancelBtn.className = 'cancel-btn';
                cancelBtn.innerHTML = '&times;';
                card.appendChild(cancelBtn);
                document.querySelectorAll('.table-card').forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.classList.add('other-transparent');
                    } else {
                        otherCard.classList.remove('other-transparent');
                    }
                });
                cancelBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    bookBtn.textContent = 'Book';
                    bookBtn.disabled = false;
                    card.classList.remove('booked');
                    cancelBtn.remove();
                    document.querySelectorAll('.table-card').forEach(otherCard => {
                        otherCard.classList.remove('other-transparent');
                    });
                });
            });
        }
        tablesGrid.appendChild(card);
    }
}); 