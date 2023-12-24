import {
  imgInput,
  insertBtn,
  customHeader,
  container,
} from "./src/utility/querySelectors.js";
import { createGrid } from "./src/utility/createGrid.js";
import { makeBlockResizableAndMovable } from "./src/utility/makeBlocksDynamic.js";
import { handleUtBtns } from "./src/utility/utBtns.js";

// insertBtn.addEventListener("click", () => {
//   const selectedElements = document.querySelectorAll(".selected");
//   const elements = [...selectedElements];
//   const containerPadding = parseInt(getComputedStyle(container).padding, 10);
//   const customHeaderBorderWidth = parseInt(
//     getComputedStyle(customHeader).borderLeft,
//     10
//   );

//   const imageHolder = document.createElement("div");
//   const img = document.createElement("img");

//   let startX = elements.at(0).getBoundingClientRect().left;
//   let endX = elements.at(-1).getBoundingClientRect().right;

//   const holderWidth = Number(endX) - Number(startX);

//   imageHolder.style.position = "absolute";
//   img.src = imgInput.value;
//   img.className = "banner-pic c-grab";

//   imageHolder.style.left = `${
//     startX - containerPadding - customHeaderBorderWidth
//   }px`;
//   imageHolder.style.width = `${holderWidth}px`;

//   customHeader.append(imageHolder);
//   imageHolder.append(img);

//   makeBlockResizableAndMovable(imageHolder);
// });

createGrid(1000);
handleUtBtns();
