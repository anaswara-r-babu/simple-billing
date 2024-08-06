document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('myForm');
    const section = document.querySelector('.input1');
    const plusBtn = document.getElementById('plus');
    const transactionBtn = document.querySelector('.transaction'); // Assuming this is the button you will use to trigger the selection of amount inputs

    function repeatedInput(event) {
        event.preventDefault();
        let clonedSection = section.cloneNode(true);
        var inputs = clonedSection.querySelectorAll('input');
        inputs.forEach(input => input.value = '');
        
        // Append the cloned section to the form
        form.appendChild(clonedSection);

        const newPlusBtn = clonedSection.querySelector('.plus');
        if (newPlusBtn) {
            newPlusBtn.addEventListener('click', repeatedInput);
        }

        selectAllAmountInputs();
    }

    function selectAllAmountInputs() {
        const amountInputs = form.querySelectorAll('.amount');
        console.log(amountInputs);
        
        amountInputs.forEach(input => {
            console.log(input.value); // Perform your action here
        });
    }

    plusBtn.addEventListener('click', repeatedInput);
    // transactionBtn.addEventListener('click', selectAllAmountInputs);
});
