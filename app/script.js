let words = [
    "remind me Monday:",
    "remind me Tuesday:",
    "remind me Wednesday:",
    "remind me Thursday:",
    "remind me Friday:",
    "remind me Saturday:",
    "remind me Sunday:",
    "remind me next Monday:",
    "remind me next Tuesday:",
    "remind me next Wednesday:",
    "remind me next Thursday:",
    "remind me next Friday:",
    "remind me next Saturday:",
    "remind me next Sunday:",
    "remind me next week:",
    "remind me in two weeks:",
    "remind me next month:",
    "remind me next quarter:",
    "remind me on YYYY-MM-DD@hh:mm:"
  ];
  words.sort();
  let input = document.getElementById("input");
  let suggestion = document.getElementById("suggestion");
  //Enter key code
  const enterKey = 13;
  const tabKey = 9;
  
  window.onload = () => {
    input.value = "";
    clearSuggestion();
  };
  
  const clearSuggestion = () => {
    suggestion.innerHTML = "";
  };
  
  const caseCheck = (word) => {
    //Array of characters
    word = word.split("");
    let inp = input.value;
    //loop through every character in ino
    for (let i in inp) {
      //if input character matches with character in word no need to change
      if (inp[i] == word[i]) {
        continue;
      } else if (inp[i].toUpperCase() == word[i]) {
        //if inp[i] when converted to uppercase matches word[i] it means word[i] needs to be lowercase
        word.splice(i, 1, word[i].toLowerCase());
      } else {
        //word[i] needs to be uppercase
        word.splice(i, 1, word[i].toUpperCase());
      }
    }
    //array to string
    return word.join("");
  };
  
  //Execute function on input
  input.addEventListener("input", (e) => {
    clearSuggestion();
    //Convert input value to regex since string.startsWith() is case sensitive
    let regex = new RegExp("^" + input.value, "i");
    //loop through words array
    for (let i in words) {
      //check if input matches with any word in words array
      if (regex.test(words[i]) && input.value != "") {
        //Change case of word in words array according to user input
        words[i] = caseCheck(words[i]);
        //display suggestion
        suggestion.innerHTML = words[i];
        break;
      }
    }
  });
  
  //Complete predictive text on enter key
  input.addEventListener("keydown", (e) => {
    //When user presses enter and suggestion exists
    if (e.keyCode == tabKey && suggestion.innerText != "") {
      console.log("Input string = sdfsdfsd")
      e.preventDefault();
      input.value = suggestion.innerText;
      clearSuggestion();
    }

    if (e.keyCode == enterKey){
      input.value = ""
    }
  });
