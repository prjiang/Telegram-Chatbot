function doPost(e){
  var estringa = JSON.parse(e.postData.contents);
  var payload = identificar(estringa);
  var data = {
    "method": "post",
    "payload": payload
  }
  /* 這段會用可以解開註解
  var d = new Date();
  var SpreadSheet = SpreadsheetApp.openById("1n6iAtxDLhT_ILzpez6vQ4U0l8w9IRXrUAYS6ZPOgaMM");
  var Sheet = SpreadSheet.getSheetByName("紀錄收到的訊息");
  var LastRow = Sheet.getLastRow();
  Sheet.getRange(LastRow+1, 1).setValue(d);  
  Sheet.getRange(LastRow+1, 2).setValue(estringa);
  //*/
  UrlFetchApp.fetch("https://api.telegram.org/bot1099141034:AAFQuY3cNRX2lvSRW1TnBDPMdZCyX8NGfPE/", data);
}

function identificar(e){
  if (e.message.text){
    var mensaje = {
      "method": "sendMessage",
      "chat_id": String(e.message.chat.id),
      "text": e.message.text,
    } 
  }
  else if (e.message.sticker){
    var mensaje = {
      "method": "sendSticker",
      "chat_id": String(e.message.chat.id),
      "sticker": e.message.sticker.file_id
    }
   }
  else if (e.message.photo){
    var array = e.message.photo;
    var text = array[1];
    var mensaje = {
      "method": "sendPhoto",
      "chat_id": String(e.message.chat.id),
      "photo": text.file_id
    }
   }
    else {
    var mensaje = {
      "method": "sendMessage",
      "chat_id": String(e.message.chat.id),
      "text": "Try other stuff"
    }
   }
  console.log(String(e.message.chat.id))
  return mensaje
}