const parallax = document.getElementById("parallax");

window.addEventListener("scroll", function () {
  let offset =  window.pageYOffset;
  parallax.style.backgroundPositionY = offset * 1 + 'px';
});

var sidemenu = document.getElementById("media-header");

function openmenu(){
    sidemenu.style.right = "0";
}
function closemenu(){
    sidemenu.style.right = "-200px";
}