// Get saved data from Chrome local storage
chrome.storage.local.get('steelCorrectionData', function (data) {
     if (!data || !data.steelCorrectionData) {
          console.warn('No data found in form2correctionStorage.');
          return;
     }

     var iframe = document.getElementById('content');
     if (!iframe || !iframe.contentWindow || !iframe.contentWindow.document) {
          console.error('Iframe or its content not accessible.');
          return;
     }

     var formDoc = iframe.contentWindow.document;
     var changeEvent = new Event('change');
     var storage = data.steelCorrectionData;

     let titleCode = '4';
     if (storage.src_title.includes('Smt')) {
          titleCode = '2';
     } else if (storage.src_title.includes('Shri')) {
          titleCode = '1';
     } else if (storage.src_title.includes('Kumari')) {
          titleCode = '3';
     }

     let genderCode = 'T';
     if (storage.gender == 'Male') genderCode = 'M';
     else if (storage.gender == 'Female') genderCode = 'F';

     // Set static fields
     formDoc.getElementById('TxtNUM_OF_SUPP_DOCU').value = '2';
     formDoc.getElementById('TxtPan_Prf_flg').value = 'C';
     formDoc.getElementById('TxtPan_Prf_flg').dispatchEvent(changeEvent);

     formDoc.getElementById('TxtNAME_CHG_RQST_FLG').value = 'Y';
     formDoc.getElementById('TxtNAME_CHG_RQST_FLG').dispatchEvent(changeEvent);

     formDoc.getElementById('TxtUPDT_DOB_FLAG').value = 'Y';
     formDoc.getElementById('TxtUPDT_DOB_FLAG').dispatchEvent(changeEvent);

     formDoc.getElementById('TxtUPDT_SEX_FLG').value = 'Y';
     formDoc.getElementById('TxtUPDT_SEX_FLG').dispatchEvent(changeEvent);

     formDoc.getElementById('TxtUPDT_ADD_COMMU_FLG').value = 'Y';
     formDoc.getElementById('TxtUPDT_ADD_COMMU_FLG').dispatchEvent(changeEvent);

     formDoc.getElementById('TxtFATHER_NAME_CHG_RQST_FLG').value = 'Y';
     formDoc.getElementById('TxtFATHER_NAME_CHG_RQST_FLG').dispatchEvent(changeEvent);

     // Set title dropdown
     formDoc.getElementById('TxtDDLApp_tlt').value = titleCode;
     formDoc.getElementById('TxtDDLApp_tlt').dispatchEvent(changeEvent);

     // Fill address fields
     formDoc.getElementById('TxtR_DNO').value = storage.resi_flat_no;
     formDoc.getElementById('TxtR_Vill').value = storage.resi_premises;
     formDoc.getElementById('TxtR_STRT').value = storage.src_rroad;
     formDoc.getElementById('TxtR_AREA').value = storage.resi_taluka;
     formDoc.getElementById('TxtR_City_CNT').value = storage.resi_district;

     // Fix state name if needed
     if (storage.src_onlystate === 'Odisha') {
          storage.src_onlystate = 'ORISSA';
     }

     // Set state dropdown by matching text
     let stateDropdown = formDoc.getElementById('TxtDDLR_State');
     for (let i = 0; i < stateDropdown.options.length; i++) {
          if (stateDropdown.options[i].text == storage.resi_state.toUpperCase()) {
               stateDropdown.selectedIndex = i;
               break;
          }
     }
     stateDropdown.dispatchEvent(changeEvent);

     // Remaining fields
     formDoc.getElementById('TxtR_Pin').value = storage.resi_pincode;
     formDoc.getElementById('TxtSTD_Code').value = '91';
     formDoc.getElementById('TxtEMAIL').value = storage.email;
     formDoc.getElementById('TxtAPP_DOB_AADHAAR').value = storage.dob;

     formDoc.getElementById('DDLAPP_GEN_AADHAAR').value = genderCode;
     formDoc.getElementById('DDLAPP_GEN_AADHAAR').dispatchEvent(changeEvent);

     formDoc.getElementById('TxAADHAAR_EID').value = storage.aadhaar_number;

     formDoc.getElementById('TxtVerf_name').value = '';
     formDoc.getElementById('TxtPlac_verif').value = '';
});
