const addProductButton = document.getElementById('addProduct');
const generateBillButton = document.getElementById('generateBill');
const billingTableBody = document.getElementById('billingTable').getElementsByTagName('tbody')[0];
const totalAmountElement = document.getElementById('totalAmount');
const gstInput = document.getElementById('gst');
const messageDiv = document.getElementById('message');
const billDiv = document.getElementById('bill');
const billContent = document.getElementById('billContent');
const printBillButton = document.getElementById('printBill');
const clearBillButton = document.getElementById('clearBill');

let products = [];

// Event to add product
addProductButton.addEventListener('click', () => {
    const productSelect = document.getElementById('product');
    const productName = productSelect.value;
    const productPrice = parseFloat(document.getElementById('price').value);

    if (productName && !isNaN(productPrice) && productPrice > 0) {
        products.push({ name: productName, price: productPrice });
        updateBillingTable();
        clearInputs();
        messageDiv.textContent = ''; // Clear message when a product is added
    } else {
        messageDiv.textContent = 'Please select a product and enter a valid price.';
    }
});

// Function to update billing table and total amount
function updateBillingTable() {
    billingTableBody.innerHTML = ''; // Clear previous entries
    let total = 0;

    products.forEach(product => {
        const row = billingTableBody.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.textContent = product.name;
        cell2.textContent = product.price.toFixed(2) + ' INR';
        total += product.price;
    });

    totalAmountElement.textContent = total.toFixed(2);
}

// Function to clear input fields
function clearInputs() {
    document.getElementById('product').selectedIndex = 0; // Reset product selection
    document.getElementById('price').value = ''; // Clear price input
}

// Event to generate bill
generateBillButton.addEventListener('click', () => {
    const gstPercentage = parseFloat(gstInput.value);
    const totalBeforeGST = parseFloat(totalAmountElement.textContent);
    const gstAmount = (totalBeforeGST * gstPercentage) / 100;
    const totalAfterGST = totalBeforeGST + gstAmount;

    const paymentMode = document.querySelector('input[name="paymentMode"]:checked').value;

    // Create bill content
    billContent.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                ${products.map(product => `
                    <tr>
                        <td>${product.name}</td>
                        <td>${product.price.toFixed(2)} INR</td>
                    </tr>
                `).join('')}
                <tr>
                    <td><strong>Total before GST</strong></td>
                    <td><strong>${totalBeforeGST.toFixed(2)} INR</strong></td>
                </tr>
                <tr>
                    <td><strong>GST (${gstPercentage}%)</strong></td>
                    <td><strong>${gstAmount.toFixed(2)} INR</strong></td>
                </tr>
                <tr>
                    <td><strong>Total Amount</strong></td>
                    <td><strong>${totalAfterGST.toFixed(2)} INR</strong></td>
                </tr>
                <tr>
                    <td><strong>Payment Mode</strong></td>
                    <td><strong>${paymentMode}</strong></td>
                </tr>
            </tbody>
        </table>
        <h4 style="text-align: center;">Thank you for shopping with us! Visit Again!</h4>
    `;

    // Show bill
    billDiv.style.display = 'block';
});

// Event to print bill
printBillButton.addEventListener('click', () => {
    const printContent = billContent.innerHTML;
    const printWindow = window.open('', '', 'height=400,width=600');
    printWindow.document.write('<html><head><title>Bill</title>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(printContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
});

// Event to clear bill
clearBillButton.addEventListener('click', () => {
    products = [];
    billingTableBody.innerHTML = '';
    totalAmountElement.textContent = '0';
    billDiv.style.display = 'none';
    clearInputs();
    messageDiv.textContent = ''; // Clear any messages
});
