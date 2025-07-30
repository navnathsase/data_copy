function doContent() {
     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.scripting.executeScript({
               target: { tabId: tabs[0].id },
               files: ['copy_form.js']
          });
     });
}


function doTarget() {
     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.scripting.executeScript({
               target: { tabId: tabs[0].id },
               files: ['paste_form.js']
          });
     });
}

function doCorrectionCopy() {
     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.scripting.executeScript({
               target: { tabId: tabs[0].id },
               files: ['correction_copy.js']
          });
     });
}

function doCorrectionPastName() {
     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.scripting.executeScript({
               target: { tabId: tabs[0].id },
               files: ['correction_paste_name.js']
          });
     });
}

function doCorrectionPasteAll() {
     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.scripting.executeScript({
               target: { tabId: tabs[0].id },
               files: ['correction_paste_all.js']
          });
     });
}

function doNewSteelCopy() {
     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.scripting.executeScript({
               target: { tabId: tabs[0].id },
               files: ['steel_new_copy.js']
          });
     });
}

function doNewSteelPaste() {
     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.scripting.executeScript({
               target: { tabId: tabs[0].id },
               files: ['steel_new_paste.js']
          });
     });
}

function doCorrectionSteelCopy() {
     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.scripting.executeScript({
               target: { tabId: tabs[0].id },
               files: ['steel_correction_copy.js']
          });
     });
}

function doCorrectionSteelPaste() {
     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.scripting.executeScript({
               target: { tabId: tabs[0].id },
               files: ['steel_correction_paste.js']
          });
     });
}

document.getElementById('btnSource').onclick = doContent;
document.getElementById('btnTarget').onclick = doTarget;
document.getElementById('btnCorrectionCopy').onclick = doCorrectionCopy;
document.getElementById('btnCorrectionPastName').onclick = doCorrectionPastName;
document.getElementById('btnCorrectionPasteAll').onclick = doCorrectionPasteAll;
document.getElementById('btnNewSteelCopy').onclick = doNewSteelCopy;
document.getElementById('btnNewSteelPaste').onclick = doNewSteelPaste;
document.getElementById('btnCorrectionSteelCopy').onclick = doCorrectionSteelCopy;
document.getElementById('btnCorrectionSteelPaste').onclick = doCorrectionSteelPaste;