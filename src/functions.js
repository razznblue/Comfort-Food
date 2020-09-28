const numbers = "0123456789";
const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP";
const characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP";

export const functions = {
  calculateAccountNumber() {
    let id = "";
    const bankID = "0010";
    for (let i = 0; i < 7; i++) {
      let selectedNumber = numbers.charAt(
        Math.floor(Math.random() * numbers.length)
      );
      id += selectedNumber;
    }
    const finalID = bankID + "-" + id;
    return finalID;
  },

  calculateMemberID() {
    let id = "";
    for (let i = 0; i < 6; i++) {
      let selectedNumber = numbers.charAt(
        Math.floor(Math.random() * numbers.length)
      );
      id += selectedNumber;
    }
    id = id + "-";
    for (let i = 0; i < numbers.length; i++) {
      let selectedCharacter = characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
      id += selectedCharacter;
    }
    return id;
  },

  calculateTransactionID() {
    let id = "";
    id += letters.charAt(Math.floor(Math.random() * letters.length));
    id += "-";
    for (let i = 0; i < 4; i++) {
      let selectedNumber = numbers.charAt(
        Math.floor(Math.random() * numbers.length)
      );
      id += selectedNumber;
    }
    for (let i = 0; i < 4; i++) {
      let selectedNumber = characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
      id += selectedNumber;
    }
    return id;
  },

  getDateToday() {
    var currentdate = new Date();
    //prettier-ignore
    var dateTime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    return dateTime;
  },
};
