/*Here is where i've placed the list of all my sticker image filenames. 
I used `const` because this list of sticker names won't ever change.*/
const stickers = [
  "bearsticker.png",
  "blackfish.png",
  "bluepansy.png",
  "britneyspear.png",
  "butterfly.png",
  "carebear.png",
  "CD.png",
  "CDplayer.png",
  "cherrybow.png",
  "clueless.png",
  "diary.png",
  "fishbowl.png",
  "girltalkbook.png",
  "glitterbutterfly.png",
  "glitterstar.png",
  "goldfish.png",
  "goldstar.png",
  "hellokittysurf.png",
  "hotpinkflower.png",
  "key.png",
  "lepoardkitty.png",
  "lips.png",
  "lovebug.png",
  "orangehibiscus.png",
  "Parishilton.png",
  "patchbutterfly.png",
  "pinkhibiscus.png",
  "pinklily.png",
  "pinkorchid.png",
  "pinkpansy.png",
  "pinkprada.png",
  "poolball.png",
  "rainbowcatapillar.png",
  "rainbowheart.png",
  "redflower.png",
  "reginageorge.png",
  "ribbon.png",
  "shycat.png",
  "silverstar.png",
  "suitelife.png",
  "tamagotchi.png",
  "telephone.png",
  "tropicalflower.png",
  "twins.png",
  "unicorn.png",
  "y2kcamera.png",
  "y2kphone.png",
  "yellowflower.png",
];

/* I then grabbed my main HTML elements, the "stickerTray" and the "canvas",
so I can work with them in my JavaScript code.*/
const stickerTray = document.getElementById("stickerTray");
const canvas = document.getElementById("canvas");

/* I've set up two variables using "let" because their values will,
change during the program. "draggedItem" will hold the sticker I'm currently dragging whereas,
"selectedItem" will keep track of which item on the canvas is currently active.
I'm starting them as null for now.*/
let draggedItem = null;
let selectedItem = null;

// --- MY SELECTION METHOD! ---

// This makes sure that only one item can be selected at a time.
function selectItem(item) {
  // First, I check if I already have something selected.
  if (selectedItem) {
    // If I do, I'll remove the "selected" CSS class from it to take away its blue outline.
    selectedItem.classList.remove("selected");
  }

  // Now, I update my main "selectedItem" to be the new item I passed into the function.
  selectedItem = item;

  // Finally, if the new "selectedItem" is a real item (and not null)
  if (selectedItem) {
    // I'll add the "selected" class to give it the blue outline.
    selectedItem.classList.add("selected");
  }
}

/* I want to be able to deselect an item by clicking on the empty canvas,
so I added a click listener to the whole canvas area. */
canvas.addEventListener("click", (e) => {
  // "evt.target" tells me exactly what I clicked.
  // https://developer.mozilla.org/en-US/docs/Web/API/Event/target
  // https://www.w3schools.com/JQuery/event_target.asp
  /* If the thing I clicked is the canvas itself (and not a sticker on top of it),
 I'll call my "selectItem" function with null to clear the selection. */
  if (evt.target === canvas) {
    selectItem(null);
  }
});

// Now I'm going through my "stickers" list, one by one.
stickers.forEach((src) => {
  // For each sticker name, I create a new <img> element. instead of creating it on the html.
  const img = document.createElement("img");
  // I tell the image where to find its picture.
  img.src = `stickers/${src}`;
  // Making the image draggable.
  img.draggable = true;

  /* When I start dragging an image from the sidebar,
  I make a copy of it. This way, the original stays in the sidebar. */
  img.addEventListener("dragstart", () => {
    draggedItem = img.cloneNode(true);
    // I give the copy a CSS class so I can style it on the canvas.
    draggedItem.classList.add("canvas-item");
    // I need to keep track of its rotation, so I'll store it in the element's dataset and start it at 0.
    draggedItem.dataset.angle = 0;
  });

  // I add the image to the sticker tray so it actually appears on the page with appendChild.
  stickerTray.appendChild(img);
});

/* For drag and drop to work, I have to tell the browser that the canvas can accept dropped items,
and "e.preventDefault()" does exactly that. https://www.w3schools.com/jsref/event_defaultprevented.asp */
canvas.addEventListener("dragover", (e) => e.preventDefault());

// When I actually drop a sticker on the canvas, this code runs.
canvas.addEventListener("drop", (e) => {
  // If I'm not actually dragging an item, I'll just stop.
  if (!draggedItem) return;

  // I get the canvas's position so I can place the sticker exactly where my mouse is.
  // https://www.w3schools.com/jsref/event_clientx.asp
  // https://www.w3schools.com/jsref/event_clienty.asp
  const canvasRect = canvas.getBoundingClientRect();
  draggedItem.style.left = e.clientX - canvasRect.left + "px";
  draggedItem.style.top = e.clientY - canvasRect.top + "px";

  // Now I add the dropped sticker to the canvas.
  canvas.appendChild(draggedItem);
  // Making it draggable inside the canvas.
  makeDraggable(draggedItem);
  // selecting it right away so it gets the blue outline.
  selectItem(draggedItem);

  // I reset "draggedItem" to null so I'm ready for the next drag.
  draggedItem = null;
});

// --- CODE FOR "Add Textbox" BUTTON ---

document.getElementById("addTextbox").addEventListener("click", () => {
  // I create a new <div> element to be my textbox.
  const box = document.createElement("div");
  box.className = "canvas-item textbox";
  box.contentEditable = false; // It shouldn't be editable until I double-click it.
  box.innerHTML = "Double-click to edit";
  box.dataset.angle = 0; // Textboxes need a rotation angle too

  // When I double-click the box, I make it editable and focus on it.
  box.addEventListener("dblclick", () => {
    box.contentEditable = true;
    box.focus();
  });

  // When I click away from an editable box, I make it non-editable again.
  // https://www.w3schools.com/jsref/event_onblur.asp
  box.addEventListener("blur", () => {
    box.contentEditable = false;
  });

  // I add the new textbox to my canvas, make it draggable, and select it immediately.
  canvas.appendChild(box);
  makeDraggable(box);
  selectItem(box);
});

// --- LOGIC FOR "Rotate" BUTTON ---

document.getElementById("rotateBtn").addEventListener("click", () => {
  // Fistly I check if I've actually selected an item. If not, I'll show a alert that will pop-up.
  if (!selectedItem) {
    alert("Please click on a sticker or textbox to select it first!");
    return;
  }
  // I get the item's current angle from its `dataset`. I use `parseFloat` to make sure it's a number.
  let angle = parseFloat(selectedItem.dataset.angle) || 0;
  // I add 15 degrees to the angle.
  angle += 15;
  // I save the new angle back to the element so I don't forget it.
  selectedItem.dataset.angle = angle;
  // Finally, I use a CSS "transform" to visually rotate the item.
  selectedItem.style.transform = `rotate(${angle}deg)`;
});

// Here's what happens when I click the "Save" button.
document.getElementById("saveBtn").addEventListener("click", () => {
  // To make sure the blue outline isn't in my saved image, I'll temporarily deselect the item.
  if (selectedItem) {
    selectedItem.classList.remove("selected");
  }

  // I'm using the 'html2canvas' library here to take a screenshot of my canvas `div`.
  html2canvas(canvas).then((canvasImage) => {
    // After the screenshot is taken, I'll re-select the item so the outline comes back.
    if (selectedItem) {
      selectedItem.classList.add("selected");
    }

    // To download the image, I create a temporary, invisible link.
    const link = document.createElement("a");
    link.download = "collage.png"; // This is the filename it will be saved as.
    link.href = canvasImage.toDataURL(); // This is the image data itself.
    link.click(); // I click the link with code to start the download.
  });
});

// This function helps makes any element draggable inside the canvas.
function makeDraggable(el) {
  let isDragging = false;
  let offsetX, offsetY;

  // I'm listening for when I press the mouse button down on an element.
  el.addEventListener("mousedown", (e) => {
    // If I'm editing a textbox, I shouldn't be able to drag it.
    if (el.isContentEditable) return;

    // "e.stopPropagation()" stops the click from also selecting the canvas. https://www.w3schools.com/jsref/event_onblur.asp
    // Without this, the canvas would think it was clicked and immediately deselect my item.
    e.stopPropagation();
    e.preventDefault();

    isDragging = true;

    // I calculate where I clicked inside the element so the drag feels natural.
    offsetX = e.clientX - el.getBoundingClientRect().left;
    offsetY = e.clientY - el.getBoundingClientRect().top;

    // As soon as I press down on an item, I want to select it.
    selectItem(el);

    // I bring the element to the front so it's on top of everything else while I drag it.
    el.style.zIndex = 1000;
  });

  // I listen for when I let go of the mouse button anywhere on the page.
  document.addEventListener("mouseup", () => {
    isDragging = false;
    if (el) el.style.zIndex = ""; // I reset its orginal layer so other items can come to the front.
  });

  // As long as I'm dragging, this will track my mouse's movement.
  document.addEventListener("mousemove", (e) => {
    // If I'm not dragging, I'll do nothing.
    if (!isDragging) return;

    const canvasRect = canvas.getBoundingClientRect();
    // I calculate the element's new position.
    let left = e.clientX - canvasRect.left - offsetX;
    let top = e.clientY - canvasRect.top - offsetY;

    // And finally, I apply the new position to the element.
    el.style.left = left + "px";
    el.style.top = top + "px";
  });
}
