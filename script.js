document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const nameInput = document.getElementById('name');
    const titleInput = document.getElementById('title');
    const phoneInput = document.getElementById('phone');
    const pronounsCheckbox = document.getElementById('pronouns-checkbox');
    const pronounsInput = document.getElementById('pronouns');
    const phoneTypeSelect = document.getElementById('phone-type');
    
    // Get preview elements
    const previewName = document.getElementById('preview-name');
    const previewTitle = document.getElementById('preview-title');
    const previewCompany = document.getElementById('preview-company');
    const previewPhone = document.getElementById('preview-phone');
    const previewPhonePrefix = document.getElementById('preview-phone-prefix');
    const previewPronounsRow = document.getElementById('preview-pronouns-row');
    const previewPronouns = document.getElementById('preview-pronouns');
    const copySignatureBtn = document.getElementById('copySignatureBtn');  // Button to copy signature

    // Update preview when input changes
    nameInput.addEventListener('input', updatePreview);
    titleInput.addEventListener('input', updatePreview);
    phoneInput.addEventListener('input', updatePreview);
    pronounsCheckbox.addEventListener('change', togglePronounsField);  
    pronounsInput.addEventListener('input', updatePreview);
    phoneTypeSelect.addEventListener('change', updatePhoneType);  

    // Update the signature preview with form data
    function updatePreview() {
        previewName.textContent = nameInput.value || 'First Last';
        previewTitle.textContent = titleInput.value || 'Job Title';
        previewCompany.textContent = 'BIG IP & Legal Solutions';
        previewPhone.textContent = phoneInput.value || '+1.XXX.XXX.XXXX';
        
        if (pronounsCheckbox.checked && pronounsInput.value) {
            previewPronouns.textContent = pronounsInput.value;
            previewPronounsRow.style.display = 'table-row';  // Show pronouns row
        } else {
            previewPronounsRow.style.display = 'none';  // Hide pronouns row if not checked
        }
    }

    // Toggle the pronouns field based on the checkbox
    function togglePronounsField() {
        if (pronounsCheckbox.checked) {
            pronounsInput.disabled = false;
            pronounsInput.placeholder = "(e.g., she/her)";
        } else {
            pronounsInput.disabled = true;
            pronounsInput.value = '';  
            previewPronounsRow.style.display = 'none';  
        }
        updatePreview();  
    }

    // Update phone type (mobile/office) prefix in preview
    function updatePhoneType() {
        if (phoneTypeSelect.value === 'office') {
            previewPhonePrefix.textContent = 'o:';  
        } else {
            previewPhonePrefix.textContent = 'm:';  
        }
        updatePreview();  
    }

    // Initial check to set the form state properly
    togglePronounsField();  
    updatePhoneType();  

    // Handle copying signature to clipboard
    copySignatureBtn.addEventListener('click', function() {
        const signatureContent = document.getElementById('signature');  // Signature container to copy
        const range = document.createRange();
        range.selectNodeContents(signatureContent);  // Select content inside signature

        const selection = window.getSelection();
        selection.removeAllRanges();  // Clear previous selections
        selection.addRange(range);  // Select the signature content

        try {
            // Attempt to copy the selected content to clipboard
            document.execCommand('copy');
            alert('Signature copied to clipboard!');  // Confirmation message
        } catch (err) {
            alert('Failed to copy signature: ' + err);  // Error message if it fails
        }
        selection.removeAllRanges();  // Clear selection
    });
});