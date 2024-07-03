//Sticky
window.onscroll = function () {
  var header = document.querySelector("header");
  if (window.pageYOffset > 0) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
};

var copy = document.querySelector(".logos-slide").cloneNode(true);
document.querySelector(".logos").appendChild(copy);
