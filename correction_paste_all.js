console.log('form1correctionother paste ran');

chrome.storage.local.get('correctionFormData', function (storageData) {
     const data = storageData.correctionFormData;
     const changeEvent = new Event('change');
   
     document.getElementById('nameOnCard').value = data.name_on_card;
     document.getElementById('dob').value = data.dob;
     document.getElementById('isd').value = data.std_code;
     document.getElementById('std').value = ''
     document.getElementById('telNum').value = data.mobile_number;
     document.getElementById('emailId').value = data.email;

     document.getElementById('add_comm').value = 'INDIAN';
     document.getElementById('add_comm').dispatchEvent(changeEvent);

     document.getElementById('check_aadhaar_eid').value = 'A';
     document.getElementById('check_aadhaar_eid').dispatchEvent(changeEvent);

     document.getElementById('name_aadhaar').value = data.aadhaar_name;
     document.getElementById('aadhaarNo').value = data.aadhaar_number;
     document.getElementById('aadhaarNo').dispatchEvent(changeEvent);
 
     const stateDropdown = document.getElementById('user_state');
     for (let i = 0; i < stateDropdown.options.length; i++) {
          if (stateDropdown.options[i].text == data.resi_state) {
               stateDropdown.options[i].selected = true;
               break;
          }
     }
     stateDropdown.dispatchEvent(changeEvent);
     document.getElementById('gender').value = data.gender;
});
