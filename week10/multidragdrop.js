const myCards = [
  { id: 1, name: "Queen", src: "queen.png" },
  { id: 2, name: "King", src: "king.png" },
  { id: 3, name: "Jack", src: "jack.png" },
];

let cardComposition = "";

for (let i = 0; i < myCards.length; i++) {
  cardComposition += `
<div class="card-container">
        <div class="card" draggable="true">
          <div class="card-face"><img src="cloud.png" alt="Back" /></div>
          <div class="card-face flip">
            <img src="${myCards[i].src}" alt="${myCards[i].name}" class="card-front" />
          </div>
        </div>
      </div>
`;
  console.log(cardComposition);
}

const deck = document.querySelector(".deck");
deck.innerHTML = "";
deck.innerHTML = cardComposition;

const cards = document.querySelectorAll(".card");
console.log(cards);

let draggedCard = null;

const dropBox = document.querySelector(".dropbox");
dropBox.innerHTML = "";
for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener("dragstart", function () {
    draggedCard = cards[i];
    dropBox.innerHTML = "";
  });
}

dropBox.addEventListener("dragover", function (e) {
  e.preventDefault();
});

dropBox.addEventListener("drop", function () {
  if (draggedCard && !dropBox.querySelector(".card")) {
    // const clone = draggedCard.cloneNode(true);
    const clone = draggedCard;
    clone.classList.remove("flip");
    clone.addEventListener("click", function () {
      clone.classList.toggle("flip");
    });
    dropBox.appendChild(clone);
  }
});