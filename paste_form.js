// paste_form.js

// Try to access jQuery from the window object.
// This is the safest way to ensure it's available in your isolated world
// if the page itself has loaded it.
if (typeof jQuery === 'undefined' || typeof $ === 'undefined') {
    // If jQuery is not defined, this means it hasn't loaded yet or isn't accessible.
    // For a content script, you might need to wait for the page to load it,
    // or inject your own copy.
    console.error("jQuery is not defined in content script's isolated world. Trying to inject or wait.");

    // Without jQuery available there's no point in executing the rest of the
    // script. Return early so we don't hit runtime errors later on.
    return;

    // Option A: Try to get jQuery from the page's window object.
    // This is often the best approach for content scripts that interact with existing page elements.
    // However, it relies on 'window.jQuery' being exposed by the page's script.
    // This might require running in 'main' world in manifest v3, which is more complex.
    // For now, let's assume the basic 'isolated world' and try to get it if it's truly global.
    // The most common reason for '$ is not defined' is simply that your script runs too early.

    // A better approach for timing is to ensure your script runs after DOMContentLoaded.
    // This is typically handled by 'document_end' or 'document_idle' in manifest.json.
    // Let's ensure your manifest.json is correctly configured.

}

// Wrap your entire form-filling logic inside a function that runs when the DOM is ready
// This is crucial for both timing and ensuring elements exist.
$(document).ready(function() { // This line itself requires $ to be defined!

    console.log("jQuery is now available and DOM is ready.");

    // Your existing form-filling code goes here:
    chrome.storage.local.get('formData', function (storageData) {
        console.log("Step 1: Retrieved formData:", storageData);

        const data = storageData.formData;
        const changeEvent = new Event('change');

        // --- Initial form field population ---
        const catApplicantDropdown = document.getElementById('cat_applicant');
        if (catApplicantDropdown) { // Add null check
            catApplicantDropdown.value = data.applicant_category;
            console.log("Step 2: Setting cat_applicant to:", data.applicant_category);
            catApplicantDropdown.dispatchEvent(changeEvent);
        } else {
            console.error("cat_applicant element not found!");
            return; // Stop execution if critical element is missing
        }


        // Populate other direct fields (add null checks where appropriate)
        document.getElementById('l_name').value = data.last_name;
        document.getElementById('f_name').value = data.first_name;
        document.getElementById('m_name').value = data.middle_name;
        document.getElementById('name_card').value = data.name_on_card;

        document.getElementById('fal_name').value = data.father_last_name;
        document.getElementById('faf_name').value = data.father_first_name;
        document.getElementById('fam_name').value = data.father_middle_name;

        // Ensure radio buttons exist before trying to set
        const nmotherRadio = document.getElementById('nmother');
        const ymotherRadio = document.getElementById('ymother');
        if (nmotherRadio && ymotherRadio) {
            nmotherRadio.checked = true;
            ymotherRadio.checked = false;
        }

        document.getElementById('opaMotherLastName').value = '';
        document.getElementById('opaMotherFirstName').value = '';
        document.getElementById('opaMotherMiddleName').value = '';

        document.getElementById('dob').value = data.dob;
        document.getElementById('tel_num_isdcode').value = data.std_code;
        document.getElementById('tel_num').value = data.mobile_number;
        document.getElementById('email_id').value = data.email;

        const addCommDropdown = document.getElementById('add_comm');
        if (addCommDropdown) {
            addCommDropdown.value = 'INDIAN';
            addCommDropdown.dispatchEvent(changeEvent);
        }

        document.getElementById('name_aadhaar').value = data.aadhaar_name;
        const aadhaarNoInput = document.getElementById('aadhaarNo');
        if (aadhaarNoInput) {
            aadhaarNoInput.value = data.aadhaar_number;
            aadhaarNoInput.dispatchEvent(changeEvent);
        }

        const genderDropdown = document.getElementById('gender');
        if (genderDropdown) {
            genderDropdown.value = data.gender;
            genderDropdown.dispatchEvent(changeEvent);
        }

        const userStateDropdown = document.getElementById('user_state');
        if (userStateDropdown) {
            for (let i = 0; i < userStateDropdown.options.length; i++) {
                if (userStateDropdown.options[i].text.trim() === data.resi_state) {
                    userStateDropdown.options[i].selected = true;
                    break;
                }
            }
            userStateDropdown.dispatchEvent(changeEvent);
        }

        document.getElementById('pincode').value = data.resi_pincode;

        document.getElementById('area_code').value = data.area_code;
        document.getElementById('ao_type').value = data.ao_type;
        document.getElementById('range_code').value = data.range_code;
        document.getElementById('ao_num').value = data.ao_no;
        
        const aoSelectionRadio = document.getElementById('aoSelection');
        if (aoSelectionRadio) {
             aoSelectionRadio.checked = true;
        }


        const raAddDropdown = document.getElementById('ra_add');
        if (raAddDropdown) {
            raAddDropdown.value = 'INDIAN';
            raAddDropdown.dispatchEvent(changeEvent);
        }

        const checkAadhaarEidDropdown = document.getElementById('check_aadhaar_eid');
        if (checkAadhaarEidDropdown) {
            checkAadhaarEidDropdown.value = 'A';
            checkAadhaarEidDropdown.dispatchEvent(changeEvent);
        }

        const yRadio = document.getElementById('y');
        const nRadio = document.getElementById('n');
        if (yRadio && nRadio) {
            yRadio.checked = true;
            nRadio.checked = false;
            yRadio.dispatchEvent(changeEvent);
        }

        // --- Dynamic Dropdown Population and Selection ---
        const category = document.getElementById('cat_applicant').value;
        // Make sure this selector is robust. If the hidden input might not be present or named differently,
        // you might need to determine citizen status from 'add_comm' or other logic.
        const citizenElement = document.querySelector('input[name="citizen"]');
        const citizen = citizenElement ? citizenElement.value : 'INDIAN'; // Default to INDIAN if not found

        console.log("Step 3: Initiating AJAX calls for dependent dropdowns. Category:", category, "Citizen:", citizen);

        function populateAndSelectDropdown(dropdownId, url, dataKey) {
            $.ajax({
                type: "POST",
                url: url,
                data: "cat_applicant=" + category + "&citizen=" + citizen,
                success: function(ajaxData) {
                    console.log(`AJAX success for ${dropdownId}. Raw data:`, ajaxData);
                    const dropdownElement = document.getElementById(dropdownId);
                    if (!dropdownElement) {
                        console.error(`Error: Dropdown element with ID '${dropdownId}' not found.`);
                        return;
                    }
                    $(dropdownElement).find('option').remove();
                    $(dropdownElement).append($('<option/>').val("0").text("Please Select"));

                    if (ajaxData) {
                        let items = ajaxData;
                        items = items.substring(1, items.length - 1);
                        const arrayValue = items.split(',');
                        console.log(`Parsed options for ${dropdownId}:`, arrayValue);

                        for (let j = 0; j < arrayValue.length; j++) {
                            const trimmedOption = $.trim(arrayValue[j]);
                            $(dropdownElement).append($('<option/>').text(trimmedOption));
                        }
                    }

                    console.log(`Attempting to select ${dropdownId} with value:`, data[dataKey]);
                    let selected = false;
                    for (let i = 0; i < dropdownElement.options.length; i++) {
                        const optionText = dropdownElement.options[i].text.trim();
                        console.log(`  Comparing ${dropdownId} option: "${optionText}" with data: "${data[dataKey]}"`);
                        if (optionText === data[dataKey]) {
                            dropdownElement.options[i].selected = true;
                            dropdownElement.dispatchEvent(changeEvent);
                            console.log(`Successfully selected ${dropdownId}:`, data[dataKey]);
                            selected = true;
                            break;
                        }
                    }
                    if (!selected) {
                        console.warn(`Could not find matching option for ${dropdownId}: "${data[dataKey]}"`);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.error(`Error fetching options for ${dropdownId}. Status:`, textStatus, "Error:", errorThrown, "Response:", jqXHR.responseText);
                }
            });
        }

        populateAndSelectDropdown('proof_id', 'POID.html', 'identity_proof');
        populateAndSelectDropdown('proof_add', 'POR.html', 'address_proof');
        populateAndSelectDropdown('proof_dob', 'DOB.html', 'birth_date_proof');

    });
});