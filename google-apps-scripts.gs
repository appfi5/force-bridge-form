function doPost(e) {
  const jsonString = e.postData.contents;
  const data = JSON.parse(jsonString);
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([new Date().toISOString(), data.service, data.walletAddress, data.additionalNotes]);
  
  return ContentService.createTextOutput(JSON.stringify({"result":"success"}))
    .setMimeType(ContentService.MimeType.JSON);
}