document.addEventListener('DOMContentLoaded', () => {

    const expenseform = document.getElementById("expenseform");
    const expensenameinput = document.getElementById("expensename");
    const expenseamountinput = document.getElementById("expenseamount");
    const expenselist = document.getElementById("expenselist");
    const totalamountdisplay = document.getElementById("totalamount");

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // ✅ Initial render
    renderexpenses();
    updatetotal();

    expenseform.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = expensenameinput.value.trim();
        const amount = parseFloat(expenseamountinput.value);

        if (name !== "" && !isNaN(amount) && amount > 0) {
            expenses.push({
                id: Date.now(),
                name,
                amount
            });

            saveexpensestolocal();
            renderexpenses();
            updatetotal();

            // clear inputs
            expenseform.reset();
        }
    });

    // ✅ Render expenses
    function renderexpenses() {
        expenselist.innerHTML = "";

        expenses.forEach(expense => {
            const li = document.createElement("li");
            li.classList.add("expense-item");

            li.innerHTML = `
                <span class="expense-text">
                    ${expense.name} - ৳${expense.amount}
                </span>
                <button class="delete-btn" data-id="${expense.id}">
                    ✖
                </button>
            `;

            expenselist.appendChild(li);
        });
    }

    // ✅ Delete expense (event delegation)
    expenselist.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const id = Number(e.target.dataset.id);

            expenses = expenses.filter(exp => exp.id !== id);
            saveexpensestolocal();
            renderexpenses();
            updatetotal();
        }
    });

    function updatetotal() {
        const totalamount = calculatetotal();
        totalamountdisplay.textContent = totalamount.toFixed(2);
    }

    function saveexpensestolocal() {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    function calculatetotal() {
        return expenses.reduce((sum, expense) => sum + expense.amount, 0);
    }
})
