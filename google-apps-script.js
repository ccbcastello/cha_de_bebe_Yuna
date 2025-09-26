// === Chá da Yuna - Google Apps Script API ===
// INSTRUCTIONS:
// 1. Open your Google Sheet.
// 2. Go to Extensions > Apps Script.
// 3. Delete any existing code in the editor.
// 4. Copy and paste ALL of the code from this file into the editor.
// 5. Click the "Save project" icon.
// 6. Click the "Deploy" button and select "New deployment".
// 7. In the "Select type" dialog, choose "Web app".
// 8. In the "Configuration" section:
//    - Give it a description (e.g., "Chá da Yuna API").
//    - For "Who has access", select "Anyone". **This is important!**
// 9. Click "Deploy".
// 10. In the "Authorization required" dialog, click "Authorize access".
// 11. Choose your Google account.
// 12. You might see a "Google hasn't verified this app" warning. Click "Advanced", then "Go to [Your Project Name] (unsafe)".
// 13. Click "Allow" to grant the script permission to access your spreadsheet.
// 14. A "Deployment successfully updated" dialog will appear. Copy the "Web app URL".
// 15. Paste this URL into the `SCRIPT_URL` constant in your `giftService.ts` file.

const ITEMS_SHEET_NAME = "Itens";
const RSVPS_SHEET_NAME = "Presencas";
const MESSAGES_SHEET_NAME = "Mensagens";

function doGet(e) {
  try {
    const action = e.parameter.action;

    if (action === 'getItems') {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ITEMS_SHEET_NAME);
      if (!sheet) return createJsonResponse({ error: `Sheet "${ITEMS_SHEET_NAME}" not found.` });

      const range = sheet.getDataRange();
      const values = range.getValues();
      const headers = values.shift(); // Remove header row

      const items = values.map(row => {
        const itemData = {};
        headers.forEach((header, index) => {
          itemData[header] = row[index];
        });

        // Ensure reservedBy is always an array
        const reservedBy = itemData['nome'] ? String(itemData['nome']).split(',').map(name => name.trim()).filter(Boolean) : [];
        
        return {
          name: itemData['item'],
          totalQuantity: parseInt(itemData['totalQuantity'], 10) || 0,
          reservedBy: reservedBy,
        };
      });
      
      return createJsonResponse(items);
    }
    
    return createJsonResponse({ error: 'Invalid action' });

  } catch (error) {
    return createJsonResponse({ error: 'An error occurred: ' + error.message });
  }
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000); // Wait up to 30 seconds for other processes to finish.

  try {
    const requestData = JSON.parse(e.postData.contents);
    const action = requestData.action;

    switch(action) {
      case 'reserveItem':
        return handleReserveItem(requestData);
      case 'confirmAttendance':
        return handleConfirmAttendance(requestData);
      case 'sendMessage':
        return handleSendMessage(requestData);
      default:
        return createJsonResponse({ success: false, error: 'Invalid action specified.' });
    }
  } catch (error) {
    return createJsonResponse({ success: false, error: 'Error processing request: ' + error.message });
  } finally {
    lock.releaseLock();
  }
}

function handleReserveItem(data) {
  const { itemName, reserverName } = data;
  if (!itemName || !reserverName) {
    return createJsonResponse({ success: false, error: 'Item name and reserver name are required.' });
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ITEMS_SHEET_NAME);
  const range = sheet.getDataRange();
  const values = range.getValues();
  const headers = values[0];
  const itemColIndex = headers.indexOf('item');
  const totalQtyColIndex = headers.indexOf('totalQuantity');
  const reservedByColIndex = headers.indexOf('nome');

  if (itemColIndex === -1 || totalQtyColIndex === -1 || reservedByColIndex === -1) {
    return createJsonResponse({ success: false, error: 'Sheet columns are not correctly named (item, totalQuantity, nome).' });
  }

  for (let i = 1; i < values.length; i++) {
    if (values[i][itemColIndex] === itemName) {
      const totalQuantity = parseInt(values[i][totalQtyColIndex], 10);
      const reservedByStr = values[i][reservedByColIndex] || '';
      const reservedByArr = reservedByStr ? reservedByStr.split(',').map(name => name.trim()) : [];

      if (reservedByArr.length >= totalQuantity) {
        return createJsonResponse({ success: false, error: 'This item is already fully reserved.' });
      }
      
      reservedByArr.push(reserverName);
      sheet.getRange(i + 1, reservedByColIndex + 1).setValue(reservedByArr.join(', '));
      
      return createJsonResponse({ success: true });
    }
  }

  return createJsonResponse({ success: false, error: 'Item not found.' });
}

function handleConfirmAttendance(data) {
  const { name, email, confirmation, guests } = data;
  if (!name || !email) {
    return createJsonResponse({ success: false, error: 'Name and email are required.' });
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(RSVPS_SHEET_NAME);
  // Using headers from your description: Nome, Email, Confirmação, Convidados
  sheet.appendRow([name, email, confirmation, guests]);
  
  return createJsonResponse({ success: true });
}

function handleSendMessage(data) {
  const { name, email, message } = data;
   if (!name || !email || !message) {
    return createJsonResponse({ success: false, error: 'Name, email, and message are required.' });
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(MESSAGES_SHEET_NAME);
  // Using headers from your description: Nome, Email, Mensagem, Data
  sheet.appendRow([name, email, message, new Date()]);

  return createJsonResponse({ success: true });
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
