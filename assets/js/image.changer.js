var bathroom_images = [
  "../../images/bathroom-background.png",
  "../../images/bathroom-reload-1.jpg",
  "../../images/bathroom-reload-2.jpg",
  "../../images/bathroom-reload-3.jpg",
  "../../images/bathroom-reload-4.jpg",
  "../../images/bathroom-reload-5.jpg",
  "../../images/bathroom-reload-6.jpg",
];

var img = document.getElementById("top");
// var background = document.getElementById();
function imgDisp(num) {
  console.log("New Image made!");
  var num = Math.floor(Math.random() * 6);
  img.style.backgroundImage =
    'linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 02)), url("' +
    bathroom_images[num] +
    '")';
  img.style.backgroundRepeat = "no-repeat";
}

imgDisp();
