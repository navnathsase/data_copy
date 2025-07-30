
chrome.storage.local.get('formData', function (storageData) {
     console.log(storageData);

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
