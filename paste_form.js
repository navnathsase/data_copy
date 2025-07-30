// paste_form.js

// Try to access jQuery from the window object.
// This is the safest way to ensure it's available in your isolated world
// if the page itself has loaded it.
if (typeof jQuery === 'undefined' || typeof $ === 'undefined') {
    // If jQuery is not defined, this means it hasn't loaded yet or isn't accessible.
    // For a content script, you might need to wait for the page to load it,
    // or inject your own copy.
    console.error("jQuery is not defined in content script's isolated world. Trying to inject or wait.");

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

     document.getElementById('cat_applicant').value = data.applicant_category;
     document.getElementById('cat_applicant').dispatchEvent(changeEvent);
    
     document.getElementById('l_name').value = data.last_name;
     document.getElementById('f_name').value = data.first_name;
     document.getElementById('m_name').value = data.middle_name;
     document.getElementById('name_card').value = data.name_on_card;
    
     document.getElementById('fal_name').value = data.father_last_name;
     document.getElementById('faf_name').value = data.father_first_name;
     document.getElementById('fam_name').value = data.father_middle_name;

     document.getElementById('opaMotherLastName').value = '';
     document.getElementById('opaMotherFirstName').value = '';
     document.getElementById('opaMotherMiddleName').value = '';

     document.getElementById('dob').value = data.dob;
     document.getElementById('tel_num_isdcode').value = data.std_code;
     document.getElementById('tel_num').value = data.mobile_number;
     document.getElementById('email_id').value = data.email;

     document.getElementById('name_aadhaar').value = data.aadhaar_name;
     document.getElementById('aadhaarNo').value = data.aadhaar_number;
     document.getElementById('aadhaarNo').dispatchEvent(changeEvent);
    
     document.getElementById('gender').value = data.gender;
     document.getElementById('gender').dispatchEvent(changeEvent);
   

     const stateDropdown = document.getElementById('user_state');
     for (let i = 0; i < stateDropdown.options.length; i++) {
          if (stateDropdown.options[i].text.trim() === data.resi_state) {
               stateDropdown.options[i].selected = true;
               break;
          }
     }
     stateDropdown.dispatchEvent(changeEvent);
    
     document.getElementById('area_code').value = data.area_code;
     document.getElementById('ao_type').value = data.ao_type;
     document.getElementById('range_code').value = data.range_code;
     document.getElementById('ao_num').value = data.ao_no;
     document.getElementById('aoSelection').checked = true;
    
     const proofIdDropdown = document.getElementById('proof_id');
     for (let i = 0; i < proofIdDropdown.options.length; i++) {
          if (proofIdDropdown.options[i].text.trim() == data.identity_proof) {
               proofIdDropdown.options[i].selected = true;
               break;
          }
     }
  
     document.getElementById('ra_add').value = 'INDIAN'; 
    document.getElementById('add_comm').value = 'INDIAN'; 
     document.getElementById('ra_add').dispatchEvent(changeEvent);

     document.getElementById('pincode').value = data.resi_pincode;
  
     document.getElementById('check_aadhaar_eid').value = 'A'; 
     document.getElementById('check_aadhaar_eid').dispatchEvent(changeEvent);
});
