const card = document.querySelector(".card");
console.log(card);
let draggedCard = null;

card.addEventListener("dragstart", function () {
  draggedCard = card;
});
const dropBox = document.querySelector(".dropbox");
dropBox.innerHTML = "";

dropBox.addEventListener("dragover", function (e) {
  e.preventDefault();
});

dropBox.addEventListener("drop", function () {
  const clone = draggedCard;
  clone.classList.remove("flip");
  clone.addEventListener("click", function () {
    clone.classList.toggle("flip");
  });
  dropBox.appendChild(clone);
});