// Fill year dropdowns when page loads
window.onload = function() {
    const startYearSelect = document.getElementById('startYear');
    const endYearSelect = document.getElementById('endYear');
    const currentYear = new Date().getFullYear();

    // Fill years from 2000 to 2050
    for(let i = 2000; i <= 2050; i++) {
        const startOption = document.createElement('option');
        startOption.value = i;
        startOption.textContent = i;
        if(i === currentYear) startOption.selected = true;
        startYearSelect.appendChild(startOption);

        const endOption = document.createElement('option');
        endOption.value = i;
        endOption.textContent = i;
        if(i === currentYear + 1) endOption.selected = true;
        endYearSelect.appendChild(endOption);
    }
}

// Update end year when start year changes
document.getElementById('startYear').addEventListener('change', function() {
    const startYear = parseInt(this.value);
    document.getElementById('entoString();
});

function calculate() {
    // Clear previous error
    const errorElement = document.getElementById('error');
    errorElement.style.display = 'none';
    
    // Get input values
    const startYear = parseInt(document.getElementById('startYear').value);
    const term = parseInt(document.getElementById('term').value);
    const batchNumber = parseInt(document.getElementById('batchNumber').value);
    const groupNumber = parseInt(document.getElementById('groupNumber').value);

    // Validate inputs
    if (!batchNumber || !groupNumber) {
        errorElement.textContent = 'الرجاء إدخال جميع البيانات المطلوبة';
        errorElement.style.display = 'block';
        return;
    }

    if (groupNumber < 0 || groupNumber > 999) {
        errorElement.textContent = 'رقم المجموعة يجب أن يكون بين 0 و 999';
        errorElement.style.display = 'block';
        return;
    }

    // Calculate tens and ones digits
    const tensDigit = Math.floor((groupNumber % 100) / 10);
    const onesDigit = groupNumber % 10;

    // Calculate level
    let level = 0;
    const startYearDiff = startYear - 2000;

    if (term === 1) {
        if (batchNumber > startYearDiff) {
            level = 1;
        } else if (batchNumber === startYearDiff && tensDigit === 5) {
            level = 2;
        } else if (batchNumber === startYearDiff && tensDigit === 0) {
            level = 3;
        } else if (batchNumber < startYearDiff) {
            level = 4;
        }
    } else {
        if (batchNumber > startYearDiff && tensDigit === 5) {
            level = 1;
        } else if (batchNumber > startYearDiff && tensDigit === 0) {
            level = 2;
        } else if (batchNumber === startYearDiff && tensDigit === 5) {
            level = 3;
        } else if (batchNumber === startYearDiff && tensDigit === 0) {
            level = 4;
        }
    }

    // Determine specialization
    let specialization = 'غير محدد';
    switch(onesDigit) {
        case 3:
            specialization = 'رسام هندسي صباحي';
            break;
        case 4:
            specialization = 'رسام هندسي مسائي';
            break;
        case 5:
            specialization = 'مساح اراضي صباحي';
            break;
        case 6:
            specialization = 'مساح اراضي مسائي';
            break;
    }

    // Display results with animation
    const resultElement = document.querySelector('.result');
    resultElement.style.opacity = '0';
    setTimeout(() => {
        document.getElementById('level').textContent = level || 'غير محدد';
        document.getElementById('specialization').textContent = specialization;
        resultElement.style.opacity = '1';
    }, 200);
}
