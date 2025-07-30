
chrome.storage.local.get('correctionFormData', function (storageData) {
     const data = storageData.correctionFormData;     
     console.log(data);  
   
     document.getElementById('pan').value = data.pan_number;

     document.getElementById('category').value = data.applicant_category;
     const changeEvent = new Event('change');
     document.getElementById('category').dispatchEvent(changeEvent);
    
     document.getElementById('lastName').value = data.last_name;
     document.getElementById('firstName').value = data.first_name;
     document.getElementById('middleName').value = data.middle_name;
    
     document.getElementById('nameOnCard').value = data.name_on_card;

     document.getElementById('fatherlastName').value = data.father_last_name;
     document.getElementById('fatherfirstName').value = data.father_first_name;
     document.getElementById('fathermiddleName').value = data.father_middle_name;

     document.getElementById('opaMotherLastName').value = '';
     document.getElementById('opaMotherFirstName').value = '';
     document.getElementById('opaMotherMiddleName').value = '';
     
     document.getElementById('crSubmitBtn').click();
    
     document.getElementById('acceptSubmit').onclick == function () {
          console.log('accept clicked');
     };
});
