if (document.URL.includes('efasttech.in')) {
     let storArray = {
          applicant_category: document.getElementById('applicant_category')?.innerText.trim(),
          last_name: document.getElementById('last_name')?.innerText.trim(),
          first_name: document.getElementById('first_name')?.innerText.trim(),
          middle_name: document.getElementById('middle_name')?.innerText.trim(),
          name_on_card: document.getElementById('name_on_card')?.innerText.trim(),
          aadhaar_name: document.getElementById('aadhaar_name')?.innerText.trim(),
          aadhaar_number: document.getElementById('aadhaar_number')?.innerText.trim(),
          gender: document.getElementById('gender')?.innerText.trim(),
          dob: document.getElementById('dob')?.innerText.trim(),
          father_last_name: document.getElementById('father_last_name')?.innerText.trim(),
          father_first_name: document.getElementById('father_first_name')?.innerText.trim(),
          father_middle_name: document.getElementById('father_middle_name')?.innerText.trim(),
          resi_flat_no: document.getElementById('resi_flat_no')?.innerText.trim(),
          resi_pincode: document.getElementById('resi_pincode')?.innerText.trim(),
          resi_premises: document.getElementById('resi_premises')?.innerText.trim(),
          resi_taluka: document.getElementById('resi_taluka')?.innerText.trim(),
          resi_district: document.getElementById('resi_district')?.innerText.trim(),
          resi_state: document.getElementById('resi_state')?.innerText.trim(),
          std_code: document.getElementById('std_code')?.innerText.trim(),
          mobile_number: document.getElementById('mobile_number')?.innerText.trim(),
          email: document.getElementById('email')?.innerText.trim(),
          dispatch_state: document.getElementById('dispatch_state_id')?.innerText.trim(),
          city_name: document.getElementById('city_name')?.innerText.trim(),
          ward_name: document.getElementById('ward_name')?.innerText.trim(),
          area_code: document.getElementById('area_code')?.innerText.trim(),
          ao_type: document.getElementById('ao_type')?.innerText.trim(),
          range_code: document.getElementById('range_code')?.innerText.trim(),
          ao_no: document.getElementById('ao_no')?.innerText.trim(),
          identity_proof: document.getElementById('identity_proof')?.innerText.trim(),
          address_proof: document.getElementById('address_proof')?.innerText.trim(),
          birth_date_proof: document.getElementById('birth_date_proof')?.innerText.trim()
     };
     chrome.storage.local.set({ 'formData': storArray }, function () {
         alert('Data copied successfully');
     });
} else {
     console.log('No Accessible');
}
