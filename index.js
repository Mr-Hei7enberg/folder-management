/**
 * createFolder() создает новую папку из названия в столбце folder name.
 * downloadData() выгружает названия и id подпапок главной папки.
 * @param {string} ID id главной папки.
 */
 
// 1. Создайте простую таблицу.
// 2. Скопируйте в переменную ID переменную вашей главной папки.
// 3. С помощью функции downloadData() загрузите в таблицу данные о вложенных папках.
// 4. Чтобы создать папку напишите название папки в столбике folder name и запустите функцию createFolder().
 
let ID = "<id вашей папки>";

function createFolder() {
  let mainFolder = DriveApp.getFolderById(ID);
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  let foldersNames = sheet.getRange(2, 1, sheet.getLastRow(), 3).getValues();
  let folders = mainFolder.getFolders();
  let arr = [];

  while (folders.hasNext()) {
    let folder = folders.next();
    arr.push({
      "name": folder.getName(),
      "folderID": folder.getId(),
      "lastUpdated": folder.getLastUpdated()
    })
  }

  let res = arr.map(item => item.name);

  foldersNames.forEach((el, index) => {
    if (typeof el[0] === "string" && res.indexOf(el[0]) === -1 && el[0] != "") {
      let nFolder = mainFolder.createFolder(el[0]);
      sheet.getRange(index + 2, 2, 1, 2).setValues([[nFolder.getId(), nFolder.getLastUpdated()]]);
console.log(`New folder created! 
name: ${el[0]}
creation date: ${nFolder.getLastUpdated()}
`)
    }
  })
}

function downloadData() {
  let mainFolder = DriveApp.getFolderById(ID);
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  let foldersNames = sheet.getRange(2, 1, sheet.getLastRow(), 3).getValues().map(item => item[0]);
  let folders = mainFolder.getFolders();
  let arr = [];

  while (folders.hasNext()) {
    let folder = folders.next();
    arr.push({
      "name": folder.getName(),
      "folderID": folder.getId(),
      "lastUpdated": folder.getLastUpdated()
    })
  }

  arr.forEach(el => {
    if (foldersNames.indexOf(el.name) === -1 && foldersNames.indexOf(el.folderID) === -1) {
      sheet.getRange(sheet.getLastRow() + 1, 1, 1, 3).setValues([[el.name, el.folderID, el.lastUpdated]]);
    }
  })
  console.log(arr)
}
