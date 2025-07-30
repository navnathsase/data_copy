chrome.storage.local.get('steelNewFormData', function (data) {
     const contentFrame = document.getElementById('content');
     const changeEvent = new Event('change');
     const formData = data.steelNewFormData;

     let titleValue = '4'; 
     if (formData.src_title.includes('Smt')) {
          titleValue = '2';
     } else if (formData.src_title.includes('Shri')) {
          titleValue = '1';
     } else if (formData.src_title.includes('Kumari')) {
          titleValue = '3';
     }

     contentFrame.contentWindow.document.getElementById('TxtDDLApp_tlt').value = titleValue;
     contentFrame.contentWindow.document.getElementById('TxtDDLApp_tlt').dispatchEvent(changeEvent);

     let genderValue = 'T'; 
     if (formData.src_gender == 'Male') {
          genderValue = 'M';
     } else if (formData.src_gender == 'Female') {
          genderValue = 'F';
     }
     contentFrame.contentWindow.document.getElementById('TxtDDL_SEX').value = genderValue;
     contentFrame.contentWindow.document.getElementById('TxtDDL_SEX').dispatchEvent(changeEvent);

     contentFrame.contentWindow.document.getElementById('DDLParant_print_card').value = formData.name_on_card;
     contentFrame.contentWindow.document.getElementById('DDLParant_print_card').dispatchEvent(changeEvent);

     
     contentFrame.contentWindow.document.getElementById('TxtLastname_M').value = '';
     contentFrame.contentWindow.document.getElementById('TxtFirstname_M').value = '';
     contentFrame.contentWindow.document.getElementById('TxtMiddlename_M').value = '';
     
     contentFrame.contentWindow.document.getElementById('TxtR_DNO').value = formData.resi_flat_no;
     contentFrame.contentWindow.document.getElementById('TxtR_Vill').value = formData.resi_premises;
     contentFrame.contentWindow.document.getElementById('TxtR_STRT').value = '';
     contentFrame.contentWindow.document.getElementById('TxtR_AREA').value = formData.resi_taluka;
     contentFrame.contentWindow.document.getElementById('TxtR_City_CNT').value = formData.resi_district;
     contentFrame.contentWindow.document.getElementById('TxtR_Pin').value = formData.resi_pincode;
    
     contentFrame.contentWindow.document.getElementById('TxtDDLADD_FR_CMMNCAT').value = formData.src_addressCommunication;

     contentFrame.contentWindow.document.getElementById('TxtSTD_Code').value = '91';
     contentFrame.contentWindow.document.getElementById('TxtMOB_NO').value = formData.mobile;
     contentFrame.contentWindow.document.getElementById('TxtEMAIL').value = formData.email;
    
     contentFrame.contentWindow.document.getElementById('TxtAPP_DOB_AADHAAR').value = formData.dob;
     contentFrame.contentWindow.document.getElementById('DDLAPP_GEN_AADHAAR').value = genderValue;
     contentFrame.contentWindow.document.getElementById('DDLAPP_GEN_AADHAAR').dispatchEvent(changeEvent);
     contentFrame.contentWindow.document.getElementById('TxAADHAAR_EID').value = formData.aadhaar_number;

     contentFrame.contentWindow.document.getElementById('TxtVerf_name').value = '';
     contentFrame.contentWindow.document.getElementById('TxtPlac_verif').value = '';

     contentFrame.contentWindow.document.getElementById('TxtDDLANO_SUR_INC').value = 'H';
     contentFrame.contentWindow.document.getElementById('TxtDDLANO_SUR_INC').dispatchEvent(changeEvent);
});
