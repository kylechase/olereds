// ============================================================
// Google Apps Script — paste this into a new Apps Script project
// ============================================================
//
// SETUP INSTRUCTIONS:
//
// 1. Go to https://script.google.com and click "New project"
// 2. Delete the default code and paste this entire file
// 3. Update the EMAIL_ADDRESS variable below with your email
// 4. Click "Deploy" > "New deployment"
//    - Type: "Web app"
//    - Execute as: "Me"
//    - Who has access: "Anyone"
// 5. Click "Deploy" and authorize the app when prompted
// 6. Copy the Web app URL
// 7. Paste the URL into src/pages/index.astro where it says
//    GOOGLE_APPS_SCRIPT_URL (search for it)
//
// The script will automatically create a "Form Submissions"
// spreadsheet in your Google Drive on the first submission.
// ============================================================

const EMAIL_ADDRESS = 'your-email@example.com'; // <-- CHANGE THIS

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Open or create the spreadsheet
    const ss = getOrCreateSpreadsheet();
    const sheet = ss.getSheetByName('Submissions') || ss.insertSheet('Submissions');

    // Add headers if the sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Name',
        'Email',
        'Phone',
        'Address',
        'Best Time to Contact',
        'Additional Details'
      ]);
      sheet.getRange(1, 1, 1, 7).setFontWeight('bold');
    }

    // Append the form data
    sheet.appendRow([
      new Date().toLocaleString(),
      data.name,
      data.email,
      data.phone,
      data.address,
      data.contactTime,
      data.details
    ]);

    // Send email notification
    const subject = 'New Quote Request — Ole Reds Commercial Cleaning';
    const body = [
      'New quote request received:',
      '',
      'Name: ' + data.name,
      'Email: ' + data.email,
      'Phone: ' + data.phone,
      'Address: ' + data.address,
      'Best Time to Contact: ' + data.contactTime,
      '',
      'Additional Details and Information:',
      data.details || 'None',
      '',
      'Submitted: ' + new Date().toLocaleString()
    ].join('\n');

    MailApp.sendEmail(EMAIL_ADDRESS, subject, body);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSpreadsheet() {
  const files = DriveApp.getFilesByName('Ole Reds — Form Submissions');
  if (files.hasNext()) {
    return SpreadsheetApp.open(files.next());
  }
  return SpreadsheetApp.create('Ole Reds — Form Submissions');
}
