// Elements
const balanceAmount = document.getElementById('balance-amount');
const totalIncome = document.getElementById('total-income');
const totalExpenses = document.getElementById('total-expenses');
const transactionList = document.getElementById('transaction-list');
const form = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');

// Data storage
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Update Dashboard
function updateDashboard() {
    const income = transactions.filter(t => t.type === 'income')
        .reduce((acc, t) => acc + t.amount, 0);

    const expenses = transactions.filter(t => t.type === 'expense')
        .reduce((acc, t) => acc + t.amount, 0);

    const balance = income - expenses;

    balanceAmount.textContent = balance.toFixed(2);
    totalIncome.textContent = income.toFixed(2);
    totalExpenses.textContent = expenses.toFixed(2);
}

// Add Transaction
function addTransaction(e) {
    e.preventDefault();

    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value.trim());
    const type = typeInput.value;

    if (description && amount > 0) {
        const transaction = {
            id: Date.now(),
            description,
            amount,
            type
        };

        transactions.push(transaction);
        updateLocalStorage();
        renderTransactions();
        updateDashboard();

        descriptionInput.value = '';
        amountInput.value = '';
    }
}

// Render Transaction History
function renderTransactions() {
    transactionList.innerHTML = '';

    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${transaction.description} 
            <span>${transaction.type === 'income' ? '+' : '-'}$${transaction.amount.toFixed(2)}</span>
            <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">X</button>
        `;
        transactionList.appendChild(li);
    });
}

// Delete Transaction
function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    updateLocalStorage();
    renderTransactions();
    updateDashboard();
}

// Update Local Storage
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Initialize App
function init() {
    renderTransactions();
    updateDashboard();
}

init();

// Event Listener
form.addEventListener('submit', addTransaction);
