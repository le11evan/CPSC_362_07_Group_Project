const texts = [
  "The #1 Bathroom Review Website, Flushy",
  "Urgent need for the restroom?",
  "No fear! Just use Flushy!",
];

let count = 0;
let index = 0;
let currentText = "";
let letter = "";

// Invoking this function
(function type() {
  if (count === texts.length) {
    // Compare count to length of texts array
    count = 0;
  }
  currentText = texts[count];
  letter = currentText.slice(0, ++index); // Adding each character of each word in texts[] to the letter variable

  document.querySelector(".typing").textContent = letter;
  if (letter.length === currentText.length) {
    // Reaching max length of current string
    count++;
    index = 0;
  }

  setTimeout(type, 300); // This function will be invoked every 100 milliseconds
})();
