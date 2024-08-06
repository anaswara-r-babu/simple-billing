document.addEventListener('DOMContentLoaded' , function () {

    var container = document.getElementById('container');
    var form = document.getElementById('myForm');
    const section = document.querySelector('.input1');
    const rep_inp = document.getElementById('copied-input');
    // const plusBtn = document.querySelectorAll('.plus');
    const plusBtn = document.getElementById('plus'); 
    const newBtn = document.querySelectorAll('.newbtn');

    // TABLE 
    const transaction = document.getElementById('transaction');
    const tableContainer = document.getElementById('table-container');
    
    // var formData = new FormData(form);
    // var values = [];
    // formData.forEach((value, key) => {
    //     values.push(value);
    // });
    // console.log(values);
    
    function repeatedInput (event) {
        event.preventDefault();
        let clonedSection = section.cloneNode(true);
        var inputs = clonedSection.querySelectorAll('input');
        inputs.forEach(input => input.value = '');
        
        // Append the cloned section to the container
        form.appendChild(clonedSection);

        const newPlusBtn = clonedSection.querySelector('.plus');
        if (newPlusBtn) {
            newPlusBtn.addEventListener('click', repeatedInput);
            // no of inputs after 
            
            // const amountInputs = document.querySelectorAll('input.amount');
            // console.log(amountInputs.length);
            // let tot_amt = 0;
            // amountInputs.forEach(trackEl => {

            //     tot_amt+=parseInt(trackEl.value);
            //     console.log(tot_amt);
                
            //     const total=document.getElementById('res-amt');
            //     total.textContent=tot_amt;
            // })
        }
        // addInputEventListeners(clonedSection);
        
        updateTotalAmount();
    }


    function updateTotalAmount() {
        // Exclude the newly added section
        const sections = document.querySelectorAll('.input1');
        let latestSection = sections[sections.length - 1];
        let amountInputs = document.querySelectorAll('input.amount');
        let tot_amt = 0;

        amountInputs.forEach(input => {
            // Check if input is not inside the latest cloned section
            if (!latestSection.contains(input)) {
                tot_amt += parseInt(input.value) || 0; // Use parseInt and default to 0
            }
        });

        const total = document.getElementById('res-amt');
        total.textContent = tot_amt;
    }

    // dynamically typing 

    // function addInputEventListeners(section) {
    //     const inputs = section.querySelectorAll('input.amount');
    //     inputs.forEach(input => {
    //         input.addEventListener('input', () => {
    //             updateTotalAmount();
    //         });
    //     });
    //     updateTotalAmount(section);
    // }
    // addInputEventListeners(section);

    // // Add event listener to the initial section's input fields
    // addInputEventListeners(section);
    
    plusBtn.addEventListener('click', repeatedInput);

    

    // TABLE CREATION 
    function createTable() {
        console.log('table created');
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        // Create table header
        const headerRow = document.createElement('tr');
        const headers = ['PRODUCT', 'AMOUNT'];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

        // Create table body rows from form data

        let totalAmount = 0;

        const sections = document.querySelectorAll('.input1');
        sections.forEach(section => {
            const inputs = section.querySelectorAll('input');
            const productInput = inputs[0];
            const amountInput = inputs[1];

            if (productInput.value && amountInput.value) {
                const row = document.createElement('tr');
                const productCell = document.createElement('td');
                productCell.textContent = productInput.value;
                const amountCell = document.createElement('td');
                amountCell.textContent = amountInput.value;
                // const totalCell = document.createElement('td');
                // totalCell.textContent = '' // If you need a calculation, modify this
                const amountValue = parseFloat(amountInput.value); // Convert to number
                amountCell.textContent = amountValue;

                totalAmount += amountValue;

                row.appendChild(productCell);
                row.appendChild(amountCell);
                // row.appendChild(totalCell);
                tbody.appendChild(row);
            }
        });

           // Add a row with colspan for summary or total
        const summaryRow = document.createElement('tr');
        const summaryCell = document.createElement('td');
        // summaryCell.colSpan = 0; // Adjust colspan value as needed
        summaryCell.textContent = 'Total'; // Example text for the summary row
        summaryCell.style.fontWeight = 'bold';
        summaryRow.appendChild(summaryCell);

        const totalCell = document.createElement('td');
        totalCell.textContent = totalAmount; // Format to 2 decimal places
        summaryRow.appendChild(totalCell);

        tbody.appendChild(summaryRow);

        // Append thead and tbody to table
        table.appendChild(thead);
        table.appendChild(tbody);

        // Clear previous content and append the new table
        tableContainer.innerHTML = ''; // Clear previous content
        tableContainer.appendChild(table);       
    }


    transaction.addEventListener('click', createTable);
        
});