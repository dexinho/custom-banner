import { customHeader } from "./querySelectors.js";

export const createGrid = (density) => {
  if (density > 400) {
    alert("Insert density from 1 to 400!");
    return;
  }

  removeGrid();

  for (let i = 0; i < density; i++) {
    const gridElement = document.createElement("div");
    const headerWidth = parseInt(getComputedStyle(customHeader).width, 10);

    gridElement.className = "grid-element grid-border";

    gridElement.style.width = headerWidth / density + "px";
    gridElement.style.left = (i * headerWidth) / density + "px";
    gridElement.style.position = "absolute";

    customHeader.append(gridElement);
  }

  makeGridElementsSelectable();
};

const makeGridElementsSelectable = () => {
  const headerElements = document.querySelectorAll(".grid-element");

  let isMouseDown = false;
  headerElements.forEach((element) => {
    const handleMouseOver = (event) => {
      event.preventDefault();
      if (isMouseDown) {
        toggleElements(event.target);
      }
    };

    const handleMouseDown = (event) => {
      event.preventDefault();
      isMouseDown = true;
      event.target.classList.toggle("selected");

      document.addEventListener("mouseup", () => {
        isMouseDown = false;
        console.log(isMouseDown);
      });
    };

    const toggleElements = (target) => {
      target.classList.toggle("selected");
    };

    element.addEventListener("mouseover", handleMouseOver);
    element.addEventListener("mousedown", handleMouseDown);
  });
};

export const removeGrid = () => {
  const gridElements = document.querySelectorAll(".banner-element");
  const tempElements = [];

  customHeader.innerHTML = "";

  console.log(gridElements);

  gridElements.forEach((el) => tempElements.push(el));
  tempElements.forEach((el) => customHeader.append(el));
};
